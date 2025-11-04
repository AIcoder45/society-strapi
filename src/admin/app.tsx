import type { StrapiApp } from '@strapi/strapi/admin';

/**
 * Admin extension for Greenwood City Strapi
 */
export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    console.log('Greenwood City Strapi admin extension loaded');
  },
};

