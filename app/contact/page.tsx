'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { companyInfo } from '@/data/company-info'
import { PropertyMap } from '@/components/PropertyMap'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Instagram,
} from 'lucide-react'


export default function ContactPage() {
  const { t } = useTranslation('contact')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showOptionalDetails, setShowOptionalDetails] = useState(false)

  // Updated contactInfo with translations
  const contactInfo = [
    {
      icon: Phone,
      title: t('contact_info.sections.0.title'),
      details: [companyInfo.phone],
      color: 'from-[#D4AF37] to-[#D4AF37]/80'
    },
    {
      icon: MapPin,
      title: t('contact_info.sections.1.title'),
      details: [companyInfo.address.split(', ')[0] + ', ' + companyInfo.address.split(', ')[1], companyInfo.address.split(', ')[2] + ', ' + companyInfo.address.split(', ')[3] + ', ' + companyInfo.address.split(', ')[4]],
      color: 'from-[#D4AF37] to-[#D4AF37]/80'
    },
    {
      icon: Clock,
      title: t('contact_info.sections.2.title'),
      details: [
        t('contact_info.working_hours.weekdays'),
        t('contact_info.working_hours.saturday'),
        t('contact_info.working_hours.sunday')
      ],
      color: 'from-[#D4AF37] to-[#D4AF37]/80'
    },
    {
      icon: Mail,
      title: t('contact_info.sections.3.title'),
      details: [companyInfo.email],
      color: 'from-[#D4AF37] to-[#D4AF37]/80'
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37] ring-1 ring-inset ring-[#D4AF37]/20">
              {t('hero.badge')}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'contact'
                  ? 'bg-white text-[#D4AF37] shadow-sm'
                  : 'text-gray-600 hover:text-[#D4AF37]'
              } transition-all duration-200`}
            >
              {t('tab_navigation.contact_form')}
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'faq'
                  ? 'bg-white text-[#D4AF37] shadow-sm'
                  : 'text-gray-600 hover:text-[#D4AF37]'
              } transition-all duration-200`}
            >
              {t('tab_navigation.faq')}
            </button>
          </div>
        </div>

        {activeTab === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1A2A44]">
                    {t('contact_form.title')}
                  </h2>
                  <p className="text-gray-600">
                    {t('contact_form.subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact_form.name')}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t('contact_form.name_placeholder')}
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact_form.phone')}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder={t('contact_form.phone_placeholder')}
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setShowOptionalDetails(!showOptionalDetails)}
                      className="flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">{t('contact_form.optional_details')}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${showOptionalDetails ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${showOptionalDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact_form.email')}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact_form.email_placeholder')}
                          value={formState.email}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact_form.subject')}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder={t('contact_form.subject_placeholder')}
                          value={formState.subject}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact_form.message')}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t('contact_form.message_placeholder')}
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full bg-[#D4AF37] text-white transition-all duration-200 hover:bg-[#D4AF37]/90 ${
                        isSubmitted ? 'bg-green-600' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('contact_form.button.sending')}
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          {t('contact_form.button.sent')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('contact_form.button.send')}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1A2A44]">
                    {t('contact_info.title')}
                  </h2>
                  <p className="text-gray-600">
                    {t('contact_info.subtitle')}
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${info.color} flex-shrink-0`}>
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <div className="mt-1 space-y-1">
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">{t('contact_info.follow_us')}</h3>
                  <div className="flex space-x-4">
                    {[
                      { Icon: Instagram, href: "https://www.instagram.com/ilkevim.co.uk" }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="p-2 rounded-full bg-gray-100 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors duration-200"
                      >
                        <item.Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          /* FAQ Section */
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1A2A44]">
                  {t('faq.title')}
                </h2>
                <p className="text-gray-600">
                  {t('faq.subtitle')}
                </p>
              </div>

              <div className="space-y-8">
                {/* Freehold Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    {t('faq.categories.freehold')}
                  </h3>
                  <div className="space-y-4">
                    <div 
                      className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                        className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                      >
                        <span className="font-medium text-[#1A2A44]">{t('faq.questions.0.question')}</span>
                        <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                          activeFaq === 0 ? 'rotate-90' : ''
                        }`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        activeFaq === 0 ? 'max-h-40' : 'max-h-0'
                      }`}>
                        <div className="p-4 pt-0 bg-[#D4AF37]/5">
                          <p className="text-gray-600">{t('faq.questions.0.answer')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leasehold Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    {t('faq.categories.leasehold')}
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                      <div 
                        key={index}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{t(`faq.questions.${index}.question`)}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{t(`faq.questions.${index}.answer`)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mortgage Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    {t('faq.categories.mortgage')}
                  </h3>
                  <div className="space-y-4">
                    {[4, 5].map((index) => (
                      <div 
                        key={index}
                        className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                        >
                          <span className="font-medium text-[#1A2A44]">{t(`faq.questions.${index}.question`)}</span>
                          <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                            activeFaq === index ? 'rotate-90' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeFaq === index ? 'max-h-40' : 'max-h-0'
                        }`}>
                          <div className="p-4 pt-0 bg-[#D4AF37]/5">
                            <p className="text-gray-600">{t(`faq.questions.${index}.answer`)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agreement in Principle Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1A2A44] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    {t('faq.categories.aip')}
                  </h3>
                  <div className="space-y-4">
                    <div 
                      className="border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}
                        className="flex justify-between items-center w-full p-4 text-left hover:bg-[#D4AF37]/5 transition-colors duration-200"
                      >
                        <span className="font-medium text-[#1A2A44]">{t('faq.questions.6.question')}</span>
                        <ArrowRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${
                          activeFaq === 6 ? 'rotate-90' : ''
                        }`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        activeFaq === 6 ? 'max-h-40' : 'max-h-0'
                      }`}>
                        <div className="p-4 pt-0 bg-[#D4AF37]/5">
                          <p className="text-gray-600">{t('faq.questions.6.answer')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Map Section */}
        <div className="mb-16">
          <PropertyMap 
            area="Soho"
            city="London"
            address={companyInfo.address}
            title="Our Office Location"
          />
        </div>
      </div>
    </div>
  )
} 