/**
 * service-provider controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::service-provider.service-provider', {
  async find(ctx) {
    try {
      // Default sorting: order ASC, then name ASC
      const { sort } = ctx.query;
      
      if (!sort || !Array.isArray(sort) || sort.length === 0) {
        ctx.query.sort = ['order:asc', 'name:asc'];
      }

      const result = await super.find(ctx);
      
      strapi.log.debug('Service providers fetched successfully');
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      strapi.log.error('Error fetching service providers:', errorMessage);
      ctx.throw(500, `Failed to fetch service providers: ${errorMessage}`);
    }
  },
});

