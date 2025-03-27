require('dotenv').config()
const { MongoClient } = require('mongodb')

async function testConnection() {
  console.log('Testing database connection...')
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing')
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    console.log('✅ Successfully connected to MongoDB!')
    
    const db = client.db(process.env.MONGODB_DB || 'ilkevim')
    const properties = await db.collection('properties').find({}).toArray()
    console.log(`📊 Found ${properties.length} properties in the database`)
    
    await client.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  }
}

testConnection() 