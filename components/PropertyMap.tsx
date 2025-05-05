'use client'

import { useState } from 'react'
import { MapPin, Building } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PropertyMapProps {
  area: string
  city: string
  address: string
  title?: string
}

export function PropertyMap({ area, city, address, title = 'Location' }: PropertyMapProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Construct the Google Maps URL with the address
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&q=${encodeURIComponent(address)}&zoom=15`

  return (
    <Card className="p-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
      {/* Map Container */}
      <div className={`relative transition-all duration-300 ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
        
        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white border-[#D4AF37]/20 text-[#1A2A44] hover:text-[#D4AF37]"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Location Info Card */}
      <div className="p-6 bg-gradient-to-br from-[#1A2A44] to-[#1A2A44]/90 text-white relative overflow-hidden -mt-[24px]">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* Content */}
        <div className="relative">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm">
              <Building className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-white/90 leading-relaxed">
            {address}
          </p>
          <div className="mt-4 flex items-center text-[#D4AF37]">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{area}, {city}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 