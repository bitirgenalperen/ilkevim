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
  X,
  Home
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Language = {
  code: string;
  name: string;
  flag: string;
}

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>({ 
    code: 'en', 
    name: 'English',
    flag: '🇬🇧'
  })
  
  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' }
  ]
  
  const isActive = (path: string) => {
    return pathname === path || 
           (path !== '/' && pathname?.startsWith(path))
  }

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    // Here you would implement actual language switching logic
    // This could involve using i18n libraries like next-i18next
  }

  return (
    <header className="fixed w-full bg-[#1A2A44]/95 backdrop-blur-md z-50 border-b border-[#D4AF37]/20">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span>ilk</span>
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <span>evim</span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/properties" 
            className={cn(
              "transition-colors text-white",
              isActive('/properties') 
                ? "text-[#D4AF37] font-medium" 
                : "hover:text-[#D4AF37]"
            )}
          >
            Properties
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
            Services
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
            Events
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
            About
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
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Navigation buttons removed */}
        </div>

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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A2A44] border-b border-[#D4AF37]/20">
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
                Properties
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
                Services
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
                Events
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
                About
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
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 