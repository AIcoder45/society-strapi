/**
 * Image compression utility
 * Compresses images based on configurable quality settings
 */

import sharp from 'sharp';
import type { Core } from '@strapi/strapi';
import compressionConfig from '../../config/image-compression';

/**
 * Compresses an image file using sharp
 * Uses configurable quality settings from config/image-compression.ts
 * @param fileBuffer - The file buffer
 * @param mimeType - The MIME type of the file
 * @param strapi - Strapi instance
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

    // Resize if image is too large (do this first to avoid double resize)
    const shouldResize = metadata.width && metadata.width > compressionConfig.maxWidth;
    if (shouldResize) {
      sharpInstance = sharpInstance.resize({
        width: compressionConfig.maxWidth,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Configure compression based on image type
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      sharpInstance = sharpInstance.jpeg({
        quality: compressionConfig.quality,
        progressive: compressionConfig.progressive,
        mozjpeg: compressionConfig.mozjpeg,
      });
    } else if (mimeType.includes('png')) {
      sharpInstance = sharpInstance.png({
        quality: compressionConfig.quality,
        compressionLevel: compressionConfig.pngCompressionLevel,
        adaptiveFiltering: true,
      });
    } else if (mimeType.includes('webp')) {
      sharpInstance = sharpInstance.webp({
        quality: compressionConfig.quality,
        effort: compressionConfig.webpEffort,
      });
    } else if (mimeType.includes('gif')) {
      // GIFs: resize once if needed (avoid double resize)
      if (metadata.width && metadata.height && !shouldResize) {
        sharpInstance = sharpInstance.resize({
          width: Math.floor(metadata.width * compressionConfig.gifResizeFactor),
          height: Math.floor(metadata.height * compressionConfig.gifResizeFactor),
          fit: 'inside',
        });
      }
    }

    const compressedBuffer = await sharpInstance.toBuffer();
    const compressedSize = compressedBuffer.length;
    const compressionRatio = originalSize > 0 ? (compressedSize / originalSize) * 100 : 0;

    strapi.log.info(
      `Image compressed: ${(originalSize / 1024).toFixed(2)} KB → ${(compressedSize / 1024).toFixed(2)} KB (${compressionRatio.toFixed(2)}% of original, quality: ${compressionConfig.quality})`
    );

    return compressedBuffer;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    strapi.log.error(`Error compressing image: ${errorMessage}`);
    // Return original file if compression fails
    return fileBuffer;
  }
}

