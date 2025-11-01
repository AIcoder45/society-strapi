/**
 * gallery controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery.gallery', {
  /**
   * Override find method to populate media by default
   */
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    // Populate media fields if not already populated
    const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
    const shouldPopulateImages = !populateFields.images;

    if (shouldPopulateImages && Array.isArray(data)) {
      const populatedData = await Promise.all(
        data.map(async (item: unknown) => {
          if (item && typeof item === 'object' && 'id' in item) {
            const gallery = item as { id: number };
            const { id } = gallery;

            // Fetch with populated media
            const populated = await strapi.entityService.findOne('api::gallery.gallery', id, {
              populate: {
                images: {
                  populate: '*',
                },
                event: true,
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
      const gallery = data as { id: number };

      // Populate media fields if not already populated
      const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
      const shouldPopulateImages = !populateFields.images;

      if (shouldPopulateImages) {
        const populated = await strapi.entityService.findOne('api::gallery.gallery', gallery.id, {
          populate: {
            images: {
              populate: '*',
            },
            event: true,
          },
        });

        return { data: populated || data, meta };
      }
    }

    return { data, meta };
  },
});

