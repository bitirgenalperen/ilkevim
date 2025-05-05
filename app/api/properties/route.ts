import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'

interface PropertyQuery {
  listingType?: string;
  $or?: Array<{
    [key: string]: any;
  }>;
  'features.propertyType'?: string;
  'location.city'?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  'features.bedrooms'?: {
    $gte?: number;
    $lte?: number;
  };
  'features.bathrooms'?: {
    $gte?: number;
    $lte?: number;
  };
  'features.squareFootage'?: {
    $gte?: number;
    $lte?: number;
  };
  amenities?: { $all: string[] };
  stayType?: string | { $exists: boolean };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Initialize MongoDB query
    const query: PropertyQuery = {}

    // Stay type filter
    const stayType = searchParams.get('stayType')
    if (stayType === 'rent') {
      // When "Rent" is selected, only show properties with stayType "rent"
      query.stayType = 'rent'
    } else if (stayType === 'buy') {
      // When "Buy" is selected, show properties with stayType "buy" OR no stayType field
      query.$or = [
        { stayType: 'buy' },
        { stayType: { $exists: false } }
      ]
    }

    // Listing type filter
    const listingType = searchParams.get('listingType')
    if (listingType) {
      query.listingType = listingType
    }

    // Text search filter
    const searchTerm = searchParams.get('searchTerm')
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { 'location.area': { $regex: searchTerm, $options: 'i' } }
      ]
    }

    // Property type filter
    const propertyType = searchParams.get('propertyType')
    if (propertyType) {
      query['features.propertyType'] = propertyType
    }

    // City filter
    const city = searchParams.get('city')
    if (city) {
      query['location.city'] = city
    }

    // Price range filter
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseInt(minPrice)
      if (maxPrice) query.price.$lte = parseInt(maxPrice)
    }

    // Bedrooms range filter
    const minBedrooms = searchParams.get('minBedrooms')
    const maxBedrooms = searchParams.get('maxBedrooms')
    if (minBedrooms || maxBedrooms) {
      query['features.bedrooms'] = {}
      if (minBedrooms) query['features.bedrooms'].$gte = parseInt(minBedrooms)
      if (maxBedrooms) query['features.bedrooms'].$lte = parseInt(maxBedrooms)
    }

    // Bathrooms range filter
    const minBathrooms = searchParams.get('minBathrooms')
    const maxBathrooms = searchParams.get('maxBathrooms')
    if (minBathrooms || maxBathrooms) {
      query['features.bathrooms'] = {}
      if (minBathrooms) query['features.bathrooms'].$gte = parseInt(minBathrooms)
      if (maxBathrooms) query['features.bathrooms'].$lte = parseInt(maxBathrooms)
    }

    // Square footage range filter
    const minSquareFootage = searchParams.get('minSquareFootage')
    const maxSquareFootage = searchParams.get('maxSquareFootage')
    if (minSquareFootage || maxSquareFootage) {
      query['features.squareFootage'] = {}
      if (minSquareFootage) query['features.squareFootage'].$gte = parseInt(minSquareFootage)
      if (maxSquareFootage) query['features.squareFootage'].$lte = parseInt(maxSquareFootage)
    }

    // Amenities filter
    const amenities = searchParams.get('amenities')?.split(',').filter(Boolean)
    if (amenities?.length) {
      query.amenities = { $all: amenities }
    }

    // Get query options
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    console.log('MongoDB Query:', JSON.stringify(query, null, 2))
    console.log('Limit:', limit)

    const dbService = new DatabaseService()
    const properties = await dbService.getProperties(query, limit)

    console.log(`Found ${properties.length} properties matching the filters`)

    return NextResponse.json({ properties })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const propertyData = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'price', 'location', 'features', 'images', 'amenities']
    
    for (const field of requiredFields) {
      if (!propertyData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Additional validation for nested fields
    if (!propertyData.location.city || !propertyData.location.area || !propertyData.location.address) {
      return NextResponse.json(
        { error: 'Missing required location details' },
        { status: 400 }
      )
    }
    
    if (!propertyData.features.bedrooms || !propertyData.features.bathrooms || 
        !propertyData.features.squareFootage || !propertyData.features.propertyType) {
      return NextResponse.json(
        { error: 'Missing required property features' },
        { status: 400 }
      )
    }
    
    if (!Array.isArray(propertyData.images) || propertyData.images.length === 0) {
      return NextResponse.json(
        { error: 'At least one property image is required' },
        { status: 400 }
      )
    }
    
    const dbService = new DatabaseService()
    const result = await dbService.createProperty(propertyData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Property created successfully',
      propertyId: result.insertedId 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
} 