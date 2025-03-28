'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {  
  ChevronDown,
  Check,
  User,
  Menu,
  X
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
  
  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
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
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          IlkEvim
        </Link>

        <div className="flex items-center gap-4">
          {/* Language Dropdown - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 rounded-full border-teal-200 hover:border-teal-300 hover:bg-teal-50/50 text-teal-700 px-3 transition-all duration-200 shadow-sm"
              >
                <span className="text-base mr-0.5">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl overflow-hidden border-teal-200 shadow-md">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer py-2.5",
                    currentLanguage.code === language.code ? "bg-teal-50 font-medium text-teal-700" : ""
                  )}
                  onClick={() => handleLanguageChange(language)}
                >
                  <span className="text-base">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage.code === language.code && (
                    <Check className="h-4 w-4 ml-auto text-teal-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/properties" 
            className={cn(
              "transition-colors",
              isActive('/properties') 
                ? "text-teal-600 font-medium" 
                : "text-gray-700 hover:text-teal-600"
            )}
          >
            Properties
          </Link>
          <Link 
            href="/services" 
            className={cn(
              "transition-colors",
              isActive('/services') 
                ? "text-teal-600 font-medium" 
                : "text-gray-700 hover:text-teal-600"
            )}
          >
            Services
          </Link>
          <Link 
            href="/events" 
            className={cn(
              "transition-colors",
              isActive('/events') 
                ? "text-teal-600 font-medium" 
                : "text-gray-700 hover:text-teal-600"
            )}
          >
            Events
          </Link>
          <Link 
            href="/about" 
            className={cn(
              "transition-colors",
              isActive('/about') 
                ? "text-teal-600 font-medium" 
                : "text-gray-700 hover:text-teal-600"
            )}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={cn(
              "transition-colors",
              isActive('/contact') 
                ? "text-teal-600 font-medium" 
                : "text-gray-700 hover:text-teal-600"
            )}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/user-details">
            <Button variant="outline" size="icon" className="rounded-full border-teal-200 hover:border-teal-300 hover:bg-teal-50 text-teal-700">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/signin">
            <Button variant="outline" className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">Register</Button>
          </Link>
          <Link href="/list-property">
            <Button className="bg-teal-600 hover:bg-teal-700">List Property</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/properties" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  isActive('/properties') 
                    ? "text-teal-600 font-medium bg-teal-50" 
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                )}
              >
                Properties
              </Link>
              <Link 
                href="/services" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  isActive('/services') 
                    ? "text-teal-600 font-medium bg-teal-50" 
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                )}
              >
                Services
              </Link>
              <Link 
                href="/events" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  isActive('/events') 
                    ? "text-teal-600 font-medium bg-teal-50" 
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                )}
              >
                Events
              </Link>
              <Link 
                href="/about" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  isActive('/about') 
                    ? "text-teal-600 font-medium bg-teal-50" 
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                )}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  isActive('/contact') 
                    ? "text-teal-600 font-medium bg-teal-50" 
                    : "text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                )}
              >
                Contact
              </Link>
            </div>
            <div className="pt-4 border-t space-y-2">
              <Link href="/signin" className="block w-full">
                <Button variant="outline" className="w-full border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">Sign In</Button>
              </Link>
              <Link href="/register" className="block w-full">
                <Button variant="outline" className="w-full border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700">Register</Button>
              </Link>
              <Link href="/list-property" className="block w-full">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">List Property</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 