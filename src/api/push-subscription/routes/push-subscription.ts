/**
 * push-subscription router
 * Custom routes for push notification subscriptions
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::push-subscription.push-subscription', {
  config: {
    find: {
      auth: false, // Allow public access
    },
    findOne: {
      auth: false,
    },
    create: {
      auth: false, // Allow public access for subscriptions
    },
    update: {
      auth: false,
    },
    delete: {
      auth: false, // Allow public access for unsubscribing
    },
  },
});

