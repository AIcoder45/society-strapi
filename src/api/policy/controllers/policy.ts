/**
 * policy controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::policy.policy', {
  /**
   * Override find method to populate media by default
   */
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    // Populate media fields if not already populated
    const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
    const shouldPopulateFile = !populateFields.file;

    if (shouldPopulateFile && Array.isArray(data)) {
      const populatedData = await Promise.all(
        data.map(async (item: unknown) => {
          if (item && typeof item === 'object' && 'id' in item) {
            const policy = item as { id: number };
            const { id } = policy;

            // Fetch with populated media
            const populated = await strapi.entityService.findOne('api::policy.policy', id, {
              populate: {
                file: {
                  populate: '*',
                },
              },
            });

            return populated || item;
          }
          return item;
        })
      );

      return { data: populatedData, meta };
    }

    return { data, meta };
  },

  /**
   * Override findOne method to populate media by default
   */
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);

    if (data && typeof data === 'object' && 'id' in data) {
      const policy = data as { id: number };

      // Populate media fields if not already populated
      const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
      const shouldPopulateFile = !populateFields.file;

      if (shouldPopulateFile) {
        const populated = await strapi.entityService.findOne('api::policy.policy', policy.id, {
          populate: {
            file: {
              populate: '*',
            },
          },
        });

        return { data: populated || data, meta };
      }
    }

    return { data, meta };
  },
});

