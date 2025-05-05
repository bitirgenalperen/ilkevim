'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import {
  Home,
  ClipboardCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  BadgePercent,
  Sparkles,
  Shield,
  Clock,
  HeartHandshake,
  MessageSquareMore,
  BarChart3
} from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Property Sales',
    description: 'Expert guidance through every step of selling your property, from valuation to completion.',
    icon: Home,
    features: [
      'Professional property valuation',
      'Strategic pricing analysis',
      'Professional photography',
      'Virtual tours',
      'Targeted marketing campaigns'
    ],
    color: 'from-[#D4AF37] to-[#D4AF37]/90'
  },
  {
    id: 2,
    title: 'Property Management',
    description: 'Comprehensive property management services for landlords and property investors.',
    icon: Building2,
    features: [
      'Tenant screening & placement',
      'Rent collection & accounting',
      'Property maintenance',
      'Regular inspections',
      '24/7 emergency support'
    ],
    color: 'from-[#D4AF37] to-[#D4AF37]/90'
  },
  {
    id: 3,
    title: 'Investment Advisory',
    description: 'Strategic investment advice to help you make informed property investment decisions.',
    icon: BarChart3,
    features: [
      'Market analysis & research',
      'Investment strategy planning',
      'Portfolio optimization',
      'ROI calculations',
      'Risk assessment'
    ],
    color: 'from-[#D4AF37] to-[#D4AF37]/90'
  },
  {
    id: 4,
    title: 'Legal & Documentation',
    description: 'Expert handling of all legal aspects and documentation related to property transactions.',
    icon: ClipboardCheck,
    features: [
      'Contract preparation',
      'Legal compliance checks',
      'Due diligence',
      'Documentation review',
      'Regulatory guidance'
    ],
    color: 'from-[#D4AF37] to-[#D4AF37]/90'
  }
]

const benefits = [
  {
    icon: Shield,
    title: 'Trusted Expertise',
    description: '15+ years of industry experience'
  },
  {
    icon: Clock,
    title: 'Fast Response',
    description: 'Quick and efficient service delivery'
  },
  {
    icon: HeartHandshake,
    title: 'Personal Touch',
    description: 'Tailored solutions for every client'
  },
  {
    icon: BadgePercent,
    title: 'Competitive Rates',
    description: 'Transparent and fair pricing'
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24 pb-16">
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
              Our Services
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent"
          >
            Our Comprehensive Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our range of professional real estate services designed to make your property journey seamless and successful.
          </motion.p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5">
                  <benefit.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#1A2A44]">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="relative overflow-hidden group cursor-pointer border-[#D4AF37]/20 hover:border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-[#1A2A44]">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className={`grid transition-all duration-300 ${
                    selectedService === service.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                    <div className="overflow-hidden">
                      <ul className="space-y-3 pt-4 border-t border-[#D4AF37]/10">
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#D4AF37] hover:text-[#D4AF37]/90 hover:bg-[#D4AF37]/10"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/90 opacity-95" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20" />
          <div className="relative p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how we can help you achieve your property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 hover:text-white"
                asChild
              >
                <Link href="/contact">
                  <MessageSquareMore className="w-5 h-5 mr-2" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37]"
                asChild
              >
                <Link href="/properties">
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Our Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 