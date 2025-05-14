import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'

export async function GET() {
  try {
    const dbService = new DatabaseService()
    
    // Delete past events
    await dbService.deletePastEvents()
    
    // Fetch remaining events
    const events = await dbService.getEvents()
    
    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const eventData = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'description_tr', 'date', 'time', 'location', 'type', 'capacity', 'category', 'image']
    
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const dbService = new DatabaseService()
    const result = await dbService.createEvent(eventData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Event created successfully',
      eventId: result.insertedId 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
} 