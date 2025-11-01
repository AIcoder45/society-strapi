/**
 * event controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', {
  /**
   * Override find method to populate media by default
   */
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    // Populate media fields if not already populated
    const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
    const shouldPopulateImages = !populateFields.coverImage && !populateFields.gallery;

    if (shouldPopulateImages && Array.isArray(data)) {
      const populatedData = await Promise.all(
        data.map(async (item: unknown) => {
          if (item && typeof item === 'object' && 'id' in item) {
            const event = item as { id: number; attributes: Record<string, unknown> };
            const { id } = event;

            // Fetch with populated media
            const populated = await strapi.entityService.findOne('api::event.event', id, {
              populate: {
                coverImage: {
                  populate: '*',
                },
                gallery: {
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
      const event = data as { id: number };
      
      // Populate media fields if not already populated
      const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
      const shouldPopulateImages = !populateFields.coverImage && !populateFields.gallery;

      if (shouldPopulateImages) {
        const populated = await strapi.entityService.findOne('api::event.event', event.id, {
          populate: {
            coverImage: {
              populate: '*',
            },
            gallery: {
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

