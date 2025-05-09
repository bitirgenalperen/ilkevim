'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Building2, Globe, Video, Footprints } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getSignedUrlsForImages } from '@/lib/s3-client'

interface Event {
  _id: string
  title: string
  description: string
  description_tr: string
  date: string
  time: string
  location: string
  type: 'online' | 'onsite'
  capacity: number
  category: string
  image: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function EventsPage() {
  const { t, i18n } = useTranslation('events')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to generate signed URLs for event images
  const generateSignedUrlsForEventImages = async (imageKey: string) => {
    try {
      console.log('Generating signed URL for event image:', imageKey);
      const imagesWithUrls = await getSignedUrlsForImages([imageKey]);
      console.log('Generated signed URL:', imagesWithUrls);
      return imagesWithUrls[0]?.url || imageKey;
    } catch (error) {
      console.error('Error generating signed URL for event image:', error);
      return imageKey; // Return original key if there's an error
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        
        // Generate signed URLs for all event images
        const eventsWithSignedUrls = await Promise.all(
          data.events.map(async (event: Event) => {
            if (event.image) {
              const signedImageUrl = await generateSignedUrlsForEventImages(event.image);
              return { ...event, image: signedImageUrl };
            }
            return event;
          })
        );
        
        // Sort events by date
        const sortedEvents = eventsWithSignedUrls.sort((a: Event, b: Event) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        setEvents(sortedEvents)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37] ring-1 ring-inset ring-[#D4AF37]/20">
              {t('hero.badge')}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent"
          >
            {t('hero.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px", amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => window.location.href = `/events/${event._id}`}
            >
              <div className="relative h-48">
                {event.image ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500">{t('event_card.image_not_available')}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.type === 'online' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {event.type === 'online' ? t('event_types.online') : t('event_types.onsite')}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{t(`categories.${event.category.toLowerCase()}`)}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1A2A44] line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {i18n.language === 'tr' ? event.description_tr : event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    {event.type === 'online' ? (
                      <Globe className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{t('event_details.capacity', { count: event.capacity })}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link
                    href={`/events/${event._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#D4AF37]/90 transition-colors w-full justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('event_details.register_button')}
                    {event.type === 'online' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <Footprints className="w-4 h-4" />
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 