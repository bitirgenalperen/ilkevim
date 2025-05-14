import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'

const db = new DatabaseService()

type Props = {
  params: {
    id: string
  }
}

export async function GET(
  request: Request,
  props: Props
) {
  try {
    const event = await db.getEvent(props.params.id)
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
} 