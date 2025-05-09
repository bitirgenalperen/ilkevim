'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Property, Filters } from '@/types/property'
import { propertyTypes, commonAmenities } from '@/data/properties'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Bath, 
  Bed, 
  Move, 
  Calendar, 
  Search,
  Home,
  Building2,
  Hotel,
  Castle,
  MapPinned,
  PoundSterling,
  X,
  SlidersHorizontal,
  ChevronDown,
  Star,
  Loader2
} from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { getSignedUrlsForImages } from '@/lib/s3-client'

export default function PropertiesPage() {
  const { t } = useTranslation('properties')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    propertyType: null,
    city: null,
    priceRange: [0, 5000000],
    bedrooms: [0, 6],
    bathrooms: [0, 5],
    amenities: [],
    searchTerm: '',
    squareFootage: [0, 10000],
    stayType: 'buy'
  })
  const [error, setError] = useState<string | null>(null)

  const MAX_PRICE = 5000000
  const MAX_BEDROOMS = 6
  const MAX_BATHROOMS = 5
  const MAX_SQFT = 10000

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFiltersOpen) {
        setIsFiltersOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFiltersOpen])

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

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      // Add basic filters
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.city) params.append('city', filters.city)
      if (filters.searchTerm) params.append('searchTerm', filters.searchTerm)
      if (filters.amenities.length) params.append('amenities', filters.amenities.join(','))
      if (filters.stayType) params.append('stayType', filters.stayType)
      
      // Add range filters only if they're different from default values
      if (filters.priceRange[0] !== 0) params.append('minPrice', filters.priceRange[0].toString())
      if (filters.priceRange[1] !== MAX_PRICE) params.append('maxPrice', filters.priceRange[1].toString())
      
      if (filters.bedrooms[0] !== 0) params.append('minBedrooms', filters.bedrooms[0].toString())
      if (filters.bedrooms[1] !== MAX_BEDROOMS) params.append('maxBedrooms', filters.bedrooms[1].toString())
      
      if (filters.bathrooms[0] !== 0) params.append('minBathrooms', filters.bathrooms[0].toString())
      if (filters.bathrooms[1] !== MAX_BATHROOMS) params.append('maxBathrooms', filters.bathrooms[1].toString())
      
      if (filters.squareFootage[0] !== 0) params.append('minSquareFootage', filters.squareFootage[0].toString())
      if (filters.squareFootage[1] !== MAX_SQFT) params.append('maxSquareFootage', filters.squareFootage[1].toString())

      console.log('Fetching properties with params:', params.toString())
      
      const response = await fetch(`/api/properties?${params.toString()}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch properties')
      }
      
      const data = await response.json()
      console.log('Received properties:', data.properties)
      
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
      
      setProperties(propertiesWithSignedUrls)
    } catch (error) {
      console.error('Error fetching properties:', error)
      setError('There was an error loading the properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Fetch cities on initial page load
  useEffect(() => {
    fetchAvailableCities()
  }, [])

  const fetchAvailableCities = async () => {
    setCitiesLoading(true)
    try {
      const response = await fetch('/api/properties/cities')
      if (!response.ok) {
        throw new Error('Failed to fetch cities')
      }
      const data = await response.json()
      console.log('Available cities:', data.cities)
      setAvailableCities(data.cities)
    } catch (error) {
      console.error('Error fetching cities:', error)
      // Set a fallback of empty cities array if fetch fails
      setAvailableCities([])
    } finally {
      setCitiesLoading(false)
    }
  }

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case t('property_type_list.apartment'):
        return <Building2 className="w-4 h-4" />
      case t('property_type_list.house'):
        return <Home className="w-4 h-4" />
      case t('property_type_list.penthouse'):
        return <Hotel className="w-4 h-4" />
      case t('property_type_list.villa'):
        return <Castle className="w-4 h-4" />
      default:
        return <Home className="w-4 h-4" />
    }
  }

  const resetFilters = () => {
    setFilters({
      propertyType: null,
      city: null,
      priceRange: [0, MAX_PRICE],
      bedrooms: [0, MAX_BEDROOMS],
      bathrooms: [0, MAX_BATHROOMS],
      amenities: [],
      searchTerm: '',
      squareFootage: [0, MAX_SQFT],
      stayType: 'buy'
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.propertyType !== null ||
      filters.city !== null ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== MAX_PRICE ||
      filters.bedrooms[0] !== 0 ||
      filters.bedrooms[1] !== MAX_BEDROOMS ||
      filters.bathrooms[0] !== 0 ||
      filters.bathrooms[1] !== MAX_BATHROOMS ||
      filters.amenities.length > 0 ||
      filters.searchTerm !== '' ||
      filters.squareFootage[0] !== 0 ||
      filters.squareFootage[1] !== MAX_SQFT ||
      filters.stayType !== 'buy'
    )
  }

  const formatPriceLabel = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`
    }
    return `£${(value / 1000).toFixed(0)}k`
  }

  const formatBedroomsLabel = (value: number) => {
    if (value === 0) return "0"
    if (value === MAX_BEDROOMS) return "6+"
    return value.toString()
  }

  const formatBathroomsLabel = (value: number) => {
    if (value === 0) return "0"
    if (value === MAX_BATHROOMS) return "5+"
    return value.toString()
  }

  const formatSquareFootageLabel = (value: number) => {
    if (value === 0) return "0"
    if (value === MAX_SQFT) return "10,000+ sq ft"
    return `${value.toLocaleString()} sq ft`
  }

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4">
        {/* Filters Section */}
        <div className="bg-gradient-to-br from-white to-[#1A2A44]/5 rounded-xl shadow-lg mb-8 overflow-hidden border border-[#D4AF37]/20">
          {/* Search Bar and Toggle */}
          <div className="p-4 border-b border-[#D4AF37]/10 bg-gradient-to-r from-[#1A2A44]/5 to-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={filters.stayType === 'buy' ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    "min-w-[80px]",
                    filters.stayType === 'buy'
                      ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]"
                      : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                  )}
                  onClick={() => setFilters({ ...filters, stayType: 'buy' })}
                >
                  {t('filters.buy')}
                </Button>
                <Button
                  variant={filters.stayType === 'rent' ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    "min-w-[80px]",
                    filters.stayType === 'rent'
                      ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]"
                      : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                  )}
                  onClick={() => setFilters({ ...filters, stayType: 'rent' })}
                >
                  {t('filters.rent')}
                </Button>
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37] z-10" />
                <Input
                  placeholder={t('filters.search_placeholder')}
                  className="pl-9 pr-4 h-11 bg-white/80 backdrop-blur-sm border-[#D4AF37]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 min-w-[100px] border-[#D4AF37]/20 hover:bg-[#1A2A44]/5 hover:border-[#D4AF37] text-[#1A2A44]"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                aria-expanded={isFiltersOpen}
                aria-controls="filter-section"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('filters.filters_button')}
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isFiltersOpen ? "rotate-180" : ""
                  )} 
                />
                {hasActiveFilters() && (
                  <Badge className="ml-1 bg-[#D4AF37]/10 text-[#1A2A44] hover:bg-[#D4AF37]/20">
                    {[
                      filters.propertyType,
                      filters.city,
                      (filters.priceRange[0] !== 0 || filters.priceRange[1] !== MAX_PRICE),
                      (filters.bedrooms[0] !== 0 || filters.bedrooms[1] !== MAX_BEDROOMS),
                      (filters.bathrooms[0] !== 0 || filters.bathrooms[1] !== MAX_BATHROOMS),
                      (filters.squareFootage[0] !== 0 || filters.squareFootage[1] !== MAX_SQFT),
                      ...(filters.amenities),
                      filters.searchTerm
                    ].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-[#1A2A44] hover:text-[#1A2A44] hover:bg-[#1A2A44]/5 gap-2"
                >
                  <X className="w-4 h-4" />
                  {t('filters.clear_button')}
                </Button>
              )}
            </div>
          </div>

          {/* Filters Section Content */}
          <div
            id="filter-section"
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              isFiltersOpen ? "max-h-[2000px] opacity-100 py-6 px-6" : "max-h-0 opacity-0 py-0 px-6"
            )}
          >
            {/* Desktop Filters */}
            <div className="hidden md:block">
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Property Type & City Column */}
                <div className="space-y-6">
                  {/* Property Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#D4AF37]" />
                      {t('filters.property_type')}
                    </label>
                    <Select
                      value={filters.propertyType || "_any"}
                      onValueChange={(value) =>
                        setFilters({ ...filters, propertyType: value === "_any" ? null : value })
                      }
                    >
                      <SelectTrigger className="bg-white border-[#D4AF37]/20 focus:ring-[#D4AF37] focus:border-[#D4AF37]">
                        <SelectValue placeholder={t('filters.any_type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_any">{t('filters.any_type')}</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {t(`filters.property_type_list.${type}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City Filter - Desktop */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                      <MapPinned className="w-4 h-4 text-[#D4AF37]" />
                      {t('filters.city')}
                    </label>
                    <Select
                      value={filters.city || "_any"}
                      onValueChange={(value) =>
                        setFilters({ ...filters, city: value === "_any" ? null : value })
                      }
                      disabled={citiesLoading}
                    >
                      <SelectTrigger className="bg-white border-[#D4AF37]/20 focus:ring-[#D4AF37] focus:border-[#D4AF37]">
                        {citiesLoading ? (
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2 text-[#D4AF37]" />
                            <span>{t('loading.cities')}</span>
                          </div>
                        ) : (
                          <SelectValue placeholder={citiesLoading ? "Loading..." : t('filters.any_city')} />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_any">{t('filters.any_city')}</SelectItem>
                        {availableCities.length === 0 && !citiesLoading ? (
                          <SelectItem value="_none" disabled>No cities available</SelectItem>
                        ) : (
                          availableCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Amenities Filter - Desktop */}
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.amenities')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {commonAmenities.map((amenity) => (
                      <Button
                        key={amenity}
                        variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          amenities: prev.amenities.includes(amenity)
                            ? prev.amenities.filter(a => a !== amenity)
                            : [...prev.amenities, amenity]
                        }))}
                        className={cn(
                          "text-sm justify-start h-auto py-1.5 text-xs",
                          filters.amenities.includes(amenity) 
                            ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]" 
                            : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                        )}
                      >
                        {t(`filters.amenities_list.${amenity}`)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[#D4AF37]/10 pt-6">
                {/* Price Range Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <PoundSterling className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.price_range')}
                  </label>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={MAX_PRICE}
                      step={100000}
                      value={filters.priceRange}
                      onValueChange={(value: [number, number]) =>
                        setFilters({ ...filters, priceRange: value })
                      }
                      className="py-4"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-[#1A2A44]">
                        {formatPriceLabel(filters.priceRange[0])}
                      </span>
                      <span className="text-sm text-[#1A2A44]">
                        {formatPriceLabel(filters.priceRange[1])}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Square Footage Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Move className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.square_footage')}
                  </label>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={MAX_SQFT}
                      step={100}
                      value={filters.squareFootage}
                      onValueChange={(value: [number, number]) =>
                        setFilters({ ...filters, squareFootage: value })
                      }
                      className="py-4"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-[#1A2A44]">
                        {formatSquareFootageLabel(filters.squareFootage[0])}
                      </span>
                      <span className="text-sm text-[#1A2A44]">
                        {formatSquareFootageLabel(filters.squareFootage[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.bedrooms')}
                  </label>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={MAX_BEDROOMS}
                      step={1}
                      value={filters.bedrooms}
                      onValueChange={(value: [number, number]) =>
                        setFilters({ ...filters, bedrooms: value })
                      }
                      className="py-4"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-[#1A2A44]">
                        {formatBedroomsLabel(filters.bedrooms[0])}
                      </span>
                      <span className="text-sm text-[#1A2A44]">
                        {formatBedroomsLabel(filters.bedrooms[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bathrooms Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.bathrooms')}
                  </label>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={MAX_BATHROOMS}
                      step={1}
                      value={filters.bathrooms}
                      onValueChange={(value: [number, number]) =>
                        setFilters({ ...filters, bathrooms: value })
                      }
                      className="py-4"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-[#1A2A44]">
                        {formatBathroomsLabel(filters.bathrooms[0])}
                      </span>
                      <span className="text-sm text-[#1A2A44]">
                        {formatBathroomsLabel(filters.bathrooms[1])}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            <div className="md:hidden space-y-6">
              {/* Property Type & City Group - Mobile */}
              <div className="space-y-4 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                {/* Property Type - Mobile */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.property_type')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type}
                        variant={filters.propertyType === type ? "default" : "outline"}
                        className={cn(
                          "justify-start h-auto py-2",
                          filters.propertyType === type 
                            ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]" 
                            : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                        )}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            propertyType: filters.propertyType === type ? null : type,
                          })
                        }
                      >
                        {getPropertyTypeIcon(type)}
                        <span className="ml-2">{t(`filters.property_type_list.${type}`)}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* City Filter - Mobile */}
                <div className="space-y-2 pt-2 border-t border-[#D4AF37]/10">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.city')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {citiesLoading ? (
                      <div className="col-span-2 flex items-center justify-center py-4 bg-white/90 rounded-md border border-[#D4AF37]/20">
                        <Loader2 className="h-5 w-5 animate-spin mr-2 text-[#D4AF37]" />
                        <span className="text-[#1A2A44]">{t('loading.cities')}</span>
                      </div>
                    ) : availableCities.length === 0 ? (
                      <div className="col-span-2 text-center py-4 text-[#1A2A44] bg-white/90 rounded-md border border-[#D4AF37]/20">
                        {t('filters.no_cities_available')}
                      </div>
                    ) : (
                      availableCities.map((city) => (
                        <Button
                          key={city}
                          variant={filters.city === city ? "default" : "outline"}
                          className={cn(
                            "justify-start h-auto py-2",
                            filters.city === city 
                              ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]" 
                              : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                          )}
                          onClick={() =>
                            setFilters({
                              ...filters,
                              city: filters.city === city ? null : city,
                            })
                          }
                        >
                          {city}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
              </div>
              
              {/* Amenities - Mobile */}
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D4AF37]" />
                  {t('filters.amenities')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                      className={cn(
                        "justify-start h-auto py-2 text-sm",
                        filters.amenities.includes(amenity) 
                          ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]" 
                          : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                      )}
                      onClick={() => 
                        setFilters(prev => ({
                          ...prev,
                          amenities: prev.amenities.includes(amenity)
                            ? prev.amenities.filter(a => a !== amenity)
                            : [...prev.amenities, amenity]
                        }))
                      }
                    >
                      {t(`filters.amenities_list.${amenity}`)}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Price Range - Mobile */}
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                  <PoundSterling className="w-4 h-4 text-[#D4AF37]" />
                  {t('filters.price_range')}
                </label>
                <div className="pt-2 px-2">
                  <Slider
                    defaultValue={[0, MAX_PRICE]}
                    min={0}
                    max={MAX_PRICE}
                    step={50000}
                    value={filters.priceRange}
                    onValueChange={(value) => 
                      setFilters({ ...filters, priceRange: value as [number, number] })
                    }
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-[#1A2A44]">
                    <span>{formatPriceLabel(filters.priceRange[0])}</span>
                    <span>{formatPriceLabel(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              {/* Square Footage - Mobile */}
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                  <Move className="w-4 h-4 text-[#D4AF37]" />
                  {t('filters.square_footage')}
                </label>
                <div className="pt-2 px-2">
                  <Slider
                    defaultValue={[0, MAX_SQFT]}
                    min={0}
                    max={MAX_SQFT}
                    step={100}
                    value={filters.squareFootage}
                    onValueChange={(value) => 
                      setFilters({ ...filters, squareFootage: value as [number, number] })
                    }
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-[#1A2A44]">
                    <span>{formatSquareFootageLabel(filters.squareFootage[0])}</span>
                    <span>{formatSquareFootageLabel(filters.squareFootage[1])}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Bedrooms - Mobile */}
                <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.bedrooms')}
                  </label>
                  <div className="pt-2 px-2">
                    <Slider
                      defaultValue={[0, MAX_BEDROOMS]}
                      min={0}
                      max={MAX_BEDROOMS}
                      step={1}
                      value={filters.bedrooms}
                      onValueChange={(value) => 
                        setFilters({ ...filters, bedrooms: value as [number, number] })
                      }
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-[#1A2A44]">
                      <span>{formatBedroomsLabel(filters.bedrooms[0])}</span>
                      <span>{formatBedroomsLabel(filters.bedrooms[1])}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bathrooms - Mobile */}
                <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-[#D4AF37]/20">
                  <label className="text-sm font-medium text-[#1A2A44] flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#D4AF37]" />
                    {t('filters.bathrooms')}
                  </label>
                  <div className="pt-2 px-2">
                    <Slider
                      defaultValue={[0, MAX_BATHROOMS]}
                      min={0}
                      max={MAX_BATHROOMS}
                      step={1}
                      value={filters.bathrooms}
                      onValueChange={(value) => 
                        setFilters({ ...filters, bathrooms: value as [number, number] })
                      }
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-[#1A2A44]">
                      <span>{formatBathroomsLabel(filters.bathrooms[0])}</span>
                      <span>{formatBathroomsLabel(filters.bathrooms[1])}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent">
            {loading ? t('loading.text') : `${properties.length} ${t('loading.found')}`}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              {/* Main spinner with decorative elements */}
              <div className="relative mb-8">
                {/* Main spinner */}
                <div className="animate-spin h-16 w-16 border-4 border-[#D4AF37] rounded-full border-t-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -left-2 h-20 w-20 border-2 border-[#1A2A44]/20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="absolute -bottom-2 -right-2 h-20 w-20 border-2 border-[#1A2A44]/20 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }}></div>
                
                {/* Gold accent dots */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="h-3 w-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
              
              {/* Loading text - shorter and below the animation */}
              <div className="text-[#1A2A44] font-medium">
                {t('loading.text')}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {properties.length === 0 && (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-[#D4AF37]/20 shadow-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#1A2A44]/5 flex items-center justify-center mb-2">
                    <Search className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent">
                    {t('filters.no_properties_found')}
                  </h3>
                  <p className="text-[#1A2A44] max-w-md mx-auto">
                    {t('filters.no_properties_message')}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#1A2A44]/5 text-[#1A2A44] hover:text-[#1A2A44]"
                    onClick={resetFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {t('filters.clear_all_filters')}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 