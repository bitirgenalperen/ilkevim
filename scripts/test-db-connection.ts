import { DatabaseService } from '../lib/db'

async function testConnection() {
  console.log('Testing database connection...')
  
  try {
    const dbService = new DatabaseService()
    await dbService.connect()
    console.log('✅ Successfully connected to MongoDB!')
    
    // Test a simple query
    const properties = await dbService.getProperties()
    console.log(`📊 Found ${properties.length} properties in the database`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

testConnection() 