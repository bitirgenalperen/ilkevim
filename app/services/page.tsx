'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
    color: 'from-teal-500 to-teal-400'
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
    color: 'from-teal-600 to-teal-500'
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
    color: 'from-teal-500 to-emerald-400'
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
    color: 'from-emerald-500 to-teal-400'
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
          <div className="inline-block mb-6">
            <span className="inline-flex items-center rounded-lg bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
              Our Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Our Comprehensive Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of professional real estate services designed to make your property journey seamless and successful.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-teal-100/50 hover:shadow-xl hover:border-teal-200/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">{benefit.title}</h3>
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
                className="relative overflow-hidden group cursor-pointer border-teal-100/50 hover:border-teal-200/50 bg-white/80 backdrop-blur-sm"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className={`grid transition-all duration-300 ${
                    selectedService === service.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                    <div className="overflow-hidden">
                      <ul className="space-y-3 pt-4 border-t border-teal-100/50">
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle2 className="w-5 h-5 text-teal-600" />
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
                    className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
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
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-95" />
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
                className="bg-white text-teal-600 hover:bg-white/90 hover:text-teal-700"
              >
                <MessageSquareMore className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 