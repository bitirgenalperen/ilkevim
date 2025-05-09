'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Globe, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, use } from 'react'
import { PropertyMap } from '@/components/PropertyMap'
import { getSignedUrlsForImages } from '@/lib/s3-client'

// Add the Event interface and state management
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
  address: string
}

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, i18n } = useTranslation('events')
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageLoadError, setImageLoadError] = useState(false)
  const resolvedParams = use(params)

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
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${resolvedParams.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch event')
        }
        const data = await response.json()
        
        // Generate signed URL for event image
        if (data.event && data.event.image) {
          const signedImageUrl = await generateSignedUrlsForEventImages(data.event.image);
          data.event.image = signedImageUrl;
        }
        
        setEvent(data.event)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [resolvedParams.id])

  const handleImageError = () => {
    setImageLoadError(true);
  };

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

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">{error || 'Event not found'}</p>
            <Link 
              href="/events"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#D4AF37]/80 mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('event_details.page.back_to_events')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        {imageLoadError ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400">{t('event_details.image_not_available')}</p>
            </div>
          </div>
        ) : (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${event.image}')`, filter: 'brightness(0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          </>
        )}
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link 
              href="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('event_details.page.back_to_events')}
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.type === 'online' 
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
                  : 'bg-[#D4AF37]/10 text-[#D4AF37]'
              }`}>
                {event.type === 'online' ? t('event_types.online') : t('event_types.onsite')}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#D4AF37]">
                {t(`categories.${event.category.toLowerCase()}`)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{event.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {event.type === 'online' ? (
                  <Globe className="w-5 h-5" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{t('event_details.capacity', { count: event.capacity })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold mb-6">{t('event_details.page.description')}</h2>
              <div className="prose prose-[#1A2A44] max-w-none">
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'tr' ? event.description_tr : event.description}
                </p>
              </div>
            </motion.section>

            {/* Map Section - Only for onsite events */}
            {event.type === 'onsite' && event.address && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold mb-6">{t('event_details.page.location')}</h2>
                <PropertyMap
                  area={event.location.trim().split(',')[0]}
                  city={event.location.trim().split(',')[1]}
                  address={event.address}
                  title={event.title}
                />
              </motion.section>
            )}
          </div>

          {/* Right Column - Registration Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('event_details.page.registration')}</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-600">
                  <span>{t('event_details.page.date_time')}</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>{t('event_details.page.date_time')}</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>{t('event_details.page.location')}</span>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>{t('event_details.page.registration')}</span>
                  <span className="font-medium">{event.capacity}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/447552177242?text=${encodeURIComponent(
                  i18n.language === 'tr' 
                    ? `Merhaba, bu etkinliğe kayıt olmak istiyorum:\n\n` +
                      `Etkinlik: ${event.title}\n` +
                      `Tarih: ${event.date}\n` +
                      `Saat: ${event.time}\n` +
                      `Konum: ${event.location}\n` +
                      `Tür: ${event.type === 'online' ? 'Online' : 'Yerinde'}`
                    : `Hello, I would like to register for the event:\n\n` +
                      `Event: ${event.title}\n` +
                      `Date: ${event.date}\n` +
                      `Time: ${event.time}\n` +
                      `Location: ${event.location}\n` +
                      `Type: ${event.type === 'online' ? 'Online' : 'Onsite'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[#D4AF37] text-white text-center rounded-xl hover:bg-[#D4AF37]/90 transition-colors font-medium"
              >
                {t('event_details.register_button')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 