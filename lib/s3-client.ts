import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Validate required environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID;
const CLOUDFLARE_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_SECRET_ACCESS_KEY) {
  console.error('Missing required Cloudflare R2 environment variables');
}

// Initialize the S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY_ID || '',
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY || '',
  },
});

// Bucket name for Cloudflare R2
const BUCKET_NAME = 'ilkevim';

/**
 * Uploads a file to Cloudflare R2 and returns the URL
 * @param file The file to upload
 * @param key The key (path) in the bucket
 * @returns The URL of the uploaded file
 */
export async function uploadFileToR2(file: File, key: string): Promise<string> {
  try {
    // Validate environment variables
    if (!CLOUDFLARE_ACCOUNT_ID) {
      throw new Error('CLOUDFLARE_ACCOUNT_ID environment variable is not set');
    }
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Create the command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: uint8Array,
      ACL: 'public-read',
      ContentType: file.type,
    });

    // Upload the file
    await s3Client.send(command);

    // Return the URL
    return `${key}`;
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    throw error;
  }
}

/**
 * Generates a presigned URL for uploading a file directly from the client
 * @param key The key (path) in the bucket
 * @param contentType The content type of the file
 * @param expiresIn The number of seconds until the URL expires (default: 3600)
 * @returns The presigned URL
 */
export async function getPresignedUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}

/**
 * Generates a unique key for a file based on timestamp and original filename
 * @param file The file to generate a key for
 * @param directory The directory to store the file in (e.g., 'properties', 'events')
 * @returns A unique key for the file
 */
export function generateUniqueKey(file: File, directory: string = 'properties'): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  return `${directory}/${timestamp}-${randomString}.${extension}`;
}

/**
 * Generates signed URLs for a list of image keys
 * @param imageKeys List of image keys to generate signed URLs for
 * @param expiresIn The number of seconds until the URLs expire (default: 3600)
 * @returns A list of objects with the key and signed URL
 */
export async function getSignedUrlsForImages(
  imageKeys: string[],
  expiresIn: number = 3600
): Promise<{ key: string; url: string }[]> {
  try {
    console.log(`Generating signed URLs for ${imageKeys.length} images...`);
    
    // Generate signed URLs for each image key
    const imagesWithUrls = await Promise.all(
      imageKeys.map(async (key) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        });
        
        const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
          expiresIn, // URL valid for the specified time
        });
        
        return { key, url: signedUrl };
      })
    );
    
    console.log(`Successfully generated ${imagesWithUrls.length} signed URLs.`);
    return imagesWithUrls;
  } catch (error) {
    console.error('Error generating signed URLs for images:', error);
    throw error;
  }
} 