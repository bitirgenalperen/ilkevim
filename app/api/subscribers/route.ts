import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const subscriberData = await request.json()
    
    // Validate required fields
    if (!subscriberData.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    if (!subscriberData.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(subscriberData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    const dbService = new DatabaseService()
    
    try {
      const result = await dbService.createSubscriber(subscriberData)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Subscribed successfully',
        subscriberId: result.insertedId 
      }, { status: 201 })
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already subscribed') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
      throw error
    }
    
  } catch (error) {
    console.error('Error creating subscriber:', error)
    return NextResponse.json(
      { error: 'Failed to create subscriber' },
      { status: 500 }
    )
  }
} 