import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import { ObjectId } from 'mongodb'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid property ID' },
        { status: 400 }
      )
    }

    const dbService = new DatabaseService()
    const property = await dbService.getProperty(id)

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Error fetching property details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch property details' },
      { status: 500 }
    )
  }
} 