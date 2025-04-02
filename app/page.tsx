'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building, Home, MapPin, Phone, Search, ArrowRight, PiggyBank, Calculator, Bath, Bed, Move, Calendar, Loader2 } from "lucide-react"
import { PartnersCarousel } from "@/components/PartnersCarousel"
import { ReviewsCarousel } from "@/components/ReviewsCarousel"
import { cn } from "@/lib/utils"
import { Property } from '@/types/property'


export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: "Luxury Living in London",
      subtitle: "Discover premium properties in the heart of the city"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      title: "Modern Architecture",
      subtitle: "Contemporary homes with stunning designs"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: "Investment Opportunities",
      subtitle: "Prime real estate for smart investors"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
      title: "Premium Locations",
      subtitle: "Exclusive properties in sought-after areas"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      title: "Smart Investment",
      subtitle: "Strategic property investments for long-term growth"
    }
  ]

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('/api/properties?listingType=featured&limit=3')
        if (!response.ok) {
          throw new Error('Failed to fetch featured properties')
        }
        const data = await response.json()
        setFeaturedProperties(data.properties)
      } catch (error) {
        console.error('Error fetching featured properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

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
    return (
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-[#D4AF37]/20 bg-white/80 backdrop-blur-sm flex flex-col !py-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge
            className={cn(
              "absolute top-4 right-4",
              property.listingType === 'featured' 
                ? "bg-[#D4AF37]/90 hover:bg-[#D4AF37]/90 text-white" 
                : "bg-white/90 hover:bg-white/90 text-[#1A2A44]"
            )}
          >
            {property.listingType === 'featured' ? 'Featured' : 'Standard'}
          </Badge>
        </div>
        <CardContent className="pt-3 px-6 pb-6 flex-grow">
          <div className="flex items-center gap-2 text-[#1A2A44] mb-2">
            <MapPin size={16} className="text-[#D4AF37]" />
            <span>{property.location.area}, {property.location.city}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-[#1A2A44]">
              <Bed size={16} className="text-[#D4AF37]" />
              <span>{property.features.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A2A44]">
              <Bath size={16} className="text-[#D4AF37]" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2 text-[#1A2A44]">
              <Move size={16} className="text-[#D4AF37]" />
              <span>{property.features.squareFootage} sq ft</span>
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
            <Link href={`/properties/${property._id}`}>
              <Button 
                variant="outline"
                className="border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#1A2A44]/5 text-[#1A2A44] hover:text-[#1A2A44]"
              >
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
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
                    Browse Properties
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
                    Book a Consultation
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
              Featured Listings
            </span>
            <h2 className="text-4xl font-bold text-[#1A2A44] mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties across the UK
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
                  <p className="text-gray-600">No featured properties available at the moment.</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button size="lg" className="bg-white text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 rounded-full">
                View All Properties
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
              Our Expertise
            </span>
            <h2 className="text-4xl font-bold text-[#1A2A44] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Home className="w-8 h-8 text-[#D4AF37]" />,
                title: "Residential Sales",
                description: "Find your perfect home with our extensive portfolio of residential properties."
              },
              {
                icon: <Building className="w-8 h-8 text-[#D4AF37]" />,
                title: "Commercial Properties",
                description: "Expert guidance in commercial real estate investments and leasing."
              },
              {
                icon: <Search className="w-8 h-8 text-[#D4AF37]" />,
                title: "Property Search",
                description: "Personalized property search service tailored to your specific requirements."
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
              Investment Opportunities
            </span>
            <h2 className="text-4xl font-bold mb-6 text-[#1A2A44]">
              Real Estate Investment Consultancy in the UK
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              The London real estate market has emerged as one of the markets that international investors have been most interested in over the years. The most important reason for this popularity is that the increase in this market has exceeded the real estate returns of other world cities, and even many financial products, for a long time. Another important factor is that London serves as a safe harbor for potential buyers and consistently attracts European and intercontinental capital.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As you might expect, London has many attraction points. Among these are being a global financial center, having a continuously growing economy, and being one of the primary destination points for international students and working professionals.
            </p>
          </div>

          {/* Investment Structure Diagram */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="relative">
              <div className="bg-[#D4AF37] p-6 text-[#1A2A44] text-center mb-4 rounded-t-lg shadow-lg">
                <span className="text-2xl font-bold">£19,998</span>
                <p className="text-sm">Buyer&apos;s 5% deposit</p>
              </div>
              <div className="bg-[#D4AF37]/90 p-6 text-[#1A2A44] text-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">£159,980</span>
                <p className="text-sm">40% Equity loan</p>
              </div>
              <div className="bg-[#D4AF37]/80 p-6 text-[#1A2A44] text-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">£219,972</span>
                <p className="text-sm">55% mortgage</p>
              </div>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* No Stamp Duty */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <PiggyBank className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">No Stamp Duty!</h3>
                  <p className="text-gray-600">
                    As part of the economic support campaign, stamp duty has been removed until June 2021 for home buyers up to £500,000.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Only 5% Deposit */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <Home className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">Only 5% Deposit</h3>
                  <p className="text-gray-600">
                    For first-time home buyers in the UK, the deposit rate is only 5%.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 40% Government Support */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <Calculator className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#1A2A44]">40% Government Support</h3>
                  <p className="text-gray-600">
                    Catch the opportunity to become a homeowner with 40% government support in London housing projects, and 20% government support in housing projects outside London!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A2A44] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6 rounded-full">
                Explore Investment Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
