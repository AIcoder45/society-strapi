/**
 * Custom routes for push-subscription
 * Additional endpoints beyond standard REST API
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/push-subscriptions/public-key',
      handler: 'push-subscription.getPublicKey',
      config: {
        auth: false, // Public access - needed for frontend
        policies: [],
        middlewares: [],
      },
    },
  ],
};

