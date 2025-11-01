/**
 * advertisement controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::advertisement.advertisement', {
  /**
   * Override find method to populate media by default
   */
  async find(ctx) {
    const result = await super.find(ctx);

    if (!result) {
      return result;
    }

    const { data, meta } = result;

    // Populate media fields if not already populated
    const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
    const shouldPopulateImage = !populateFields.image;

    if (shouldPopulateImage && Array.isArray(data)) {
      const populatedData = await Promise.all(
        data.map(async (item: unknown) => {
          if (item && typeof item === 'object' && 'id' in item) {
            const advertisement = item as { id: number };
            const { id } = advertisement;

            // Fetch with populated media
            const populated = await strapi.entityService.findOne(
              'api::advertisement.advertisement',
              id,
              {
                populate: {
                  image: {
                    populate: '*',
                  },
                },
              }
            );

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
    const result = await super.findOne(ctx);

    if (!result) {
      return result;
    }

    const { data, meta } = result;

    if (data && typeof data === 'object' && 'id' in data) {
      const advertisement = data as { id: number };

      // Populate media fields if not already populated
      const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
      const shouldPopulateImage = !populateFields.image;

      if (shouldPopulateImage) {
        const populated = await strapi.entityService.findOne(
          'api::advertisement.advertisement',
          advertisement.id,
          {
            populate: {
              image: {
                populate: '*',
              },
            },
          }
        );

        return { data: populated || data, meta };
      }
    }

    return { data, meta };
  },
});

