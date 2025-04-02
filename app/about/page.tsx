'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Trophy,
  Building,
  Heart,
  Target,
  Gem,
  HandshakeIcon,
  Globe2,
  MessageSquareMore,
  Star,
  TrendingUp
} from 'lucide-react'

const stats = [
  { number: '15+', label: 'Years Experience', icon: Trophy },
  { number: '1000+', label: 'Properties Sold', icon: Building },
  { number: '98%', label: 'Client Satisfaction', icon: Heart },
  { number: '£500M+', label: 'Property Value Handled', icon: TrendingUp }
]

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To provide exceptional real estate services while maintaining the highest standards of integrity and professionalism.'
  },
  {
    icon: Gem,
    title: 'Our Vision',
    description: 'To be the most trusted and innovative real estate company, setting new standards in property services.'
  },
  {
    icon: HandshakeIcon,
    title: 'Our Values',
    description: 'Trust, Excellence, Innovation, and Client-First approach in everything we do.'
  }
]

const achievements = [
  "Best Real Estate Agency 2023",
  "Top Property Management Company",
  "Excellence in Customer Service Award",
  "Sustainable Development Recognition",
  "Industry Innovation Award 2023"
]

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: '/team/sarah.jpg',
    description: 'With 20+ years in real estate, Sarah leads with vision and expertise.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Property Sales',
    image: '/team/michael.jpg',
    description: 'Expert in luxury property sales with outstanding track record.'
  },
  {
    name: 'Emma Thompson',
    role: 'Investment Director',
    image: '/team/emma.jpg',
    description: 'Specializes in property investment strategies and market analysis.'
  },
  {
    name: 'James Wilson',
    role: 'Operations Manager',
    image: '/team/james.jpg',
    description: 'Ensures smooth operation of all services and client satisfaction.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37] ring-1 ring-inset ring-[#D4AF37]/20">
              About Us
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent">
            Your Trusted Property Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 15 years of excellence in real estate, we have been helping clients achieve their property dreams through expertise, innovation, and dedication.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 mb-4">
                  <stat.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <span className="text-3xl font-bold text-[#1A2A44]">
                  {stat.number}
                </span>
                <span className="text-gray-600 mt-1">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2A44]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 mb-4">
                    <value.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1A2A44]">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2A44]">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-[#D4AF37]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2A44]">
              Our Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-[#D4AF37]/20"
              >
                <Star className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-700 text-sm">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/90 opacity-95" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20" />
          <div className="relative p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Success Story
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to achieve your property goals. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 hover:text-white"
              >
                <MessageSquareMore className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37]"
              >
                <Globe2 className="w-5 h-5 mr-2" />
                View Our Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 