'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define customer reviews data
const reviews = [
  {
    name: 'James Wilson',
    role: 'International Buyer',
    review: 'Working with this team made buying property overseas so straightforward. Their expertise in UK real estate was invaluable, and they guided me through every step of the process.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'First-time Buyer',
    review: 'As a first-time buyer, I was nervous about the whole process. The team was patient, knowledgeable, and found me the perfect property within my budget. Couldn\'t be happier!',
    rating: 5
  },
  {
    name: 'Michael Chang',
    role: 'Real Estate Investor',
    review: 'I\'ve worked with many real estate consultants over the years, but none have matched the market insights and investment opportunities this team has provided. My portfolio has grown significantly.',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Luxury Property Buyer',
    review: 'Their selection of luxury properties is unmatched. The team understood exactly what I was looking for and found a stunning home that exceeded my expectations in every way.',
    rating: 5
  },
  {
    name: 'Robert Patel',
    role: 'Commercial Investor',
    review: 'The team\'s knowledge of the commercial property market in London is exceptional. They helped me secure a high-yield investment property in a prime location.',
    rating: 4
  },
  {
    name: 'Olivia Thompson',
    role: 'Relocating Professional',
    review: 'Relocating to the UK was made so much easier with their help. They found me a beautiful property in the perfect location, close to transport links and amenities.',
    rating: 5
  },
];

export function ReviewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimationControls();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // Duplicate reviews for the infinite scroll effect
  const allReviews = [...reviews, ...reviews];
  
  useEffect(() => {
    if (isInView && !isPaused) {
      // Calculate remaining duration based on current position
      const totalDistance = 2000;
      const remainingDistance = totalDistance + currentPosition; // currentPosition is negative
      const totalDuration = 60; // seconds
      const remainingDuration = totalDuration * (remainingDistance / totalDistance);
      
      controls.start({
        x: [currentPosition, -2000],
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
          <Badge variant="outline" className="mb-4 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">Client Testimonials</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from satisfied clients who have found their perfect property through IlkEvim
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
            className="flex gap-8 py-8"
            animate={controls}
            initial={{ x: 0 }}
          >
            {allReviews.map((review, index) => (
              <Card 
                key={`${review.name}-${index}`} 
                className="flex-shrink-0 w-[380px] border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm rounded-xl group"
              >
                <CardContent className="p-8 relative">
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full filter blur-3xl transform translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1A2A44] rounded-full filter blur-3xl transform -translate-x-16 translate-y-16" />
                  </div>

                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 rounded-full flex items-center justify-center mb-6 -rotate-12 shadow-lg group-hover:rotate-0 transition-transform duration-300">
                    <Quote className="w-6 h-6 text-[#1A2A44]" />
                  </div>
                  
                  {/* Review Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-[#D4AF37]/20" />
                    <p className="text-gray-600 italic leading-relaxed">
                      &quot;{review.review}&quot;
                    </p>
                  </div>
                  
                  {/* Reviewer Info */}
                  <div className="border-t border-[#D4AF37]/10 pt-6 mt-6">
                    <h4 className="font-bold text-[#1A2A44] text-lg">{review.name}</h4>
                    <p className="text-[#D4AF37] text-sm font-medium">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          
          {/* Gradient fade on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1A2A44] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1A2A44] to-transparent z-10"></div>
        </div>
        
        {/* Review indicator dots */}
        <div className="flex justify-center mt-12 gap-3">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex % reviews.length 
                  ? 'bg-[#D4AF37] scale-125 shadow-lg shadow-[#D4AF37]/30' 
                  : 'bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40'
              }`}
              onClick={() => {
                setActiveIndex(i);
                const offset = -i * 400; // Approximate width of a card plus gap
                controls.start({ x: offset });
                setCurrentPosition(offset);
              }}
              aria-label={`View review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 