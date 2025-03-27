'use client'

import { useState, useEffect } from 'react'
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
  BedDouble,
  X,
  SlidersHorizontal,
  ChevronDown,
  Star,
  Loader2
} from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Link from 'next/link'

export default function PropertiesPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)
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
    squareFootage: [0, 10000]
  })

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

  useEffect(() => {
    fetchProperties()
  }, [filters])

  // Fetch cities on initial page load
  useEffect(() => {
    fetchAvailableCities()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      // Add basic filters
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.city) params.append('city', filters.city)
      if (filters.searchTerm) params.append('searchTerm', filters.searchTerm)
      if (filters.amenities.length) params.append('amenities', filters.amenities.join(','))
      
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
      setProperties(data.properties)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

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
      case 'apartment':
        return <Building2 className="w-4 h-4" />
      case 'house':
        return <Home className="w-4 h-4" />
      case 'penthouse':
        return <Hotel className="w-4 h-4" />
      case 'villa':
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
      squareFootage: [0, MAX_SQFT]
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
      filters.squareFootage[1] !== MAX_SQFT
    )
  }

  const formatPriceLabel = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`
    }
    return `£${(value / 1000).toFixed(0)}k`
  }

  const formatBedroomsLabel = (value: number) => {
    if (value === 0) return "Any"
    if (value === MAX_BEDROOMS) return "6+"
    return value.toString()
  }

  const formatBathroomsLabel = (value: number) => {
    if (value === 0) return "Any"
    if (value === MAX_BATHROOMS) return "5+"
    return value.toString()
  }

  const formatSquareFootageLabel = (value: number) => {
    if (value === 0) return "Any"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4">
        {/* Filters Section */}
        <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-xl shadow-lg mb-8 overflow-hidden border border-teal-100">
          {/* Search Bar and Toggle */}
          <div className="p-4 border-b border-teal-100/50 bg-gradient-to-r from-teal-50/50 to-white">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                <Input
                  placeholder="Search by location, property name, or features..."
                  className="pl-9 pr-4 h-11 bg-white/80 backdrop-blur-sm border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 min-w-[100px] border-teal-200 hover:bg-teal-50/80 hover:border-teal-300 text-teal-700"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                aria-expanded={isFiltersOpen}
                aria-controls="filter-section"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isFiltersOpen ? "rotate-180" : ""
                  )} 
                />
                {hasActiveFilters() && (
                  <Badge className="ml-1 bg-teal-100 text-teal-800 hover:bg-teal-200">
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
                  className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
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
                    <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                      <Home className="w-4 h-4 text-teal-600" />
                      Property Type
                    </label>
                    <Select
                      value={filters.propertyType || "_any"}
                      onValueChange={(value) =>
                        setFilters({ ...filters, propertyType: value === "_any" ? null : value })
                      }
                    >
                      <SelectTrigger className="bg-white border-teal-200 focus:ring-teal-400 focus:border-teal-400">
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_any">Any type</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City Filter - Desktop */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                      <MapPinned className="w-4 h-4 text-teal-600" />
                      City
                    </label>
                    <Select
                      value={filters.city || "_any"}
                      onValueChange={(value) =>
                        setFilters({ ...filters, city: value === "_any" ? null : value })
                      }
                      disabled={citiesLoading}
                    >
                      <SelectTrigger className="bg-white border-teal-200 focus:ring-teal-400 focus:border-teal-400">
                        {citiesLoading ? (
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2 text-teal-600" />
                            <span>Loading cities...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Any location" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_any">Any location</SelectItem>
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
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <Star className="w-4 h-4 text-teal-600" />
                    Amenities
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
                            ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600" 
                            : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
                        )}
                      >
                        {amenity}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-teal-100/50 pt-6">
                {/* Price Range Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <PoundSterling className="w-4 h-4 text-teal-600" />
                    Price Range
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
                      <span className="text-sm text-teal-700">
                        {formatPriceLabel(filters.priceRange[0])}
                      </span>
                      <span className="text-sm text-teal-700">
                        {formatPriceLabel(filters.priceRange[1])}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Square Footage Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <Move className="w-4 h-4 text-teal-600" />
                    Square Footage
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
                      <span className="text-sm text-teal-700">
                        {formatSquareFootageLabel(filters.squareFootage[0])}
                      </span>
                      <span className="text-sm text-teal-700">
                        {formatSquareFootageLabel(filters.squareFootage[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-teal-600" />
                    Bedrooms
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
                      <span className="text-sm text-teal-700">
                        {formatBedroomsLabel(filters.bedrooms[0])}
                      </span>
                      <span className="text-sm text-teal-700">
                        {formatBedroomsLabel(filters.bedrooms[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bathrooms Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <Bath className="w-4 h-4 text-teal-600" />
                    Bathrooms
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
                      <span className="text-sm text-teal-700">
                        {formatBathroomsLabel(filters.bathrooms[0])}
                      </span>
                      <span className="text-sm text-teal-700">
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
              <div className="space-y-4 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                {/* Property Type - Mobile */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <Home className="w-4 h-4 text-teal-600" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type}
                        variant={filters.propertyType === type ? "default" : "outline"}
                        className={cn(
                          "justify-start h-auto py-2",
                          filters.propertyType === type 
                            ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600" 
                            : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
                        )}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            propertyType: filters.propertyType === type ? null : type,
                          })
                        }
                      >
                        {getPropertyTypeIcon(type)}
                        <span className="ml-2 capitalize">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* City Filter - Mobile */}
                <div className="space-y-2 pt-2 border-t border-teal-100/50">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-teal-600" />
                    City
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {citiesLoading ? (
                      <div className="col-span-2 flex items-center justify-center py-4 bg-white/90 rounded-md border border-teal-100">
                        <Loader2 className="h-5 w-5 animate-spin mr-2 text-teal-600" />
                        <span className="text-teal-700">Loading cities...</span>
                      </div>
                    ) : availableCities.length === 0 ? (
                      <div className="col-span-2 text-center py-4 text-teal-600 bg-white/90 rounded-md border border-teal-100">
                        No cities available
                      </div>
                    ) : (
                      availableCities.map((city) => (
                        <Button
                          key={city}
                          variant={filters.city === city ? "default" : "outline"}
                          className={cn(
                            "justify-start h-auto py-2",
                            filters.city === city 
                              ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600" 
                              : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
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
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                  <Star className="w-4 h-4 text-teal-600" />
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                      className={cn(
                        "justify-start h-auto py-2 text-sm",
                        filters.amenities.includes(amenity) 
                          ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600" 
                          : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
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
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Price Range - Mobile */}
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                  <PoundSterling className="w-4 h-4 text-teal-600" />
                  Price Range
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
                  <div className="flex justify-between text-sm text-teal-700">
                    <span>{formatPriceLabel(filters.priceRange[0])}</span>
                    <span>{formatPriceLabel(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              {/* Square Footage - Mobile */}
              <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                  <Move className="w-4 h-4 text-teal-600" />
                  Square Footage
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
                  <div className="flex justify-between text-sm text-teal-700">
                    <span>{formatSquareFootageLabel(filters.squareFootage[0])}</span>
                    <span>{formatSquareFootageLabel(filters.squareFootage[1])}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Bedrooms - Mobile */}
                <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-teal-600" />
                    Bedrooms
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
                    <div className="flex justify-between text-sm text-teal-700">
                      <span>{formatBedroomsLabel(filters.bedrooms[0])}</span>
                      <span>{formatBedroomsLabel(filters.bedrooms[1])}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bathrooms - Mobile */}
                <div className="space-y-2 bg-white/70 p-4 rounded-lg border border-teal-100/70">
                  <label className="text-sm font-medium text-teal-800 flex items-center gap-2">
                    <Bath className="w-4 h-4 text-teal-600" />
                    Bathrooms
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
                    <div className="flex justify-between text-sm text-teal-700">
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            {loading ? 'Loading...' : `${properties.length} Properties Found`}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card
                  key={property._id}
                  className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-teal-100 bg-white/80 backdrop-blur-sm flex flex-col !py-0"
                >
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
                          ? "bg-teal-600/90 hover:bg-teal-600/90 text-white" 
                          : "bg-white/90 hover:bg-white/90 text-teal-700"
                      )}
                    >
                      {property.listingType === 'featured' ? 'Featured' : 'Standard'}
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
            </div>

            {properties.length === 0 && (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-teal-100 shadow-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-2">
                    <Search className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    No properties found
                  </h3>
                  <p className="text-teal-700 max-w-md mx-auto">
                    Try adjusting your filters or broadening your search criteria to see more results
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-teal-700 hover:text-teal-800"
                    onClick={resetFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear all filters
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