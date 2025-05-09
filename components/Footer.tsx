'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Instagram, Mail, Phone, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Footer() {
  const { t } = useTranslation('footer')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'already-subscribed' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !name) {
      setSubscriptionStatus('error')
      setErrorMessage(t('newsletter.name_email_required_error'))
      return
    }
    
    setIsSubmitting(true)
    setSubscriptionStatus('idle')
    
    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 409) {
          // Email already subscribed
          setSubscriptionStatus('already-subscribed')
          return
        }
        throw new Error(data.error || 'Failed to subscribe')
      }
      
      setSubscriptionStatus('success')
      setEmail('')
      setName('')
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle')
      }, 3000)
      
    } catch (error) {
      console.error('Subscription error:', error)
      setSubscriptionStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-[#1A2A44] text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#D4AF37] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#D4AF37] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-16">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-[#D4AF37]">{t('company_info.name')}</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {t('company_info.description')}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <a href="https://www.instagram.com/ilkevim.co.uk" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-[#D4AF37]">{t('quick_links.title')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm sm:text-base inline-block py-1">
                  {t('quick_links.properties')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm sm:text-base inline-block py-1">
                  {t('quick_links.services')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm sm:text-base inline-block py-1">
                  {t('quick_links.events')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm sm:text-base inline-block py-1">
                  {t('quick_links.about_us')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 text-sm sm:text-base inline-block py-1">
                  {t('quick_links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-[#D4AF37]">{t('contact_us.title')}</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Building2 className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">
                    307 Linen Hall, 162-168 Regent Street, Soho, London, W1B 5TE
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">+44 7552 177242</span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">{t('contact_us.email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-[#D4AF37]">{t('newsletter.title')}</h4>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              {t('newsletter.description')}
            </p>
            <form className="space-y-3 sm:space-y-4 max-w-sm mx-auto sm:mx-0" onSubmit={handleSubscribe}>
              <Input 
                type="text" 
                placeholder={t('newsletter.name_placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-[#D4AF37]/20 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-sm sm:text-base h-9 sm:h-10"
              />
              <Input 
                type="email" 
                placeholder={t('newsletter.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-[#D4AF37]/20 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-sm sm:text-base h-9 sm:h-10"
              />
              <Button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44] h-9 sm:h-10 text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('newsletter.subscribing_message') : t('newsletter.subscribe_button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {subscriptionStatus === 'success' && (
                <p className="text-green-400 text-xs sm:text-sm mt-2">{t('newsletter.success_message')}</p>
              )}
              
              {subscriptionStatus === 'already-subscribed' && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{t('newsletter.already_subscribed_message')}</p>
              )}
              
              {subscriptionStatus === 'error' && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4AF37]/10 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear() } ilkevim{t('bottom_bar.copyright')}
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-[#D4AF37] text-xs sm:text-sm transition-colors duration-300">
                {t('bottom_bar.privacy_policy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#D4AF37] text-xs sm:text-sm transition-colors duration-300">
                {t('bottom_bar.terms_of_service')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 