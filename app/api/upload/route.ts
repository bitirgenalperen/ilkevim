import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToR2, generateUniqueKey } from '@/lib/s3-client';

// Validate required environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID;
const CLOUDFLARE_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY;

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          details: 'Cloudflare R2 credentials are not properly configured'
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const directory = formData.get('directory') as string || 'properties';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate a unique key for the file with the specified directory
    const key = generateUniqueKey(file, directory);
    
    // Upload the file to R2
    const url = await uploadFileToR2(file, key);
    
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}


// Increase the body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}; 