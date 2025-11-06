/**
 * Image compression configuration
 * Configure image compression quality and settings
 */

export default {
  /**
   * Image compression quality (0-100)
   * Higher values = better quality but larger file size
   * Default: 50 (balanced quality and file size)
   */
  quality: parseInt(process.env.IMAGE_COMPRESSION_QUALITY || '50', 10),

  /**
   * Maximum image width in pixels
   * Images larger than this will be resized
   * Set to null to disable resizing
   */
  maxWidth: parseInt(process.env.IMAGE_MAX_WIDTH || '2000', 10),

  /**
   * PNG compression level (0-9)
   * Higher values = better compression but slower processing
   */
  pngCompressionLevel: parseInt(process.env.PNG_COMPRESSION_LEVEL || '9', 10),

  /**
   * WebP effort level (0-6)
   * Higher values = better compression but slower processing
   */
  webpEffort: parseInt(process.env.WEBP_EFFORT || '6', 10),

  /**
   * Enable progressive JPEG encoding
   * Progressive JPEGs load faster but may be slightly larger
   */
  progressive: process.env.PROGRESSIVE_JPEG !== 'false',

  /**
   * Enable MozJPEG optimization
   * Better compression for JPEG images
   */
  mozjpeg: process.env.MOZJPEG !== 'false',

  /**
   * GIF resize factor (0-1)
   * GIFs will be resized to this percentage of original size
   * 0.8 = 80% of original size
   */
  gifResizeFactor: parseFloat(process.env.GIF_RESIZE_FACTOR || '0.8'),
};

