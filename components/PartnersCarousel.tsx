'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { background } from '@/styles/theme';

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
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimationControls();
  
  // Duplicate partners for the infinite scroll effect
  const allPartners = [...partners, ...partners];
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        x: [0, -1920],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <section className={background.tealLight("py-20")}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full mb-6 inline-block">
            Trusted Partners
          </span>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-sm font-medium">Our Partners</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We&apos;re proud to work with the best in the industry
          </motion.p>
        </div>
        
        <div 
          ref={containerRef} 
          className="w-full overflow-hidden relative"
        >
          <motion.div 
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
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-teal-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-teal-50 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 