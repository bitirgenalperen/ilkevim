'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Globe, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'

// This would typically come from an API or database
const event = {
  id: '1',
  title: 'Global Real Estate Investment Summit',
  description: 'Join industry experts for an exclusive summit on global real estate investment opportunities, market trends, and future predictions.',
  longDescription: `The Global Real Estate Investment Summit brings together the world&apos;s leading real estate experts, investors, and industry professionals for an unparalleled networking and learning experience.

Key Highlights:
• Expert panel discussions on global market trends
• Investment strategies for different market conditions
• Networking sessions with industry leaders
• Case studies of successful international investments
• Future predictions and market analysis

Who Should Attend:
• Real estate investors
• Property developers
• Industry professionals
• Financial advisors
• Market analysts

Don&apos;t miss this opportunity to gain valuable insights and connect with the global real estate community.`,
  date: '2024-06-15',
  time: '10:00 AM - 4:00 PM',
  location: 'Istanbul Convention Center',
  type: 'onsite',
  capacity: 200,
  image: '/events/summit.jpg',
  category: 'Investment',
  registrationLink: '#',
  agenda: [
    { time: '10:00 AM', title: 'Welcome and Opening Remarks' },
    { time: '10:30 AM', title: 'Global Market Overview' },
    { time: '11:30 AM', title: 'Investment Strategies Panel' },
    { time: '12:30 PM', title: 'Networking Lunch' },
    { time: '2:00 PM', title: 'Case Studies Session' },
    { time: '3:30 PM', title: 'Future Trends Discussion' },
    { time: '4:00 PM', title: 'Closing Remarks' }
  ],
  speakers: [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Global Real Estate Analyst',
      company: 'International Property Research',
      image: '/speakers/speaker1.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Investment Director',
      company: 'Global Property Fund',
      image: '/speakers/speaker2.jpg'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Market Strategist',
      company: 'Real Estate Insights',
      image: '/speakers/speaker3.jpg'
    }
  ]
}

export default function EventDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${event.image}')`, filter: 'brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        
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
              Back to Events
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.type === 'online' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {event.type === 'online' ? 'Online Event' : 'Onsite Event'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                {event.category}
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
                <span>Capacity: {event.capacity} attendees</span>
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
              <h2 className="text-2xl font-bold mb-6">About This Event</h2>
              <div className="prose prose-teal max-w-none">
                {event.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.section>

            {/* Agenda Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Event Agenda</h2>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-24 text-teal-600 font-medium">{item.time}</div>
                    <div className="flex-1">{item.title}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Speakers Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Featured Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${speaker.image}')` }}
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                    <p className="text-teal-600 mb-1">{speaker.role}</p>
                    <p className="text-gray-600 text-sm">{speaker.company}</p>
                  </div>
                ))}
              </div>
            </motion.section>
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
                <h2 className="text-2xl font-bold">Register Now</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Event Date</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Time</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Location</span>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Available Spots</span>
                  <span className="font-medium">{event.capacity} remaining</span>
                </div>
              </div>

              <a
                href={event.registrationLink}
                className="block w-full py-4 px-6 bg-teal-600 text-white text-center rounded-xl hover:bg-teal-700 transition-colors font-medium"
              >
                Register for Free
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 