/**
 * push-subscription controller
 * Handles push notification subscriptions
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::push-subscription.push-subscription', {
  /**
   * Subscribe to push notifications
   * POST /api/push/subscribe
   */
  async subscribe(ctx) {
    try {
      const { endpoint, keys, device, userAgent } = ctx.request.body?.data || ctx.request.body || {};

      if (!endpoint || !keys) {
        return ctx.badRequest('Missing required fields: endpoint and keys');
      }

      // Check if subscription already exists
      const existing = await strapi.entityService.findMany(
        'api::push-subscription.push-subscription',
        {
          filters: { endpoint },
        }
      );

      if (existing && existing.length > 0) {
        // Update existing subscription
        const updated = await strapi.entityService.update(
          'api::push-subscription.push-subscription',
          existing[0].id,
          {
            data: {
              keys,
              device: device || null,
              userAgent: userAgent || ctx.request.headers['user-agent'] || null,
            },
          }
        );

        strapi.log.info(`Push subscription updated: ${endpoint.substring(0, 50)}...`);
        return { data: updated };
      }

      // Create new subscription
      const created = await strapi.entityService.create(
        'api::push-subscription.push-subscription',
        {
          data: {
            endpoint,
            keys,
            device: device || null,
            userAgent: userAgent || ctx.request.headers['user-agent'] || null,
          },
        }
      );

      strapi.log.info(`New push subscription created: ${endpoint.substring(0, 50)}...`);
      return { data: created };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      strapi.log.error(`Error creating push subscription: ${errorMessage}`);
      return ctx.badRequest(`Failed to create subscription: ${errorMessage}`);
    }
  },

  /**
   * Unsubscribe from push notifications
   * DELETE /api/push/unsubscribe
   */
  async unsubscribe(ctx) {
    try {
      const { endpoint } = ctx.request.body?.data || ctx.request.body || {};
      const { id } = ctx.params;

      // If endpoint provided, find by endpoint
      if (endpoint) {
        const existing = await strapi.entityService.findMany(
          'api::push-subscription.push-subscription',
          {
            filters: { endpoint },
          }
        );

        if (existing && existing.length > 0) {
          await strapi.entityService.delete('api::push-subscription.push-subscription', existing[0].id);
          strapi.log.info(`Push subscription deleted by endpoint: ${endpoint.substring(0, 50)}...`);
          return { data: { success: true } };
        }

        return ctx.notFound('Subscription not found');
      }

      // If ID provided, delete by ID
      if (id) {
        await strapi.entityService.delete('api::push-subscription.push-subscription', id);
        strapi.log.info(`Push subscription deleted: ${id}`);
        return { data: { success: true } };
      }

      return ctx.badRequest('Missing required field: endpoint or id');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      strapi.log.error(`Error deleting push subscription: ${errorMessage}`);
      return ctx.badRequest(`Failed to delete subscription: ${errorMessage}`);
    }
  },

  /**
   * Get VAPID public key for frontend
   * GET /api/push/public-key
   */
  async getPublicKey(ctx) {
    try {
      const publicKey = process.env.VAPID_PUBLIC_KEY;

      if (!publicKey) {
        strapi.log.warn('VAPID_PUBLIC_KEY not configured');
        return ctx.badRequest('VAPID public key not configured');
      }

      return { data: { publicKey } };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      strapi.log.error(`Error getting public key: ${errorMessage}`);
      return ctx.badRequest(`Failed to get public key: ${errorMessage}`);
    }
  },

  // Keep original create and delete methods for standard REST API
  async create(ctx) {
    const { endpoint, keys, device, userAgent } = ctx.request.body?.data || ctx.request.body || {};

    if (!endpoint || !keys) {
      return ctx.badRequest('Missing required fields: endpoint and keys');
    }

    // Check if subscription already exists
    const existing = await strapi.entityService.findMany(
      'api::push-subscription.push-subscription',
      {
        filters: { endpoint },
      }
    );

    if (existing && existing.length > 0) {
      // Update existing subscription
      const updated = await strapi.entityService.update(
        'api::push-subscription.push-subscription',
        existing[0].id,
        {
          data: {
            keys,
            device: device || null,
            userAgent: userAgent || ctx.request.headers['user-agent'] || null,
          },
        }
      );

      strapi.log.info(`Push subscription updated: ${endpoint.substring(0, 50)}...`);
      return { data: updated };
    }

    // Create new subscription
    const created = await strapi.entityService.create(
      'api::push-subscription.push-subscription',
      {
        data: {
          endpoint,
          keys,
          device: device || null,
          userAgent: userAgent || ctx.request.headers['user-agent'] || null,
        },
      }
    );

    strapi.log.info(`New push subscription created: ${endpoint.substring(0, 50)}...`);
    return { data: created };
  },

  async delete(ctx) {
    const { endpoint } = ctx.request.body?.data || ctx.request.body || {};
    const { id } = ctx.params;

    // If endpoint provided, find by endpoint
    if (endpoint) {
      const existing = await strapi.entityService.findMany(
        'api::push-subscription.push-subscription',
        {
          filters: { endpoint },
        }
      );

      if (existing && existing.length > 0) {
        await strapi.entityService.delete('api::push-subscription.push-subscription', existing[0].id);
        strapi.log.info(`Push subscription deleted by endpoint: ${endpoint.substring(0, 50)}...`);
        return { data: { success: true } };
      }

      return ctx.notFound('Subscription not found');
    }

    // If ID provided, delete by ID
    if (id) {
      await strapi.entityService.delete('api::push-subscription.push-subscription', id);
      strapi.log.info(`Push subscription deleted: ${id}`);
      return { data: { success: true } };
    }

    return ctx.badRequest('Missing required field: endpoint or id');
  },
});

