/**
 * homepage controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', {
  /**
   * Override find method to handle single type retrieval
   * Single types return data directly (not in an array)
   * Includes proper error handling and logging
   */
  async find(ctx) {
    try {
      const result = await super.find(ctx);

      // Handle case where super.find() returns null (content doesn't exist)
      if (!result) {
        strapi.log.warn('Homepage data not found - ensure homepage content is created and published');
        return { data: null, meta: {} };
      }

      const { data, meta } = result;

      // Single type returns data directly, not in an array
      if (!data) {
        strapi.log.warn('Homepage data not found - ensure homepage content is created and published');
        return { data: null, meta: meta || {} };
      }

      strapi.log.debug('Homepage data fetched successfully');
      return { data, meta };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      strapi.log.error('Error fetching homepage data:', errorMessage);
      ctx.throw(500, `Failed to fetch homepage data: ${errorMessage}`);
    }
  },
});

