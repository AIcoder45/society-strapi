/**
 * Get Strapi API URL dynamically
 * Uses environment variable or defaults to localhost
 * @returns Strapi API base URL
 */
export function getStrapiUrl(): string {
  // Server-side: use STRAPI_URL environment variable or default to localhost
  return process.env.STRAPI_URL || 'http://localhost:1337';
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

