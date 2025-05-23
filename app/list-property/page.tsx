'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Home,
  Building2,
  Hotel,
  Castle,
  Upload,
  Trash2,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { commonAmenities } from '@/data/properties'

// Property type options
const propertyTypes = [
  { value: 'apartment', label: 'Apartment', icon: Building2 },
  { value: 'house', label: 'House', icon: Home },
  { value: 'penthouse', label: 'Penthouse', icon: Hotel },
  { value: 'villa', label: 'Villa', icon: Castle },
]

// UK Cities for dropdown
const ukCities = [
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Edinburgh',
  'Glasgow',
  'Bristol',
  'Leeds',
  'Sheffield',
  'Newcastle',
  'Cardiff',
  'Belfast'
]

type FormData = {
  title: string;
  description: string;
  description_tr: string;
  price: string;
  location: {
    city: string;
    area: string;
    address: string;
  };
  features: {
    bedrooms: string;
    bathrooms: string;
    squareFootage: string;
    propertyType: string;
    yearBuilt: string;
  };
  listingType: 'standard' | 'featured';
  status: 'available' | 'pending' | 'sold';
  stayType: 'buy' | 'rent';
}

export default function ListPropertyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('details')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [uploadErrors, setUploadErrors] = useState<{[key: string]: string}>({})
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    description_tr: '',
    price: '',
    location: {
      city: '',
      area: '',
      address: '',
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      propertyType: '',
      yearBuilt: new Date().getFullYear().toString(),
    },
    listingType: 'standard',
    status: 'available',
    stayType: 'buy',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [
        keyof Pick<FormData, 'location' | 'features'>,
        string
      ];
  
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      } as FormData));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [
        keyof Pick<FormData, 'location' | 'features'>,
        string
      ];
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      } as FormData));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newFiles = Array.from(files)
    setImageFiles(prev => [...prev, ...newFiles])
    
    // Create preview URLs
    const newUrls = newFiles.map(file => URL.createObjectURL(file))
    setImageUrls(prev => [...prev, ...newUrls])
  }

  const removeImage = (index: number) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imageUrls[index])
    
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImageUrls(prev => prev.filter((_, i) => i !== index))
    
    // Clear any upload progress or errors for this image
    const newProgress = { ...uploadProgress }
    const newErrors = { ...uploadErrors }
    delete newProgress[index.toString()]
    delete newErrors[index.toString()]
    setUploadProgress(newProgress)
    setUploadErrors(newErrors)
  }

  const uploadImage = async (file: File, index: number) => {
    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      
      // Update progress to indicate upload started
      setUploadProgress(prev => ({ ...prev, [index]: 10 }))
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Failed to upload image')
      }
      
      const data = await response.json()
      
      // Update progress to indicate upload complete
      setUploadProgress(prev => ({ ...prev, [index]: 100 }))
      
      // Clear any errors
      setUploadErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[index]
        return newErrors
      })
      
      return data.url
    } catch (error) {
      console.error(`Error uploading image ${index}:`, error)
      
      // Set error message
      setUploadErrors(prev => ({
        ...prev,
        [index]: error instanceof Error ? error.message : 'Failed to upload image'
      }))
      
      // Reset progress
      setUploadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[index]
        return newProgress
      })
      
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (imageUrls.length === 0) {
      alert('Please upload at least one image of the property')
      return
    }
    
    if (imageFiles.length === 0) {
      alert('There occurred an error while uploading images')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Upload all images to R2
      const uploadPromises = imageFiles.map((file, index) => uploadImage(file, index))
      const uploadedUrls = await Promise.all(uploadPromises)
      
      // Filter out any failed uploads
      const successfulUrls = uploadedUrls.filter(url => url !== null) as string[]
      
      if (successfulUrls.length === 0) {
        throw new Error('Failed to upload any images')
      }
      
      const propertyData = {
        ...formData,
        amenities: selectedAmenities,
        images: successfulUrls,
        price: parseInt(formData.price),
        features: {
          ...formData.features,
          bedrooms: parseInt(formData.features.bedrooms),
          bathrooms: parseInt(formData.features.bathrooms),
          squareFootage: parseInt(formData.features.squareFootage),
          yearBuilt: parseInt(formData.features.yearBuilt),
        },
        stayType: formData.stayType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // Submit to API
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create property listing')
      }
      
      setSubmitSuccess(true)
      
      // Redirect after a delay
      setTimeout(() => {
        router.push('/properties')
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting property:', error)
      alert('There was an error creating your listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A2A44]/5 via-white to-[#1A2A44]/5 pt-24 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center border-[#D4AF37]/20">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#1A2A44]">Property Listed Successfully!</h1>
          <p className="text-[#1A2A44]/80 mb-6">
            Your property has been successfully listed and is now available for viewing.
          </p>
          <Button
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
            onClick={() => router.push('/properties')}
          >
            View All Properties
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A2A44]/5 via-white to-[#1A2A44]/5 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37] ring-1 ring-inset ring-[#D4AF37]/20">
              List Your Property
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1A2A44] to-[#1A2A44]/80 bg-clip-text text-transparent">
            List Your Property
          </h1>
          <p className="text-[#1A2A44]/80 max-w-2xl mx-auto">
            Complete the form below to list your property. Provide detailed information to attract potential buyers or renters.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg border border-[#D4AF37]/20">
          <Tabs 
            defaultValue="details" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 p-0 h-auto bg-[#1A2A44]/5">
              <TabsTrigger 
                value="details" 
                className={`py-3 ${activeTab === 'details' ? 'bg-white text-[#D4AF37]' : 'text-[#1A2A44]/80 hover:text-[#D4AF37]'}`}
              >
                Property Details
              </TabsTrigger>
              <TabsTrigger 
                value="features" 
                className={`py-3 ${activeTab === 'features' ? 'bg-white text-[#D4AF37]' : 'text-[#1A2A44]/80 hover:text-[#D4AF37]'}`}
              >
                Features & Amenities
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className={`py-3 ${activeTab === 'images' ? 'bg-white text-[#D4AF37]' : 'text-[#1A2A44]/80 hover:text-[#D4AF37]'}`}
              >
                Images
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="details" className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Luxury 3-Bedroom Apartment in Central London"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the property in detail..."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description_tr">Description - Turkish</Label>
                    <Textarea
                      id="description_tr"
                      name="description_tr"
                      placeholder="Mülkü detaylı bir şekilde açıklayın..."
                      value={formData.description_tr}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={5}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="stayType">Available For</Label>
                    <div className="flex mt-1">
                      <Button
                        type="button"
                        variant={formData.stayType === 'buy' ? 'default' : 'outline'}
                        className={cn(
                          "flex-1 rounded-r-none",
                          formData.stayType === 'buy'
                            ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]"
                            : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                        )}
                        onClick={() => setFormData({ ...formData, stayType: 'buy' })}
                      >
                        Buy
                      </Button>
                      <Button
                        type="button"
                        variant={formData.stayType === 'rent' ? 'default' : 'outline'}
                        className={cn(
                          "flex-1 rounded-l-none",
                          formData.stayType === 'rent'
                            ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-[#D4AF37]"
                            : "border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]"
                        )}
                        onClick={() => setFormData({ ...formData, stayType: 'rent' })}
                      >
                        Rent
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price (£)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="e.g. 350000"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Location</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                      <div>
                        <Label htmlFor="location.city" className="text-sm">City</Label>
                        <Select
                          value={formData.location.city}
                          onValueChange={(value) => handleSelectChange('location.city', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {ukCities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="location.area" className="text-sm">Area</Label>
                        <Input
                          id="location.area"
                          name="location.area"
                          placeholder="e.g. Kensington"
                          value={formData.location.area}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="location.address" className="text-sm">Full Address</Label>
                        <Input
                          id="location.address"
                          name="location.address"
                          placeholder="Full address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      onClick={() => setActiveTab('features')}
                    >
                      Next: Features & Amenities
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="features.bedrooms">Bedrooms</Label>
                      <Input
                        id="features.bedrooms"
                        name="features.bedrooms"
                        type="number"
                        min="0"
                        placeholder="Number of bedrooms"
                        value={formData.features.bedrooms}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="features.bathrooms">Bathrooms</Label>
                      <Input
                        id="features.bathrooms"
                        name="features.bathrooms"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="Number of bathrooms"
                        value={formData.features.bathrooms}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="features.squareFootage">Square Footage</Label>
                      <Input
                        id="features.squareFootage"
                        name="features.squareFootage"
                        type="number"
                        min="0"
                        placeholder="Size in square feet"
                        value={formData.features.squareFootage}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="features.yearBuilt">Year Built</Label>
                      <Input
                        id="features.yearBuilt"
                        name="features.yearBuilt"
                        type="number"
                        min="1800"
                        max={new Date().getFullYear()}
                        placeholder="Year of construction"
                        value={formData.features.yearBuilt}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="features.propertyType">Property Type</Label>
                      <Select
                        value={formData.features.propertyType}
                        onValueChange={(value) => handleSelectChange('features.propertyType', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <type.icon className="mr-2 h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="listingType">Listing Type</Label>
                      <Select
                        value={formData.listingType}
                        onValueChange={(value) => handleSelectChange('listingType', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Amenities</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {commonAmenities.map((amenity) => (
                        <div 
                          key={amenity}
                          className={`
                            p-3 rounded-lg border cursor-pointer transition-colors
                            ${selectedAmenities.includes(amenity) 
                              ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                              : 'bg-white border-[#D4AF37]/20 text-[#1A2A44] hover:bg-[#1A2A44]/5 hover:border-[#D4AF37]'}
                          `}
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={selectedAmenities.includes(amenity)}
                              onChange={() => {}} // Handled by parent div click
                            />
                            {amenity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#1A2A44]"
                      onClick={() => setActiveTab('details')}
                    >
                      Back: Property Details
                    </Button>
                    <Button
                      type="button"
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      onClick={() => setActiveTab('images')}
                    >
                      Next: Images
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images" className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Property Images</Label>
                    <div className="border-2 border-dashed border-[#D4AF37]/20 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="h-12 w-12 text-[#D4AF37] mb-2" />
                        <p className="text-sm text-[#1A2A44]/80 mb-1">
                          Drag and drop images or click to browse
                        </p>
                        <p className="text-xs text-[#1A2A44]/60">
                          (Recommended: upload at least 5 high-quality images)
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  {imageUrls.length > 0 && (
                    <div>
                      <Label className="mb-3 block">Preview</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                          <div 
                            key={index} 
                            className={`relative group ${
                              index === 0 
                                ? 'ring-2 ring-green-500' 
                                : index <= 2 
                                  ? 'ring-2 ring-orange-500' 
                                  : 'ring-2 ring-red-500'
                            } rounded-lg overflow-hidden`}
                          >
                            <img
                              src={url}
                              alt={`Property preview ${index + 1}`}
                              className="h-32 w-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                              {index === 0 
                                ? 'Main Image' 
                                : index <= 2 
                                  ? 'Secondary Image' 
                                  : 'Additional Image'}
                            </div>
                            <button
                              type="button"
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            
                            {/* Upload Progress Indicator */}
                            {uploadProgress[index] !== undefined && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-[#D4AF37] h-1.5 rounded-full" 
                                    style={{ width: `${uploadProgress[index]}%` }}
                                  ></div>
                                </div>
                                <div className="text-center mt-1">
                                  {uploadProgress[index] === 100 ? 'Uploaded' : 'Uploading...'}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 text-[#1A2A44]"
                      onClick={() => setActiveTab('features')}
                    >
                      Back: Features & Amenities
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'List Property'
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </Card>
      </div>
    </div>
  )
} 