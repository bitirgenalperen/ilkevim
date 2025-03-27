'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building, Home, MapPin, Phone, Mail, Search, ArrowRight, TrendingUp, Percent, PiggyBank, Calculator, Globe2, Shield, Bath, Bed, Move, Calendar, Loader2 } from "lucide-react"
import { PartnersCarousel } from "@/components/PartnersCarousel"
import { ReviewsCarousel } from "@/components/ReviewsCarousel"
import { cn } from "@/lib/utils"
import { Property } from '@/types/property'

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Creative Background with Teal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900">
          {/* Abstract Pattern Overlay */}
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
          
          {/* Dynamic Wave Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
            <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255, 255, 255, 0.1)" fillOpacity="1" 
                d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,122.7C672,107,768,85,864,96C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
            </svg>
            <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(255, 255, 255, 0.05)" fillOpacity="1" 
                d="M0,96L48,122.7C96,149,192,203,288,202.7C384,203,480,149,576,133.3C672,117,768,139,864,160C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
            </svg>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-10">
          {/* Floating Circles */}
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-teal-400 rounded-full filter blur-3xl opacity-20 animate-pulse" 
               style={{animationDuration: '8s'}} />
          <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"
               style={{animationDuration: '10s'}} />
          
          {/* Teal Accent Shapes */}
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-300 rounded-full filter blur-xl opacity-30" />
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-teal-500 rounded-full filter blur-xl opacity-20" />
          
          {/* Property Icon Elements */}
          <div className="absolute top-1/6 right-1/6 text-white/10">
            <Home className="w-32 h-32 transform rotate-12" />
          </div>
          <div className="absolute bottom-1/5 left-1/6 text-white/10">
            <Building className="w-40 h-40 transform -rotate-6" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-600/20 backdrop-blur-sm border border-teal-500/30 text-white text-sm">
                <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                Trusted by over 10,000+ clients worldwide
              </span>
            </div>

            {/* Main Content */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Your Gateway to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300"> Premium UK </span>
                Real Estate
              </h1>
              <p className="text-xl md:text-2xl text-teal-50 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover exceptional properties across the United Kingdom with our expert real estate services and exclusive portfolio
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Link href="/properties">
                  <Button size="lg" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/40">
                    Browse Properties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-teal-400/80 bg-teal-800/30 backdrop-blur-sm hover:bg-teal-700/40 text-white px-8 py-6 text-lg rounded-full transition-all duration-300">
                    Book a Consultation
                    <Phone className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { number: "1,500+", label: "Properties" },
                { number: "£2B+", label: "Properties Sold" },
                { number: "10K+", label: "Happy Clients" },
                { number: "98%", label: "Success Rate" }
              ].map((stat, i) => (
                <div key={i} className="text-center bg-teal-800/20 backdrop-blur-sm p-4 rounded-xl border border-teal-500/20 hover:bg-teal-700/30 transition-colors duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-teal-100 mb-2">{stat.number}</div>
                  <div className="text-teal-200 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* Why Invest Section */}
      <section className="py-24 bg-gradient-to-b from-white via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full mb-6 inline-block">
              Investment Opportunities
            </span>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
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
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white text-center mb-4 rounded-t-lg shadow-lg">
                <span className="text-2xl font-bold">£19,998</span>
                <p className="text-sm">Buyer's 5% deposit</p>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white text-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">£159,980</span>
                <p className="text-sm">40% Equity loan</p>
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 text-white text-center mb-4 shadow-lg">
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
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <PiggyBank className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">No Stamp Duty!</h3>
                  <p className="text-gray-600">
                    As part of the economic support campaign, stamp duty has been removed until June 2021 for home buyers up to £500,000.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Only 5% Deposit */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <Home className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Only 5% Deposit</h3>
                  <p className="text-gray-600">
                    For first-time home buyers in the UK, the deposit rate is only 5%.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 40% Government Support */}
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl flex items-center justify-center mb-4 transform -rotate-6">
                    <Calculator className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">40% Government Support</h3>
                  <p className="text-gray-600">
                    Catch the opportunity to become a homeowner with 40% government support in London housing projects, and 20% government support in housing projects outside London!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6 rounded-full">
                Explore Investment Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <PartnersCarousel />
      
      {/* Customer Reviews Section */}
      <ReviewsCarousel />

      {/* Featured Properties Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full mb-6 inline-block">
              Featured Listings
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties across the UK
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <Card
                  key={property._id}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col !py-0"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge
                      className={cn(
                        "absolute top-4 right-4",
                        "bg-teal-600/90 hover:bg-teal-600/90 text-white"
                      )}
                    >
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="pt-3 px-6 pb-6 flex-grow">
                    <div className="flex items-center gap-2 text-teal-600 mb-2">
                      <MapPin size={16} className="text-teal-600" />
                      <span>{property.location.area}, {property.location.city}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-teal-700">
                        <Bed size={16} className="text-teal-600" />
                        <span>{property.features.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-700">
                        <Bath size={16} className="text-teal-600" />
                        <span>{property.features.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-700">
                        <Move size={16} className="text-teal-600" />
                        <span>{property.features.squareFootage} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-700">
                        <Calendar size={16} className="text-teal-600" />
                        <span>{property.features.yearBuilt}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        {formatPrice(property.price)}
                      </span>
                      <Link href={`/properties/${property._id}`}>
                        <Button 
                          variant="outline"
                          className="border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-teal-700 hover:text-teal-800"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
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
              <Button size="lg" className="bg-white text-teal-700 border-2 border-teal-200 hover:bg-teal-50 px-8 py-6 rounded-full">
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
            <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-4 py-2 rounded-full mb-6 inline-block">
              Our Expertise
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Home className="w-8 h-8 text-teal-600" />,
                title: "Residential Sales",
                description: "Find your perfect home with our extensive portfolio of residential properties."
              },
              {
                icon: <Building className="w-8 h-8 text-teal-600" />,
                title: "Commercial Properties",
                description: "Expert guidance in commercial real estate investments and leasing."
              },
              {
                icon: <Search className="w-8 h-8 text-teal-600" />,
                title: "Property Search",
                description: "Personalized property search service tailored to your specific requirements."
              }
            ].map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none bg-white">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-semibold text-teal-400 bg-teal-900/30 px-4 py-2 rounded-full mb-8 inline-block backdrop-blur-sm">
              Get in Touch
            </span>
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Contact our expert team today and let us help you find the perfect property
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
              <Link href="tel:+441234567890" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300">
                <Phone size={20} className="text-teal-400" />
                <span className="font-medium">+44 123 456 7890</span>
              </Link>
              <Link href="mailto:info@ukestates.com" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300">
                <Mail size={20} className="text-teal-400" />
                <span className="font-medium">info@ukestates.com</span>
              </Link>
            </div>
            <Link href="/properties">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-6 rounded-full">
                Schedule a Viewing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
