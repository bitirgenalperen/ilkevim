import { ObjectId } from "mongodb"

export interface Property {
  _id?: ObjectId
  title: string
  description: string
  price: number
  location: {
    city: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  features: {
    bedrooms: number
    bathrooms: number
    squareFootage: number
    propertyType: string
  }
  images: string[]
  status: 'available' | 'sold' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: ObjectId
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Enquiry {
  _id?: ObjectId
  propertyId: ObjectId
  userId: ObjectId
  message: string
  status: 'pending' | 'responded' | 'closed'
  createdAt: Date
  updatedAt: Date
} 