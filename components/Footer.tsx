import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-[#1A2A44] text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#D4AF37]">IlkEvim</h3>
            <p className="text-gray-300">
              Your trusted partner in finding the perfect property in the UK. We provide comprehensive real estate services tailored to your needs.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5 text-[#D4AF37]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-5 h-5 text-[#D4AF37]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-300">
                <Twitter className="w-5 h-5 text-[#D4AF37]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-[#D4AF37]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#D4AF37]">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#D4AF37] mt-1" />
                <span className="text-gray-300">
                  123 Real Estate Street<br />
                  London, UK
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-gray-300">+44 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-gray-300">info@ilkevim.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#D4AF37]">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest property listings and market insights.
            </p>
            <form className="space-y-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-[#D4AF37]/20 text-white placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <Button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44]"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4AF37]/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} IlkEvim. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 