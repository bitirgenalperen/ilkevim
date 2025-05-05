import { MongoClient, Db, ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import { Property, User, Enquiry, Subscriber } from '@/types/database'

interface PropertyQuery {
  listingType?: string;
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
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
}

export class DatabaseService {
  private client: MongoClient | null = null
  private db: Db | null = null

  async connect() {
    if (!this.client) {
      this.client = await clientPromise
      this.db = this.client.db(process.env.MONGODB_DB || 'ilkevim')
    }
    if (!this.db) throw new Error('Database connection failed')
    return this.db
  }

  // Properties
  async getProperties(query: PropertyQuery = {}, limit?: number) {
    const db = await this.connect()
    let find = db.collection<Property>('properties').find(query)
    if (limit) {
      find = find.limit(limit)
    }
    return find.toArray()
  }

  async getCities() {
    const db = await this.connect()
    const cities = await db.collection<Property>('properties').distinct('location.city')
    console.log(`DB Service - Found ${cities.length} unique cities:`, cities)
    return cities
  }

  async getProperty(id: string) {
    const db = await this.connect()
    return db.collection<Property>('properties').findOne({ _id: new ObjectId(id) })
  }

  async createProperty(property: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>) {
    const db = await this.connect()
    const now = new Date()
    const propertyWithDates = {
      ...property,
      createdAt: now,
      updatedAt: now
    }
    const result = await db.collection<Property>('properties').insertOne(propertyWithDates)
    return result
  }

  async updateProperty(id: string, update: Partial<Property>) {
    const db = await this.connect()
    const result = await db.collection<Property>('properties').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...update,
          updatedAt: new Date()
        }
      }
    )
    return result
  }

  // Users
  async getUser(email: string) {
    const db = await this.connect()
    return db.collection<User>('users').findOne({ email })
  }

  async createUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
    const db = await this.connect()
    const now = new Date()
    const userWithDates = {
      ...user,
      createdAt: now,
      updatedAt: now
    }
    const result = await db.collection<User>('users').insertOne(userWithDates)
    return result
  }

  // Enquiries
  async createEnquiry(enquiry: Omit<Enquiry, '_id' | 'createdAt' | 'updatedAt'>) {
    const db = await this.connect()
    const now = new Date()
    const enquiryWithDates = {
      ...enquiry,
      status: 'pending' as const,
      createdAt: now,
      updatedAt: now
    }
    const result = await db.collection<Enquiry>('enquiries').insertOne(enquiryWithDates)
    return result
  }

  async getEnquiriesByUser(userId: string) {
    const db = await this.connect()
    return db.collection<Enquiry>('enquiries')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()
  }

  async getEnquiriesByProperty(propertyId: string) {
    const db = await this.connect()
    return db.collection<Enquiry>('enquiries')
      .find({ propertyId: new ObjectId(propertyId) })
      .sort({ createdAt: -1 })
      .toArray()
  }

  async updateEnquiryStatus(id: string, status: Enquiry['status']) {
    const db = await this.connect()
    const result = await db.collection<Enquiry>('enquiries').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          status,
          updatedAt: new Date()
        }
      }
    )
    return result
  }

  // Subscribers
  async createSubscriber(subscriber: Omit<Subscriber, '_id' | 'createdAt' | 'updatedAt'>) {
    const db = await this.connect()
    
    // Check if email already exists
    const existingSubscriber = await db.collection<Subscriber>('subscribers').findOne({ 
      email: subscriber.email 
    })
    
    if (existingSubscriber) {
      throw new Error('Email already subscribed')
    }
    
    const now = new Date()
    const subscriberWithDates = {
      ...subscriber,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await db.collection<Subscriber>('subscribers').insertOne(subscriberWithDates)
    return result
  }
} 