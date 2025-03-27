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
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Info,
  Calculator
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-teal-500 rounded-full border-t-transparent"></div>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="hover:text-teal-600">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-teal-600">{property.title}</span>
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {property.title}
              </h1>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin size={18} className="text-teal-600 mr-1" />
                <span>{property.location.area}, {property.location.city}</span>
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {formatPrice(property.price)}
              </span>
              <Badge className={property.status === 'available' ? 'bg-green-500 ml-2' : 'bg-amber-500 ml-2'}>
                {property.status === 'available' ? 'Available' : 'Pending'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 hover:bg-white text-gray-700"
              >
                <Heart className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 hover:bg-white text-gray-700"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {property.images.slice(0, 3).map((image, index) => (
              <div 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  activeImage === index ? 'border-teal-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-32 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          {/* Features */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50">
            <h2 className="text-xl font-bold mb-4">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Bed size={24} className="text-teal-600 mb-2" />
                <span className="text-lg font-semibold">{property.features.bedrooms}</span>
                <span className="text-sm text-gray-500">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Bath size={24} className="text-teal-600 mb-2" />
                <span className="text-lg font-semibold">{property.features.bathrooms}</span>
                <span className="text-sm text-gray-500">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Move size={24} className="text-teal-600 mb-2" />
                <span className="text-lg font-semibold">{property.features.squareFootage}</span>
                <span className="text-sm text-gray-500">Sq Ft</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Home size={24} className="text-teal-600 mb-2" />
                <span className="text-lg font-semibold">{property.features.propertyType.charAt(0).toUpperCase() + property.features.propertyType.slice(1)}</span>
                <span className="text-sm text-gray-500">Type</span>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {property.description}
            </p>
          </Card>

          {/* Amenities */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check size={18} className="text-teal-600 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stamp Duty Calculator */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-teal-600" />
                  Stamp Duty Calculator
                </h2>
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                  After April 2025
                </Badge>
              </div>
              
              {/* Buyer options */}
              <div className="space-y-3 mb-6">
                <div className="space-y-1.5">
                  <label className="flex items-center text-sm font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFirstTimeBuyer}
                      onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    First-time buyer
                  </label>
                  
                  <label className="flex items-center text-sm font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ownsAdditionalProperty}
                      onChange={(e) => setOwnsAdditionalProperty(e.target.checked)}
                      disabled={isFirstTimeBuyer}
                      className={`mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 ${isFirstTimeBuyer ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    Already own property
                  </label>
                  
                  {ownsAdditionalProperty && (
                    <label className="flex items-center text-sm font-medium ml-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isReplacingMainResidence}
                        onChange={(e) => setIsReplacingMainResidence(e.target.checked)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      Replacing main residence
                    </label>
                  )}
                  
                  <label className="flex items-center text-sm font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNonUKResident}
                      onChange={(e) => setIsNonUKResident(e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    Non-UK resident
                  </label>
                </div>
              </div>
              
              {/* Calculation results summary */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Property price:</span>
                  <span className="font-semibold">{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Stamp duty:</span>
                  <span className="font-semibold text-teal-700">{formatCurrency(sdltResult.totalSDLT)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Effective rate:</span>
                  <span className="font-semibold">{effectiveRate}%</span>
                </div>
              </div>
              
              {/* Breakdown toggle */}
              <div className="mb-4">
                <button 
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center"
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
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm space-y-3">
                  <h3 className="font-semibold text-gray-700">Calculation Breakdown</h3>
                  
                  <div className="space-y-2">
                    {sdltResult.breakdown.map((band, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-gray-500">Portion: </span>
                          <span>{formatCurrency(band.taxablePortion)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Rate: </span>
                          <span>{band.rate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tax: </span>
                          <span className="font-medium">{formatCurrency(band.amount)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total stamp duty:</span>
                      <span>{formatCurrency(sdltResult.totalSDLT)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Standard rate tables */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-gray-700">Stamp Duty Rates (from April 2025)</h3>
                <div className="text-sm text-gray-600 space-y-1">
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
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="font-medium text-amber-700">Additional property: +5%</p>
                    </div>
                  )}
                  
                  {isNonUKResident && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="font-medium text-amber-700">Non-UK resident: +2%</p>
                    </div>
                  )}
                </div>
              </div>
                
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700 flex items-start">
                <Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
                <p>Stamp duty rates shown are for purchases after April 1, 2025. These rates are subject to change based on government policy.</p>
              </div>
            </Card>
            
            {/* Mortgage Calculator */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-teal-600" />
                  Mortgage Calculator
                </h2>
                <Badge className="bg-blue-100 text-blue-800">
                  Estimate Only
                </Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Down Payment Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Down Payment</label>
                    <span className="text-sm font-medium text-teal-600">
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                </div>
                
                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                    <span className="text-sm font-medium text-teal-600">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                {/* Loan Term */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Loan Term</label>
                    <span className="text-sm font-medium text-teal-600">{loanTerm} years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="5"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 yrs</span>
                    <span>35 yrs</span>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-6 text-center">
                <div className="text-gray-600 mb-2">Estimated Monthly Payment</div>
                <div className="text-3xl font-bold text-teal-700 mb-2">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                    maximumFractionDigits: 0
                  }).format(monthlyPayment)}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="text-left">
                    <div className="text-gray-500">Loan Amount</div>
                    <div className="font-medium">
                      {formatCurrency(property.price - (property.price * downPaymentPercent / 100))}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-500">Total Interest</div>
                    <div className="font-medium">
                      {formatCurrency((monthlyPayment * loanTerm * 12) - (property.price - (property.price * downPaymentPercent / 100)))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700 flex items-start">
                <Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
                <p>This calculator provides an estimate only. Actual mortgage rates and terms may vary. Please consult with a financial advisor before making a decision.</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Location */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-teal-100/50 mt-6">
          <h2 className="text-xl font-bold mb-4">Location</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API}&q=${encodeURIComponent(
                `${property.location.area}, ${property.location.city}`
              )}`}
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </Card>
      </div>
    </div>
  )
} 