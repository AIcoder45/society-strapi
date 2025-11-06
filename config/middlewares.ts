export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://*.onrender.com',
            'https://*.railway.app',
            'https://*.vercel.app',
            'https://*.netlify.app',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https:',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        process.env.FRONTEND_URL,
        process.env.NEXT_PUBLIC_FRONTEND_URL,
        /\.onrender\.com$/,
        /\.railway\.app$/,
        /\.vercel\.app$/,
        /\.netlify\.app$/,
      ].filter(Boolean),
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
