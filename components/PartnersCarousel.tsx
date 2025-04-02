'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

// Define partner logos data
const partners = [
  { name: 'Partner 1', logo: '/partners/partner1.svg' },
  { name: 'Partner 2', logo: '/partners/partner2.svg' },
  { name: 'Partner 3', logo: '/partners/partner3.svg' },
  { name: 'Partner 4', logo: '/partners/partner4.svg' },
  { name: 'Partner 5', logo: '/partners/partner5.svg' },
  { name: 'Partner 6', logo: '/partners/partner6.svg' },
  { name: 'Partner 7', logo: '/partners/partner7.svg' },
  { name: 'Partner 8', logo: '/partners/partner8.svg' },
];

export function PartnersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // Duplicate partners for the infinite scroll effect
  const allPartners = [...partners, ...partners];
  
  useEffect(() => {
    if (isInView && !isPaused) {
      // Calculate remaining duration based on current position
      const totalDistance = 1920;
      const remainingDistance = totalDistance + currentPosition;
      const totalDuration = 30; // seconds
      const remainingDuration = totalDuration * (remainingDistance / totalDistance);
      
      controls.start({
        x: [currentPosition, -1920],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: remainingDuration > 0 ? remainingDuration : totalDuration,
            ease: 'linear',
          },
        },
      });
    } else {
      // When paused, get the computed transform style to determine current position
      if (motionRef.current) {
        const style = window.getComputedStyle(motionRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform);
        setCurrentPosition(matrix.m41); // Extract X transform from matrix
      }
      controls.stop();
    }
  }, [isInView, controls, isPaused, currentPosition]);

  // Pause animation on hover or focus
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="py-20 bg-[#1A2A44]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">Our Partners</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;re proud to work with the best in the industry
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="w-full overflow-hidden relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            ref={motionRef}
            className="flex items-center gap-16 py-6"
            animate={controls}
            initial={{ x: 0 }}
          >
            {allPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="flex-shrink-0 w-40 h-20 bg-white rounded-lg shadow-md flex items-center justify-center px-6 hover:shadow-lg transition-shadow duration-200"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-12 grayscale hover:grayscale-0 transition-all duration-300"
                  unoptimized // Since we'll use placeholder SVGs
                />
              </div>
            ))}
          </motion.div>
          
          {/* Gradient fade on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1A2A44] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1A2A44] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 