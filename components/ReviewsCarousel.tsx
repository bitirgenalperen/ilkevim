'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { background } from '@/styles/theme';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

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
    <section className={background.tealLight("py-24")}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full mb-6 inline-block">
            Client Testimonials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of clients who have found their dream properties with us
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
                className="flex-shrink-0 w-[380px] border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl"
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-6 -rotate-12 shadow-md">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Review Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-teal-200" />
                    <p className="text-gray-600 italic">
                      &quot;{review.review}&quot;
                    </p>
                  </div>
                  
                  {/* Reviewer Info */}
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                    <p className="text-teal-600 text-sm font-medium">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          
          {/* Gradient fade on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-teal-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-teal-50 to-transparent z-10"></div>
        </div>
        
        {/* Review indicator dots */}
        <div className="flex justify-center mt-12 gap-3">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex % reviews.length ? 'bg-teal-500 scale-125' : 'bg-teal-200 hover:bg-teal-300'}`}
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