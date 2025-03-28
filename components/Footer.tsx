import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { companyInfo } from '@/data/company-info'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Top Wave SVG */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="relative space-y-6 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  IlkEvim
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in finding the perfect property. With years of experience and dedication,
                we help you make your dream home a reality.
              </p>
              <div className="flex justify-center sm:justify-start space-x-4">
                {[
                  { icon: Facebook, href: companyInfo.socialMedia.facebook },
                  { icon: Twitter, href: companyInfo.socialMedia.twitter },
                  { icon: Instagram, href: companyInfo.socialMedia.instagram },
                  { icon: Linkedin, href: 'https://linkedin.com' }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <social.icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { text: 'Properties', href: '/properties' },
                  { text: 'About Us', href: '/about' },
                  { text: 'Our Services', href: '/services' },
                  { text: 'Events', href: '/events' },
                  { text: 'Contact Us', href: '/contact' },
                  { text: 'Blog', href: '/blog' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="group flex items-center justify-center sm:justify-start text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowRight size={16} className="mr-2 opacity-0 -ml-4 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="space-y-4">
                {[
                  { icon: MapPin, text: companyInfo.address },
                  { icon: Phone, text: companyInfo.phone },
                  { icon: Mail, text: companyInfo.email }
                ].map((contact, index) => (
                  <li key={index} className="flex items-center justify-center sm:justify-start space-x-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <contact.icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-center sm:text-left">
                © {currentYear} <span className="text-white font-medium">IlkEvim</span>. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
                {[
                  { text: 'Privacy Policy', href: '/privacy' },
                  { text: 'Terms of Service', href: '/terms' },
                  { text: 'Cookie Policy', href: '/cookies' }
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 