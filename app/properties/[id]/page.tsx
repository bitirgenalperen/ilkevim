'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Property } from '@/types/property'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Bath, 
  Bed, 
  Move,
  Home, 
  Share2,
  ArrowLeft,
  Check,
  Info,
  Calculator,
  Calendar,
  ParkingCircle,
  Wifi,
  Shield,
  Flame,
  Wine,
  UtensilsCrossed,
  Tv,
  ChefHat,
  ArrowUpDown,
  Flower,
  Car,
  BatteryCharging,
  HeartPulse,
  WavesLadder,
  Heater,
  TabletSmartphone,
  Binoculars,
  Shirt,
  TowerControl,
  Eclipse
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PropertyMap } from '@/components/PropertyMap'
import { getSignedUrlsForImages } from '@/lib/s3-client'

// Define amenity icons and descriptions mapping
const amenityDetails = {
  "Concierge": {
    icon: Car,
    title: "Concierge",
    description: "24/7 dedicated concierge service"
  },
  "Parking": {
    icon: ParkingCircle,
    title: "Parking",
    description: "Secure parking available"
  },
  "EV Charging": {
    icon: BatteryCharging,
    title: "EV Charging",
    description: "Electric vehicle charging stations"
  },
  "Garden": {
    icon: Flower,
    title: "Garden",
    description: "Beautiful landscaped garden"
  },
  "Balcony": {
    icon: Eclipse,
    title: "Balcony",
    description: "Private outdoor space"
  },
  "Roof Terrace": {
    icon: TowerControl,
    title: "Roof Terrace",
    description: "Stunning rooftop views"
  },
  "Private Elevator": {
    icon: ArrowUpDown,
    title: "Private Elevator",
    description: "Direct elevator access"
  },
  "Gym": {
    icon: HeartPulse,
    title: "Gym",
    description: "State-of-the-art fitness center"
  },
  "Swimming Pool": {
    icon: WavesLadder,
    title: "Swimming Pool",
    description: "Indoor/outdoor swimming facilities"
  },
  "Spa/Sauna": {
    icon: Heater,
    title: "Spa/Sauna",
    description: "Relaxation and wellness area"
  },
  "Smart Home System": {
    icon: TabletSmartphone,
    title: "Smart Home",
    description: "Integrated smart home technology"
  },
  "Security System": {
    icon: Shield,
    title: "Security System",
    description: "Advanced security systems"
  },
  "High-Speed Internet": {
    icon: Wifi,
    title: "High-Speed Internet",
    description: "Fiber optic connection"
  },
  "Home Cinema": {
    icon: Tv,
    title: "Home Cinema",
    description: "Premium entertainment space"
  },
  "Wine Cellar": {
    icon: Wine,
    title: "Wine Cellar",
    description: "Temperature-controlled wine storage"
  },
  "Chef Kitchen": {
    icon: ChefHat,
    title: "Chef's Kitchen",
    description: "Professional-grade kitchen"
  },
  "Walk-In Closet": {
    icon: Shirt,
    title: "Walk-In Closet",
    description: "Spacious storage solutions"
  },
  "Panoramic Views": {
    icon: Binoculars,
    title: "Panoramic Views",
    description: "Breathtaking scenery"
  },
  "Fireplace": {
    icon: Flame,
    title: "Fireplace",
    description: "Cozy indoor fireplace"
  },
  "Outdoor Kitchen/BBQ": {
    icon: UtensilsCrossed,
    title: "Outdoor Kitchen",
    description: "Outdoor cooking and dining area"
  }
};

// Improved SDLT calculation function
interface SDLTResult {
  totalSDLT: number;
  breakdown: { rate: number; amount: number; taxablePortion: number }[];
}

function calculateSDLT(
  propertyPrice: number,
  isFirstTimeBuyer: boolean = false,
  ownsAdditionalProperty: boolean = false,
  isNonUKResident: boolean = false,
  isReplacingMainResidence: boolean = false
): SDLTResult {
  // Standard rates from 1 April 2025
  const standardBands = [
    { threshold: 125000, rate: 0 },
    { threshold: 250000, rate: 2 },
    { threshold: 925000, rate: 5 },
    { threshold: 1500000, rate: 10 },
    { threshold: Infinity, rate: 12 },
  ];

  // First-time buyer rates from 1 April 2025
  const firstTimeBuyerBands = [
    { threshold: 300000, rate: 0 },
    { threshold: 500000, rate: 5 },
    { threshold: Infinity, rate: null as unknown as number }, // No relief above £500,000
  ];

  let bands = standardBands;
  let additionalRate = 0;
  let surcharge = 0;

  // Apply first-time buyer relief if applicable
  if (isFirstTimeBuyer && propertyPrice <= 500000) {
    bands = firstTimeBuyerBands;
  }

  // Apply 5% additional property surcharge if applicable
  if (ownsAdditionalProperty && !isReplacingMainResidence) {
    additionalRate = 5;
  }

  // Apply 2% non-UK resident surcharge if applicable
  if (isNonUKResident) {
    surcharge = 2;
  }

  let totalSDLT = 0;
  const breakdown: { rate: number; amount: number; taxablePortion: number }[] = [];
  let previousThreshold = 0;

  // Calculate SDLT based on applicable bands
  for (const band of bands) {
    if (propertyPrice <= previousThreshold) break;

    const taxablePortion = Math.min(
      propertyPrice,
      band.threshold
    ) - previousThreshold;

    if (taxablePortion > 0) {
      // If first-time buyer exceeds £500,000, revert to standard rates
      if (isFirstTimeBuyer && band.rate === null) {
        return calculateSDLT(
          propertyPrice,
          false,
          ownsAdditionalProperty,
          isNonUKResident,
          isReplacingMainResidence
        );
      }

      const baseRate = band.rate;
      const totalRate = baseRate + additionalRate + surcharge;
      const amount = (taxablePortion * totalRate) / 100;

      totalSDLT += amount;
      breakdown.push({ rate: totalRate, amount, taxablePortion });

      previousThreshold = band.threshold;
    }
  }

  return {
    totalSDLT: Math.round(totalSDLT),
    breakdown,
  };
}

// Format number as currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [showCopyNotification, setShowCopyNotification] = useState(false)
  
  // Calculator visibility state
  const [showStampDutyCalculator, setShowStampDutyCalculator] = useState(false)
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false)
  
  // SDLT calculation state
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false)
  const [ownsAdditionalProperty, setOwnsAdditionalProperty] = useState(false)
  const [isNonUKResident, setIsNonUKResident] = useState(false)
  const [isReplacingMainResidence, setIsReplacingMainResidence] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [sdltResult, setSdltResult] = useState<SDLTResult>({ totalSDLT: 0, breakdown: [] })
  const [effectiveRate, setEffectiveRate] = useState('0.00')
  
  // Mortgage calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(25)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

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

  // Fetch property data
  useEffect(() => {
    async function fetchProperty() {
      setLoading(true)
      try {
        const response = await fetch(`/api/properties/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch property details')
        }
        const data = await response.json()
        
        // Generate signed URLs for property images
        if (data.property && data.property.images && data.property.images.length > 0) {
          const signedImageUrls = await generateSignedUrlsForPropertyImages(data.property.images);
          data.property.images = signedImageUrls;
        }
        
        setProperty(data.property)
        
      } catch (err) {
        console.error('Error fetching property:', err)
        setError('There was an error loading the property details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  // Update additional property state based on first-time buyer selection
  useEffect(() => {
    if (isFirstTimeBuyer) {
      setOwnsAdditionalProperty(false)
    }
  }, [isFirstTimeBuyer])

  // Update replacing main residence state based on additional property selection
  useEffect(() => {
    if (!ownsAdditionalProperty) {
      setIsReplacingMainResidence(false)
    }
  }, [ownsAdditionalProperty])

  // Calculate SDLT whenever relevant inputs change
  useEffect(() => {
    if (property) {
      const result = calculateSDLT(
        property.price, 
        isFirstTimeBuyer, 
        ownsAdditionalProperty, 
        isNonUKResident, 
        isReplacingMainResidence
      )
      setSdltResult(result)
      setEffectiveRate(((result.totalSDLT / property.price) * 100).toFixed(2))
    }
  }, [property, isFirstTimeBuyer, ownsAdditionalProperty, isNonUKResident, isReplacingMainResidence])

  // Calculate mortgage payment when inputs change
  useEffect(() => {
    if (property) {
      // Calculate down payment amount
      const downPaymentAmount = (property.price * downPaymentPercent) / 100;
      const loanAmount = property.price - downPaymentAmount;
      
      // Calculate monthly interest rate
      const monthlyInterestRate = interestRate / 100 / 12;
      
      // Calculate total number of payments
      const totalPayments = loanTerm * 12;
      
      // Calculate monthly payment using mortgage formula
      if (monthlyInterestRate === 0) {
        // If interest rate is 0, simple division
        setMonthlyPayment(loanAmount / totalPayments);
      } else {
        const payment = 
          (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
          (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        setMonthlyPayment(payment);
      }
    }
  }, [property, downPaymentPercent, interestRate, loanTerm]);

  // Copy to clipboard function
  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setShowCopyNotification(true)
      setTimeout(() => setShowCopyNotification(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  // Add a function to scroll thumbnail into view
  const scrollThumbnailIntoView = (index: number) => {
    const element = document.getElementById(`thumbnail-${index}`);
    const container = document.getElementById('thumbnail-container');
    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top;
      const containerHeight = containerRect.height;
      const elementHeight = elementRect.height;
      
      // Calculate the scroll position to center the element
      const scrollTop = container.scrollTop + relativeTop - (containerHeight / 2) + (elementHeight / 2);
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Update the arrow button click handlers
  const handlePreviousImage = () => {
    if (!property) return;
    const newIndex = activeImage === 0 ? property.images.length - 1 : activeImage - 1;
    setActiveImage(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const handleNextImage = () => {
    if (!property) return;
    const newIndex = activeImage === property.images.length - 1 ? 0 : activeImage + 1;
    setActiveImage(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-white to-[#1A2A44]/5 pt-24 flex items-center justify-center">
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
            Loading...
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Property</h2>
            <p className="text-gray-600 mb-6">{error || 'Property not found'}</p>
            <Link href="/properties">
              <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Properties
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-[#1A2A44]/5 pt-24 pb-16">
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed top-24 right-4 z-50 bg-[#1A2A44] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>Link copied to clipboard!</span>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-[#1A2A44]/70">
            <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-[#D4AF37]">{property.title}</span>
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A44]">
                {property.title}
              </h1>
              <div className="flex items-center mt-2 text-[#1A2A44]/70">
                <MapPin size={18} className="text-[#D4AF37] mr-1" />
                <span>{property.location.area}, {property.location.city}</span>
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold text-[#1A2A44]">
                {formatPrice(property.price)}
              </span>
              <Badge className={property.status === 'available' ? 'bg-[#D4AF37]/20 text-[#D4AF37] ml-2' : 'bg-[#1A2A44]/20 text-[#1A2A44] ml-2'}>
                {property.status === 'available' ? 'Available' : 'Pending'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3 relative rounded-xl overflow-hidden shadow-lg group">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px]"
            >
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePreviousImage}
                  className="p-3 rounded-full bg-white/90 hover:bg-white text-[#1A2A44] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-3 rounded-full bg-white/90 hover:bg-white text-[#1A2A44] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {activeImage + 1} / {property.images.length}
              </div>
            </motion.div>

            {/* Share Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleShare}
                className="bg-white/90 hover:bg-white text-[#1A2A44] border-[#D4AF37]/20 hover:border-[#D4AF37]"
              >
                <Share2 className="w-4 h-4 mr-1 text-[#D4AF37]" />
                Share
              </Button>
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div id="thumbnail-container" className="h-[500px] overflow-y-auto pr-2">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveImage(index);
                    scrollThumbnailIntoView(index);
                  }}
                  id={`thumbnail-${index}`}
                  className={`relative aspect-[2/1] rounded-lg overflow-hidden group ${
                    activeImage === index ? 'ring-2 ring-[#D4AF37]' : 'hover:ring-2 hover:ring-[#D4AF37]/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    activeImage === index ? 'opacity-0' : 'group-hover:opacity-0'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6 mb-18">
          {/* Features */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
            <h2 className="text-xl font-bold mb-4 text-[#1A2A44] text-center">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center">
                <Bed className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Bedrooms</h3>
                <p className="text-[#D4AF37] font-semibold mb-2">{property.features.bedrooms} Bedrooms</p>
                <p className="text-sm text-[#1A2A44]/70">Spacious and well-lit bedrooms</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center">
                <Bath className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Bathrooms</h3>
                <p className="text-[#D4AF37] font-semibold mb-2">{property.features.bathrooms} Bathrooms</p>
                <p className="text-sm text-[#1A2A44]/70">Modern and luxurious bathrooms</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center">
                <Move className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Square Footage</h3>
                <p className="text-[#D4AF37] font-semibold mb-2">{property.features.squareFootage} sq ft</p>
                <p className="text-sm text-[#1A2A44]/70">Generous living space</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center">
                <Home className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Property Type</h3>
                <p className="text-[#D4AF37] font-semibold mb-2">{property.features.propertyType.charAt(0).toUpperCase() + property.features.propertyType.slice(1)}</p>
                <p className="text-sm text-[#1A2A44]/70">Premium residential property</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center">
                <Calendar className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-[#1A2A44] mb-1">Year Built</h3>
                <p className="text-[#D4AF37] font-semibold mb-2">{property.features.yearBuilt}</p>
                <p className="text-sm text-[#1A2A44]/70">Quality construction</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
            <h2 className="text-xl font-bold mb-4 text-[#1A2A44]">Description</h2>
            <p className="text-[#1A2A44]/80 whitespace-pre-line">
              {property.description}
            </p>
          </Card>

          {/* Amenities Section */}
          <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <span className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 inline-block">
                  Property Spotlight
                </span>
                <h2 className="text-4xl font-bold text-[#1A2A44] mb-4">Amenities</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover what makes this property special
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* Property specific amenities */}
                {property.amenities.map((amenity, index) => {
                  const details = amenityDetails[amenity as keyof typeof amenityDetails];
                  if (!details) return null;
                  
                  const IconComponent = details.icon;
                  return (
                    <motion.div
                      key={amenity}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.05) }}
                      viewport={{ once: true, margin: "50px" }}
                      className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/10 flex flex-col items-center text-center"
                    >
                      <IconComponent className="w-10 h-10 text-[#D4AF37] mb-4" />
                      <h3 className="text-lg font-bold text-[#1A2A44] mb-1">{details.title}</h3>
                      <p className="text-sm text-[#1A2A44]/70">{details.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stamp Duty Calculator */}
            <div className="h-fit">
              <Card className={`p-6 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20 transition-all duration-300 ${
                showStampDutyCalculator ? 'bg-white/80' : 'bg-white/40'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center text-[#1A2A44]">
                    <Calculator className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Stamp Duty Calculator
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#D4AF37]/20 text-[#D4AF37]">
                      After April 2025
                    </Badge>
                    <button
                      onClick={() => setShowStampDutyCalculator(!showStampDutyCalculator)}
                      className="ml-2 p-2 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all duration-300 group"
                    >
                      <svg
                        className={`w-5 h-5 text-[#D4AF37] transform transition-transform duration-300 ${
                          showStampDutyCalculator ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {showStampDutyCalculator && (
                  <div className="mt-4">
                    {/* Buyer options */}
                    <div className="space-y-3 mb-6">
                      <div className="space-y-1.5">
                        <label className="flex items-center text-sm font-medium cursor-pointer text-[#1A2A44]">
                          <input
                            type="checkbox"
                            checked={isFirstTimeBuyer}
                            onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                            className="mr-2 h-4 w-4 rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          First-time buyer
                        </label>
                        
                        <label className="flex items-center text-sm font-medium cursor-pointer text-[#1A2A44]">
                          <input
                            type="checkbox"
                            checked={ownsAdditionalProperty}
                            onChange={(e) => setOwnsAdditionalProperty(e.target.checked)}
                            disabled={isFirstTimeBuyer}
                            className={`mr-2 h-4 w-4 rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37] ${isFirstTimeBuyer ? 'opacity-50 cursor-not-allowed' : ''}`}
                          />
                          Already own property
                        </label>
                        
                        {ownsAdditionalProperty && (
                          <label className="flex items-center text-sm font-medium ml-6 cursor-pointer text-[#1A2A44]">
                            <input
                              type="checkbox"
                              checked={isReplacingMainResidence}
                              onChange={(e) => setIsReplacingMainResidence(e.target.checked)}
                              className="mr-2 h-4 w-4 rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37]"
                            />
                            Replacing main residence
                          </label>
                        )}
                        
                        <label className="flex items-center text-sm font-medium cursor-pointer text-[#1A2A44]">
                          <input
                            type="checkbox"
                            checked={isNonUKResident}
                            onChange={(e) => setIsNonUKResident(e.target.checked)}
                            className="mr-2 h-4 w-4 rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          Non-UK resident
                        </label>
                      </div>
                    </div>
                    
                    {/* Calculation results summary */}
                    <div className="bg-[#1A2A44]/5 p-4 rounded-lg mb-4 border border-[#D4AF37]/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#1A2A44]/70">Property price:</span>
                        <span className="font-semibold text-[#1A2A44]">{formatPrice(property.price)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#1A2A44]/70">Stamp duty:</span>
                        <span className="font-semibold text-[#D4AF37]">{formatCurrency(sdltResult.totalSDLT)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#1A2A44]/70">Effective rate:</span>
                        <span className="font-semibold text-[#1A2A44]">{effectiveRate}%</span>
                      </div>
                    </div>
                    
                    {/* Breakdown toggle */}
                    <div className="mb-4">
                      <button 
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="text-sm font-medium text-[#D4AF37] hover:text-[#D4AF37]/80 flex items-center"
                      >
                        {showBreakdown ? 'Hide breakdown' : 'Show breakdown'} 
                        <svg 
                          className={`ml-1 h-4 w-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Breakdown details */}
                    {showBreakdown && (
                      <div className="bg-[#1A2A44]/5 p-4 rounded-lg mb-4 text-sm space-y-3 border border-[#D4AF37]/10">
                        <h3 className="font-semibold text-[#1A2A44]">Calculation Breakdown</h3>
                        
                        <div className="space-y-2">
                          {sdltResult.breakdown.map((band, i) => (
                            <div key={i} className="grid grid-cols-3 gap-2">
                              <div>
                                <span className="text-[#1A2A44]/70">Portion: </span>
                                <span className="text-[#1A2A44]">{formatCurrency(band.taxablePortion)}</span>
                              </div>
                              <div>
                                <span className="text-[#1A2A44]/70">Rate: </span>
                                <span className="text-[#1A2A44]">{band.rate}%</span>
                              </div>
                              <div>
                                <span className="text-[#1A2A44]/70">Tax: </span>
                                <span className="font-medium text-[#D4AF37]">{formatCurrency(band.amount)}</span>
                              </div>
                            </div>
                          ))}
                          <div className="border-t border-[#D4AF37]/20 pt-2 flex justify-between font-medium text-[#1A2A44]">
                            <span>Total stamp duty:</span>
                            <span className="text-[#D4AF37]">{formatCurrency(sdltResult.totalSDLT)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Standard rate tables */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-[#1A2A44]">Stamp Duty Rates (from April 2025)</h3>
                      <div className="text-sm text-[#1A2A44]/70 space-y-1">
                        {isFirstTimeBuyer ? (
                          <>
                            <p className="flex justify-between">
                              <span>£0 - £300,000:</span>
                              <span>0%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>£300,001 - £500,000:</span>
                              <span>5%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Above £500,000:</span>
                              <span>Standard rates apply</span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="flex justify-between">
                              <span>£0 - £125,000:</span>
                              <span>0%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>£125,001 - £250,000:</span>
                              <span>2%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>£250,001 - £925,000:</span>
                              <span>5%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>£925,001 - £1,500,000:</span>
                              <span>10%</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Above £1,500,000:</span>
                              <span>12%</span>
                            </p>
                          </>
                        )}
                        
                        {(ownsAdditionalProperty && !isReplacingMainResidence) && (
                          <div className="mt-2 pt-2 border-t border-[#D4AF37]/20">
                            <p className="font-medium text-[#D4AF37]">Additional property: +5%</p>
                          </div>
                        )}
                        
                        {isNonUKResident && (
                          <div className="mt-2 pt-2 border-t border-[#D4AF37]/20">
                            <p className="font-medium text-[#D4AF37]">Non-UK resident: +2%</p>
                          </div>
                        )}
                      </div>
                    </div>
                      
                    <div className="mt-4 bg-[#1A2A44]/5 border border-[#D4AF37]/20 rounded-lg p-3 text-sm text-[#1A2A44] flex items-start">
                      <Info className="h-5 w-5 mr-2 flex-shrink-0 text-[#D4AF37]" />
                      <p>Stamp duty rates shown are for purchases after April 1, 2025. These rates are subject to change based on government policy.</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            
            {/* Mortgage Calculator */}
            <div className="h-fit">
              <Card className={`p-6 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20 transition-all duration-300 ${
                showMortgageCalculator ? 'bg-white/80' : 'bg-white/40'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center text-[#1A2A44]">
                    <Calculator className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Mortgage Calculator
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#1A2A44]/20 text-[#1A2A44]">
                      Estimate Only
                    </Badge>
                    <button
                      onClick={() => setShowMortgageCalculator(!showMortgageCalculator)}
                      className="ml-2 p-2 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all duration-300 group"
                    >
                      <svg
                        className={`w-5 h-5 text-[#D4AF37] transform transition-transform duration-300 ${
                          showMortgageCalculator ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {showMortgageCalculator && (
                  <div className="mt-4">
                    <div className="space-y-4 mb-6">
                      {/* Down Payment Slider */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-[#1A2A44]">Down Payment</label>
                          <span className="text-sm font-medium text-[#D4AF37]">
                            {downPaymentPercent}% ({formatCurrency((property.price * downPaymentPercent) / 100)})
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="50"
                          step="5"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                          className="w-full h-2 bg-[#1A2A44]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-xs text-[#1A2A44]/50 mt-1">
                          <span>5%</span>
                          <span>50%</span>
                        </div>
                      </div>
                      
                      {/* Interest Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-[#1A2A44]">Interest Rate</label>
                          <span className="text-sm font-medium text-[#D4AF37]">{interestRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="10"
                          step="0.25"
                          value={interestRate}
                          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                          className="w-full h-2 bg-[#1A2A44]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-xs text-[#1A2A44]/50 mt-1">
                          <span>0.5%</span>
                          <span>10%</span>
                        </div>
                      </div>
                      
                      {/* Loan Term */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-[#1A2A44]">Loan Term</label>
                          <span className="text-sm font-medium text-[#D4AF37]">{loanTerm} years</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="35"
                          step="5"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                          className="w-full h-2 bg-[#1A2A44]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-xs text-[#1A2A44]/50 mt-1">
                          <span>5 yrs</span>
                          <span>35 yrs</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Results */}
                    <div className="bg-[#1A2A44]/5 rounded-lg p-6 text-center border border-[#D4AF37]/10">
                      <div className="text-[#1A2A44]/70 mb-2">Estimated Monthly Payment</div>
                      <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                        {new Intl.NumberFormat('en-GB', {
                          style: 'currency',
                          currency: 'GBP',
                          maximumFractionDigits: 0
                        }).format(monthlyPayment)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        <div className="text-left">
                          <div className="text-[#1A2A44]/70">Loan Amount</div>
                          <div className="font-medium text-[#1A2A44]">
                            {formatCurrency(property.price - (property.price * downPaymentPercent / 100))}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-[#1A2A44]/70">Total Interest</div>
                          <div className="font-medium text-[#1A2A44]">
                            {formatCurrency((monthlyPayment * loanTerm * 12) - (property.price - (property.price * downPaymentPercent / 100)))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-[#1A2A44]/5 border border-[#D4AF37]/20 rounded-lg p-3 text-sm text-[#1A2A44] flex items-start">
                      <Info className="h-5 w-5 mr-2 flex-shrink-0 text-[#D4AF37]" />
                      <p>This calculator provides an estimate only. Actual mortgage rates and terms may vary. Please consult with a financial advisor before making a decision.</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* Location */}
        <PropertyMap 
          area={property.location.area} 
          city={property.location.city} 
          address={property.location.address}
          title="Location"
        />
      </div>
    </div>
  )
} 