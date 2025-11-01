/**
 * rwa controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::rwa.rwa', {
  /**
   * Override find method to populate media by default and sort by order
   */
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    // Populate media fields if not already populated
    const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
    const shouldPopulatePhoto = !populateFields.photo;

    if (shouldPopulatePhoto && Array.isArray(data)) {
      const populatedData = await Promise.all(
        data.map(async (item: unknown) => {
          if (item && typeof item === 'object' && 'id' in item) {
            const rwa = item as { id: number };
            const { id } = rwa;

            // Fetch with populated media
            const populated = await strapi.entityService.findOne('api::rwa.rwa', id, {
              populate: {
                photo: {
                  populate: '*',
                },
              },
            });

            return populated || item;
          }
          return item;
        })
      );

      // Sort by order if not already sorted
      const sortedData = populatedData.sort((a: unknown, b: unknown) => {
        if (
          a &&
          typeof a === 'object' &&
          'order' in a &&
          b &&
          typeof b === 'object' &&
          'order' in b
        ) {
          const aOrder = typeof a.order === 'number' ? a.order : 0;
          const bOrder = typeof b.order === 'number' ? b.order : 0;
          return aOrder - bOrder;
        }
        return 0;
      });

      return { data: sortedData, meta };
    }

    // Sort by order if not already sorted
    if (Array.isArray(data)) {
      const sortedData = data.sort((a: unknown, b: unknown) => {
        if (
          a &&
          typeof a === 'object' &&
          'order' in a &&
          b &&
          typeof b === 'object' &&
          'order' in b
        ) {
          const aOrder = typeof a.order === 'number' ? a.order : 0;
          const bOrder = typeof b.order === 'number' ? b.order : 0;
          return aOrder - bOrder;
        }
        return 0;
      });

      return { data: sortedData, meta };
    }

    return { data, meta };
  },

  /**
   * Override findOne method to populate media by default
   */
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);

    if (data && typeof data === 'object' && 'id' in data) {
      const rwa = data as { id: number };

      // Populate media fields if not already populated
      const populateFields = (ctx.query?.populate || {}) as Record<string, unknown>;
      const shouldPopulatePhoto = !populateFields.photo;

      if (shouldPopulatePhoto) {
        const populated = await strapi.entityService.findOne('api::rwa.rwa', rwa.id, {
          populate: {
            photo: {
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

