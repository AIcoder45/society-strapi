/**
 * Get Strapi API URL dynamically
 * Uses environment variable or detects from current hostname
 * @returns Strapi API base URL
 */
export function getStrapiUrl(): string {
  // Check for environment variable first (most reliable)
  if (typeof window !== 'undefined') {
    // Client-side: use NEXT_PUBLIC_ prefix or detect from current hostname
    const envUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;
    if (envUrl) return envUrl;
    
    // Auto-detect from current hostname (same origin)
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = hostname === 'localhost' ? ':1337' : '';
    return `${protocol}//${hostname}${port}`;
  } else {
    // Server-side: use STRAPI_URL
    return process.env.STRAPI_URL || 'http://localhost:1337';
  }
}

/**
 * Get Strapi API endpoint URL
 * @param endpoint - API endpoint path (e.g., '/api/news')
 * @returns Full API URL
 */
export function getStrapiApiUrl(endpoint: string): string {
  const baseUrl = getStrapiUrl();
  // Remove leading slash from endpoint if present (we'll add it)
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

