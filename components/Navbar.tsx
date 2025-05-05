'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import {  
  ChevronDown,
  Check,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next'
import '@/i18n/config'

type Language = {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [isClient, setIsClient] = useState(false)
  
  // Set initial language and client state
  useEffect(() => {
    setIsClient(true)
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
      const language = languages.find(lang => lang.code === storedLanguage)
      if (language) {
        setCurrentLanguage(language)
        i18n.changeLanguage(language.code)
      }
    }
  }, [i18n])
  
  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  const isActive = (path: string) => {
    return pathname === path || 
           (path !== '/' && pathname?.startsWith(path))
  }

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language.code)
    if (isClient) {
      localStorage.setItem('language', language.code)
    }
  }

  // Don't render language selector until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return (
    <header className="fixed w-full bg-[#1A2A44]/95 backdrop-blur-md z-50 border-b border-[#D4AF37]/20">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/ilkevim_logo.png" 
            alt="ilkevim Logo" 
            width={100} 
            height={25} 
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-8">
            <Link 
              href="/properties" 
              className={cn(
                "transition-colors text-white",
                isActive('/properties') 
                  ? "text-[#D4AF37] font-medium" 
                  : "hover:text-[#D4AF37]"
              )}
            >
              {t('navbar.properties')}
            </Link>
            <Link 
              href="/services" 
              className={cn(
                "transition-colors text-white",
                isActive('/services') 
                  ? "text-[#D4AF37] font-medium" 
                  : "hover:text-[#D4AF37]"
              )}
            >
              {t('navbar.services')}
            </Link>
            <Link 
              href="/events" 
              className={cn(
                "transition-colors text-white",
                isActive('/events') 
                  ? "text-[#D4AF37] font-medium" 
                  : "hover:text-[#D4AF37]"
              )}
            >
              {t('navbar.events')}
            </Link>
            <Link 
              href="/about" 
              className={cn(
                "transition-colors text-white",
                isActive('/about') 
                  ? "text-[#D4AF37] font-medium" 
                  : "hover:text-[#D4AF37]"
              )}
            >
              {t('navbar.about')}
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "transition-colors text-white",
                isActive('/contact') 
                  ? "text-[#D4AF37] font-medium" 
                  : "hover:text-[#D4AF37]"
              )}
            >
              {t('navbar.contact')}
            </Link>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 rounded-full border-[#D4AF37] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 text-[#D4AF37] px-3 transition-all duration-200 shadow-sm"
              >
                <span className="text-base mr-0.5">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl overflow-hidden border-[#D4AF37] shadow-md bg-[#1A2A44]">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer py-2.5 text-white hover:bg-[#D4AF37]/10",
                    currentLanguage.code === language.code ? "bg-[#D4AF37]/20 font-medium text-[#D4AF37]" : ""
                  )}
                  onClick={() => handleLanguageChange(language)}
                >
                  <span className="text-base">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage.code === language.code && (
                    <Check className="h-4 w-4 ml-auto text-[#D4AF37]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-[#D4AF37]/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1A2A44] border-b border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/properties" 
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors text-white",
                    isActive('/properties') 
                      ? "text-[#D4AF37] font-medium bg-[#D4AF37]/20" 
                      : "hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  )}
                >
                  {t('navbar.properties')}
                </Link>
                <Link 
                  href="/services" 
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors text-white",
                    isActive('/services') 
                      ? "text-[#D4AF37] font-medium bg-[#D4AF37]/20" 
                      : "hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  )}
                >
                  {t('navbar.services')}
                </Link>
                <Link 
                  href="/events" 
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors text-white",
                    isActive('/events') 
                      ? "text-[#D4AF37] font-medium bg-[#D4AF37]/20" 
                      : "hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  )}
                >
                  {t('navbar.events')}
                </Link>
                <Link 
                  href="/about" 
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors text-white",
                    isActive('/about') 
                      ? "text-[#D4AF37] font-medium bg-[#D4AF37]/20" 
                      : "hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  )}
                >
                  {t('navbar.about')}
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors text-white",
                    isActive('/contact') 
                      ? "text-[#D4AF37] font-medium bg-[#D4AF37]/20" 
                      : "hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  )}
                >
                  {t('navbar.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 