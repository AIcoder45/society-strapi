/**
 * Image compression utility
 * Compresses images to reduce file size to approximately 10% of original
 */

import sharp from 'sharp';
import type { Core } from '@strapi/strapi';

/**
 * Compresses an image file using sharp
 * Target: Reduce file size to approximately 10% of original
 * @param fileBuffer - The file buffer
 * @param mimeType - The MIME type of the file
 * @returns Compressed image buffer
 */
export async function compressImage(
  fileBuffer: Buffer,
  mimeType: string,
  strapi: Core.Strapi
): Promise<Buffer> {
  try {
    let sharpInstance = sharp(fileBuffer);

    // Get image metadata
    const metadata = await sharpInstance.metadata();
    const originalSize = fileBuffer.length;

    // Configure compression based on image type
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      sharpInstance = sharpInstance.jpeg({
        quality: 10, // Very low quality to achieve ~10% file size
        progressive: true,
        mozjpeg: true,
      });
    } else if (mimeType.includes('png')) {
      sharpInstance = sharpInstance.png({
        quality: 10, // Low quality
        compressionLevel: 9, // Maximum compression
        adaptiveFiltering: true,
      });
    } else if (mimeType.includes('webp')) {
      sharpInstance = sharpInstance.webp({
        quality: 10, // Very low quality
        effort: 6, // Higher effort for better compression
      });
    } else if (mimeType.includes('gif')) {
      // GIFs are harder to compress, resize instead
      if (metadata.width && metadata.height) {
        sharpInstance = sharpInstance.resize({
          width: Math.floor(metadata.width * 0.8),
          height: Math.floor(metadata.height * 0.8),
          fit: 'inside',
        });
      }
    }

    // Resize if image is too large (helps with compression)
    if (metadata.width && metadata.width > 2000) {
      sharpInstance = sharpInstance.resize({
        width: 2000,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const compressedBuffer = await sharpInstance.toBuffer();
    const compressedSize = compressedBuffer.length;
    const compressionRatio = originalSize > 0 ? (compressedSize / originalSize) * 100 : 0;

    strapi.log.info(
      `Image compressed: ${(originalSize / 1024).toFixed(2)} KB → ${(compressedSize / 1024).toFixed(2)} KB (${compressionRatio.toFixed(2)}% of original)`
    );

    return compressedBuffer;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    strapi.log.error(`Error compressing image: ${errorMessage}`);
    // Return original file if compression fails
    return fileBuffer;
  }
}

