import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'

export async function GET() {
  try {
    const dbService = new DatabaseService()
    const cities = await dbService.getCities()
    
    // Sort cities alphabetically
    cities.sort()
    
    console.log(`API - Found ${cities.length} unique cities:`, cities)
    
    return NextResponse.json({ cities })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
} 