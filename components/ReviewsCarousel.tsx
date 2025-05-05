'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';


// Define customer reviews data


export function ReviewsCarousel() {
  const { t } = useTranslation('homepage');
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [currentX, setCurrentX] = useState(0); // Track current x position

  const reviews = [
    {
      name: t('testimonials.reviews.0.name'),
      role: t('testimonials.reviews.0.role'),
      review: t('testimonials.reviews.0.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.1.name'),
      role: t('testimonials.reviews.1.role'),
      review: t('testimonials.reviews.1.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.2.name'),
      role: t('testimonials.reviews.2.role'),
      review: t('testimonials.reviews.2.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.3.name'),
      role: t('testimonials.reviews.3.role'),
      review: t('testimonials.reviews.3.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.4.name'),
      role: t('testimonials.reviews.4.role'),
      review: t('testimonials.reviews.4.review'),
      rating: 4,
    },
    {
      name: t('testimonials.reviews.5.name'),
      role: t('testimonials.reviews.5.role'),
      review: t('testimonials.reviews.5.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.6.name'),
      role: t('testimonials.reviews.6.role'),
      review: t('testimonials.reviews.6.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.7.name'),
      role: t('testimonials.reviews.7.role'),
      review: t('testimonials.reviews.7.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.8.name'),
      role: t('testimonials.reviews.8.role'),
      review: t('testimonials.reviews.8.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.9.name'),
      role: t('testimonials.reviews.9.role'),
      review: t('testimonials.reviews.9.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.10.name'),
      role: t('testimonials.reviews.10.role'),
      review: t('testimonials.reviews.10.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.11.name'),
      role: t('testimonials.reviews.11.role'),
      review: t('testimonials.reviews.11.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.12.name'),
      role: t('testimonials.reviews.12.role'),
      review: t('testimonials.reviews.12.review'),
      rating: 4,
    },
    {
      name: t('testimonials.reviews.13.name'),
      role: t('testimonials.reviews.13.role'),
      review: t('testimonials.reviews.13.review'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.14.name'),
      role: t('testimonials.reviews.14.role'),
      review: t('testimonials.reviews.14.review'),
      rating: 5,
    },
  ];
  
  // Triple reviews for seamless looping to cover wide viewports
  const allReviews = [...reviews, ...reviews, ...reviews];

  // Animation settings
  const cardWidth = 396; // w-[380px] + gap-8 (16px)
  const totalWidth = cardWidth * reviews.length; // Width of one set of reviews
  const animationDuration = 60; // Slower duration for readability (60s per cycle)

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
        const remainingDistance = -totalWidth - currentX; // Distance to end of one set
        const remainingTime = animationDuration * (Math.abs(remainingDistance) / totalWidth);

        // Animate to the end of one set of reviews
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: remainingTime > 0 ? remainingTime : animationDuration,
            ease: 'linear',
          },
        });

        // Reset to start for next cycle
        if (isMounted && isInView && !isPaused) {
          await controls.set({ x: 0 }); // Instant reset
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
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
            {t('testimonials.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
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
                    <p className="text-gray-600 italic leading-relaxed">{review.review}</p>
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
      </div>
    </section>
  );
}