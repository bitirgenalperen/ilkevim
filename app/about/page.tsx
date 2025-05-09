'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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

export default function AboutPage() {
  const { t } = useTranslation('about')

  const stats = t('stats', { returnObjects: true }) as Array<{ number: string, label: string }>
  const achievements = t('achievements.items', { returnObjects: true }) as string[]

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
              {t('hero.badge')}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const StatIcon = index === 0 ? Trophy : 
                            index === 1 ? Building : 
                            index === 2 ? Heart : TrendingUp;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 mb-4">
                    <StatIcon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <span className="text-3xl font-bold text-[#1A2A44]">
                    {stat.number}
                  </span>
                  <span className="text-gray-600 mt-1">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2A44]">
              {t('values.section_title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'mission', icon: Target },
              { key: 'vision', icon: Gem },
              { key: 'values', icon: HandshakeIcon }
            ].map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 mb-4">
                    <value.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1A2A44]">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`values.${value.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Achievements Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2A44]">
              {t('achievements.section_title')}
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
              {t('cta.title')}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
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
                  {t('cta.contact_button')}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37]"
                asChild
              >
                <Link href="/properties">
                  <Globe2 className="w-5 h-5 mr-2" />
                  {t('cta.properties_button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 