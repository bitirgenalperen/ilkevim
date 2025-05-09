'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building, Home, MapPin, Phone, Search, ArrowRight, Calculator, Bath, Bed, Move, Calendar, Loader2, Percent } from "lucide-react"
import { PartnersCarousel } from "@/components/PartnersCarousel"
import { ReviewsCarousel } from "@/components/ReviewsCarousel"
import { cn } from "@/lib/utils"
import { Property } from '@/types/property'
import { getSignedUrlsForImages } from '@/lib/s3-client'

export default function HomePage() {
  const { t, i18n: i18nInstance } = useTranslation('homepage')
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Initialize language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
      i18nInstance.changeLanguage(storedLanguage)
    }
  }, [i18nInstance])

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: t('hero.slides.luxury.title'),
      subtitle: t('hero.slides.luxury.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      title: t('hero.slides.modern.title'),
      subtitle: t('hero.slides.modern.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: t('hero.slides.investment.title'),
      subtitle: t('hero.slides.investment.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
      title: t('hero.slides.premium.title'),
      subtitle: t('hero.slides.premium.subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: t('hero.slides.smart.title'),
      subtitle: t('hero.slides.smart.subtitle')
    }
  ]

  // Function to generate signed URLs for property images
  const generateSignedUrlsForPropertyImages = async (imageKeys: string[]) => {
    try {
      console.log('Generating signed URLs for property images:', imageKeys);
      const imagesWithUrls = await getSignedUrlsForImages(imageKeys);
      console.log('Generated signed URLs:', imagesWithUrls);
      return imagesWithUrls.map(img => img.url);
    } catch (error) {
      console.error('Error generating signed URLs for property images:', error);
      return imageKeys; // Return original keys if there's an error
    }
  };

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('/api/properties?listingType=featured&limit=3')
        if (!response.ok) {
          throw new Error('Failed to fetch featured properties')
        }
        const data = await response.json()
        
        // Generate signed URLs for all property images
        const propertiesWithSignedUrls = await Promise.all(
          data.properties.map(async (property: Property) => {
            if (property.images && property.images.length > 0) {
              const signedImageUrls = await generateSignedUrlsForPropertyImages(property.images);
              return { ...property, images: signedImageUrls };
            }
            return property;
          })
        );
        
        setFeaturedProperties(propertiesWithSignedUrls)
      } catch (error) {
        console.error('Error fetching featured properties:', error)
        setError('Failed to load featured properties')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(price)
  }

  function PropertyCard({ property }: { property: Property }) {
    const { t, i18n } = useTranslation('properties')
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoadError, setImageLoadError] = useState(false);
    const images = property.images.slice(0, 3); // Limit to 3 images

    const nextImage = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation when clicking arrows
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageLoadError(false); // Reset error state when changing images
    };

    const previousImage = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation when clicking arrows
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageLoadError(false); // Reset error state when changing images
    };

    const handleImageError = () => {
      setImageLoadError(true);
      // Try to load the next image if available
      if (images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    return (
      <Link href={`/properties/${property._id}`} className="block">
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-[#D4AF37]/20 bg-white/80 backdrop-blur-sm flex flex-col !py-0 cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            {imageLoadError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">{t('property_card.image_not_available')}</p>
                </div>
              </div>
            ) : (
              <img
                src={images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Navigation Arrows - Only visible on hover */}
            {images.length > 1 && !imageLoadError && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A2A44] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A2A44] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && !imageLoadError && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
            <Badge
              className={cn(
                "absolute top-4 right-4",
                property.listingType === 'featured' 
                  ? "bg-[#D4AF37]/90 hover:bg-[#D4AF37]/90 text-white" 
                  : "bg-white/90 hover:bg-white/90 text-[#1A2A44]"
              )}
            >
              {property.listingType === 'featured' ? t('property_card.featured') : t('property_card.standard')}
            </Badge>
          </div>
          <CardContent className="pt-3 px-6 pb-6 flex-grow">
            <div className="flex items-center gap-2 text-[#1A2A44] mb-2">
              <MapPin size={16} className="text-[#D4AF37]" />
              <span>{property.location.area}, {property.location.city}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {i18n.language === 'tr' ? property.description_tr : property.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-[#1A2A44]">
                <Bed size={16} className="text-[#D4AF37]" />
                <span>{property.features.bedrooms} {t('property_card.beds')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A2A44]">
                <Bath size={16} className="text-[#D4AF37]" />
                <span>{property.features.bathrooms} {t('property_card.baths')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A2A44]">
                <Move size={16} className="text-[#D4AF37]" />
                <span>{property.features.squareFootage} {t('property_card.sq_ft')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A2A44]">
                <Calendar size={16} className="text-[#D4AF37]" />
                <span>{property.features.yearBuilt}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent">
                {formatPrice(property.price)}
              </span>
              <Button 
                variant="outline"
                className="border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#1A2A44]/5 text-[#1A2A44] hover:text-[#1A2A44]"
                onClick={(e) => e.stopPropagation()}
              >
                {t('property_card.view_details')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[90vh] overflow-hidden group">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A44]/90 via-[#1A2A44]/70 to-transparent" />
              
              {/* Decorative Elements */}
              <div className="absolute inset-0">
                {/* Animated Circles */}
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-3xl opacity-20 animate-pulse" 
                     style={{animationDuration: '8s'}} />
                <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-[#D4AF37] rounded-full filter blur-3xl opacity-20 animate-pulse"
                     style={{animationDuration: '10s'}} />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-12">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Buttons - Moved outside of slides mapping */}
        <div className="absolute bottom-32 left-0 right-0 z-30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex flex-col md:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44] px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/40"
                  asChild
                >
                  <Link href="/properties">
                    {t('hero.buttons.browseProperties')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#D4AF37]/80 bg-[#1A2A44]/30 backdrop-blur-sm hover:bg-[#D4AF37]/10 text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
                  asChild
                >
                  <Link href="/contact">
                    {t('hero.buttons.bookConsultation')}
                    <Phone className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#D4AF37] w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#1A2A44]/50 backdrop-blur-sm text-white hover:bg-[#D4AF37] transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#1A2A44]/50 backdrop-blur-sm text-white hover:bg-[#D4AF37] transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 inline-block">
              {t('featured.badge')}
            </span>
            <h2 className="text-4xl font-bold text-[#1A2A44] mb-4">{t('featured.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
              
              {featuredProperties.length === 0 && !loading && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">{t('featured.noProperties')}</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button size="lg" className="bg-white text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 rounded-full">
                {t('featured.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 inline-block">
              {t('services.badge')}
            </span>
            <h2 className="text-4xl font-bold text-[#1A2A44] mb-4">{t('services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Home className="w-8 h-8 text-[#D4AF37]" />,
                title: t('services.items.residential.title'),
                description: t('services.items.residential.description')
              },
              {
                icon: <Building className="w-8 h-8 text-[#D4AF37]" />,
                title: t('services.items.commercial.title'),
                description: t('services.items.commercial.description')
              },
              {
                icon: <Search className="w-8 h-8 text-[#D4AF37]" />,
                title: t('services.items.search.title'),
                description: t('services.items.search.description')
              }
            ].map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <PartnersCarousel />
      
      {/* Customer Reviews Section */}
      <ReviewsCarousel />

      {/* Why Invest Section */}
      <section className="py-24 bg-gradient-to-b from-white via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 inline-block">
              {t('investment.badge')}
            </span>
            <h2 className="text-4xl font-bold mb-6 text-[#1A2A44]">
              {t('investment.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              {t('investment.description1')}
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('investment.description2')}
            </p>
          </div>

          {/* Investment Structure Diagram */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="relative">
              <div className="bg-[#D4AF37] p-6 text-[#1A2A44] text-center mb-4 rounded-t-lg shadow-lg">
                <span className="text-2xl font-bold">{t('investment.structure.deposit.amount')}</span>
                <p className="text-sm">{t('investment.structure.deposit.label')}</p>
              </div>
              <div className="bg-[#D4AF37]/90 p-6 text-[#1A2A44] text-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">{t('investment.structure.equity.amount')}</span>
                <p className="text-sm">{t('investment.structure.equity.label')}</p>
              </div>
              <div className="bg-[#D4AF37]/80 p-6 text-[#1A2A44] text-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">{t('investment.structure.mortgage.amount')}</span>
                <p className="text-sm">{t('investment.structure.mortgage.label')}</p>
              </div>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Only 5% Deposit */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Percent className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">{t('investment.benefits.deposit.title')}</h3>
                  <p className="text-gray-600">
                    {t('investment.benefits.deposit.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 40% Government Support */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Calculator className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">{t('investment.benefits.support.title')}</h3>
                  <p className="text-gray-600">
                    {t('investment.benefits.support.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h4 className="font-semibold text-[#1A2A44]">{t('investment.benefits.locations.title')}</h4>
              </div>
              <p className="text-gray-600">
                {t('investment.benefits.locations.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h4 className="font-semibold text-[#1A2A44]">{t('investment.benefits.rental.title')}</h4>
              </div>
              <p className="text-gray-600">
                {t('investment.benefits.rental.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h4 className="font-semibold text-[#1A2A44]">{t('investment.benefits.guidance.title')}</h4>
              </div>
              <p className="text-gray-600">
                {t('investment.benefits.guidance.description')}
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6 rounded-full">
                {t('investment.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
