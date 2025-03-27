'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Building2, Globe, Video } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'online' | 'onsite'
  capacity: number
  image: string
  category: string
  registrationLink: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'Global Real Estate Investment Summit',
    description: 'Join industry experts for an exclusive summit on global real estate investment opportunities, market trends, and future predictions.',
    date: '2024-06-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Istanbul Convention Center',
    type: 'onsite',
    capacity: 200,
    image: '/events/summit.jpg',
    category: 'Investment',
    registrationLink: '#'
  },
  {
    id: '2',
    title: 'Virtual Property Tour Masterclass',
    description: 'Learn how to create engaging virtual property tours that attract international buyers and streamline the sales process.',
    date: '2024-06-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    type: 'online',
    capacity: 500,
    image: '/events/virtual-tour.jpg',
    category: 'Technology',
    registrationLink: '#'
  },
  {
    id: '3',
    title: 'Luxury Real Estate Symposium',
    description: 'An exclusive gathering of luxury real estate professionals discussing high-end market trends and client expectations.',
    date: '2024-07-05',
    time: '9:00 AM - 5:00 PM',
    location: 'Four Seasons Hotel Istanbul',
    type: 'onsite',
    capacity: 150,
    image: '/events/luxury.jpg',
    category: 'Luxury',
    registrationLink: '#'
  },
  {
    id: '4',
    title: 'International Property Investment Webinar',
    description: 'Join us for an informative webinar on international property investment strategies and market opportunities.',
    date: '2024-07-15',
    time: '3:00 PM - 5:00 PM',
    location: 'Online',
    type: 'online',
    capacity: 1000,
    image: '/events/webinar.jpg',
    category: 'Investment',
    registrationLink: '#'
  }
]

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
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Events Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">Upcoming Events</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mt-4"
            >
              Don&apos;t Miss Out on These Opportunities
            </motion.h2>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={item}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'online' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.type === 'online' ? 'Online Event' : 'Onsite Event'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
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
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Capacity: {event.capacity} attendees</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Register Now
                      <Video className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
} 