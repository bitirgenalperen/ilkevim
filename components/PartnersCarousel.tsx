'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

// Define partner logos data
const partners = [
  { name: 'Redrow', logo: '/partners/redrow.png' },
  { name: 'The Embassy', logo: '/partners/theembassy.png' },
  { name: 'Select Property', logo: '/partners/selectproperty.png' },
  { name: 'London Square', logo: '/partners/londonsquare.png' },
  { name: 'Knight Dragon', logo: '/partners/knightdragon.png' },
  { name: 'Hill Group', logo: '/partners/hillgroup.png' },
  { name: 'Ghelamco', logo: '/partners/ghelamco.png' },
  { name: 'Damac', logo: '/partners/damac.png' },
  { name: 'City Docklands', logo: '/partners/citydocklands.png' },
  { name: 'Berkeley Group', logo: '/partners/berkeleygroup.png' },
  { name: 'Bellway', logo: '/partners/bellway.png' },
  { name: 'Barratt London', logo: '/partners/barrattlondon.png' },
];

export function PartnersCarousel() {
  const { t } = useTranslation('homepage');
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [currentX, setCurrentX] = useState(0); // Track current x position

  // Duplicate partners array for seamless looping
  const allPartners = [...partners, ...partners];

  // Animation settings
  const partnerWidth = 256; // w-48 (192px) + gap-16 (64px)
  const totalWidth = partnerWidth * partners.length; // Width of one set of partners
  const animationDuration = 30; // Duration for one full cycle

  useEffect(() => {
    let isMounted = true;

    const getCurrentX = () => {
      if (motionRef.current) {
        const style = window.getComputedStyle(motionRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform);
        return matrix.m41; // Extract current x translation
      }
      return currentX;
    };

    const animateLoop = async () => {
      while (isMounted && isInView && !isPaused) {
        // Calculate remaining distance and time from current position
        const remainingDistance = -totalWidth - currentX; // Distance to end of cycle
        const remainingTime = animationDuration * (Math.abs(remainingDistance) / totalWidth);

        // Animate to the end of the cycle
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: remainingTime > 0 ? remainingTime : animationDuration,
            ease: 'linear',
          },
        });

        // Reset to start for next cycle
        if (isMounted && isInView && !isPaused) {
          await controls.set({ x: 0 });
          setCurrentX(0); // Update currentX for next cycle
        }
      }
    };

    if (isInView && !isPaused) {
      // Start animation from currentX
      controls.set({ x: currentX });
      animateLoop();
    } else if (isPaused) {
      // Capture current position when pausing
      const pausedX = getCurrentX();
      setCurrentX(pausedX);
      controls.stop();
    } else {
      controls.stop();
    }

    // Cleanup on unmount
    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [isInView, isPaused, controls, totalWidth, animationDuration, currentX]);

  // Pause/resume on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="py-20 bg-[#1A2A44]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
            {t('partners.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('partners.subtitle')}
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
                className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-md flex items-center justify-center px-6 hover:shadow-lg transition-shadow duration-200"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={106}
                  className="object-contain max-h-20 transition-all duration-300"
                  unoptimized
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