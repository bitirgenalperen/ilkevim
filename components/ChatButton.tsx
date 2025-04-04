'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Phone, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const PHONE_NUMBER = '+44 20 7123 4567'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handlePhoneClick = async () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // On mobile devices, open the phone app
      window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`
      return
    }

    // On desktop, copy to clipboard
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER)
      setIsCopied(true)
      toast.success('Phone number copied to clipboard!')
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy phone number:', error)
      toast.error('Failed to copy phone number')
    }
  }

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/90">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Chat with Our Agents</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 font-medium">
                Our agents are available to help you with:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-[#1A2A44]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Property inquiries
                </li>
                <li className="flex items-center gap-3 text-[#1A2A44]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Investment advice
                </li>
                <li className="flex items-center gap-3 text-[#1A2A44]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Viewing arrangements
                </li>
              </ul>
              <div className="pt-4 space-y-3">
                <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44] h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#1A2A44] h-12 text-base font-medium"
                  onClick={handlePhoneClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {isCopied ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-[#D4AF37]" />
                      Copied!
                    </>
                  ) : (
                    'Call Us'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-16 h-16 rounded-full shadow-2xl transition-all duration-300 relative overflow-hidden",
              isOpen
                ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44]"
                : "bg-[#1A2A44] hover:bg-[#1A2A44]/90 text-white border-2 border-[#D4AF37]"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle 
              className="relative z-10" 
              size={32}
              strokeWidth={2.5}
            />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 