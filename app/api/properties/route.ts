import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import { Property } from '@/types/database'
import { Filter } from 'mongodb'

type MongoQuery<T> = {
  [K in keyof T]?: T[K] | { $regex?: string; $options?: string; $gte?: number; $lte?: number; $all?: string[] };
} & {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
};

interface PropertyQuery extends Omit<MongoQuery<Property>, '_id' | 'createdAt' | 'updatedAt'> {
  'features.propertyType'?: string;
  'location.city'?: string;
  'features.bedrooms'?: number;
  'features.bathrooms'?: number;
  'features.squareFootage'?: {
    $gte?: number;
    $lte?: number;
  };
  amenities?: string[] | { $all: string[] };
  listingType?: 'standard' | 'featured';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query: Filter<Property> = {}

    // Listing type filter
    const listingType = searchParams.get('listingType')
    if (listingType) {
      query.listingType = listingType as 'standard' | 'featured'
    }

    // Search term filter
    const searchTerm = searchParams.get('searchTerm')
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
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
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) })
      }
    }

    // Bedrooms filter
    const bedrooms = searchParams.get('bedrooms')
    if (bedrooms) {
      query['features.bedrooms'] = Number(bedrooms)
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