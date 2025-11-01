import type { Core } from '@strapi/strapi';

/**
 * Dummy content categories to seed
 */
const DUMMY_CATEGORIES = [
  {
    name: 'General News',
    description: 'General news and updates for the community',
    color: '#3B82F6',
  },
  {
    name: 'Community Events',
    description: 'Community events and gatherings',
    color: '#10B981',
  },
  {
    name: 'City Council',
    description: 'City council meetings and decisions',
    color: '#8B5CF6',
  },
  {
    name: 'Public Safety',
    description: 'Public safety announcements and alerts',
    color: '#EF4444',
  },
  {
    name: 'Infrastructure',
    description: 'Infrastructure projects and updates',
    color: '#F59E0B',
  },
  {
    name: 'Housing',
    description: 'Housing policies and information',
    color: '#06B6D4',
  },
  {
    name: 'Health & Wellness',
    description: 'Health and wellness resources',
    color: '#EC4899',
  },
  {
    name: 'Education',
    description: 'Education programs and resources',
    color: '#6366F1',
  },
  {
    name: 'Parks & Recreation',
    description: 'Parks and recreation activities',
    color: '#14B8A6',
  },
  {
    name: 'Utilities',
    description: 'Utilities and services information',
    color: '#84CC16',
  },
];

/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug string
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Dummy news articles to seed
 */
const DUMMY_NEWS = [
  {
    title: 'Greenwood City Announces New Park Development Project',
    shortDescription: 'The city council has approved funding for a new community park in the north district, featuring playgrounds, walking trails, and picnic areas.',
    content: '<p>Greenwood City is excited to announce the approval of a new community park development project. The park, located in the north district, will span over 15 acres and feature modern playground equipment, walking and jogging trails, picnic areas, and a community garden.</p><p>The project is expected to be completed within the next 18 months and will serve as a central gathering place for families and community members. Construction is scheduled to begin in the spring of next year.</p><p>"This park will be a wonderful addition to our community," said Mayor Johnson. "We are committed to providing quality recreational spaces for all residents."</p>',
    category: 'City Council',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    title: 'City Launches New Recycling Program',
    shortDescription: 'Greenwood City introduces an expanded recycling program with new pickup schedules and additional accepted materials.',
    content: '<p>Starting next month, Greenwood City will launch an expanded recycling program aimed at reducing waste and promoting environmental sustainability.</p><p>The new program includes:</p><ul><li>Weekly pickup schedules for all residential areas</li><li>Acceptance of additional materials including electronics and batteries</li><li>Free recycling bins for all residents</li><li>Educational workshops on proper recycling practices</li></ul><p>Residents can sign up for the program online or by calling the city utilities department.</p>',
    category: 'Utilities',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    title: 'Community Health Fair Scheduled for This Weekend',
    shortDescription: 'Free health screenings, wellness workshops, and fitness demonstrations at the annual community health fair.',
    content: '<p>The annual Greenwood Community Health Fair will take place this Saturday from 9 AM to 3 PM at the Community Center. The event is free and open to all residents.</p><p>Activities include:</p><ul><li>Free health screenings (blood pressure, cholesterol, glucose)</li><li>Wellness workshops and nutrition seminars</li><li>Fitness demonstrations and yoga classes</li><li>Information booths from local healthcare providers</li><li>Children\'s health activities</li></ul><p>No registration required. Walk-ins welcome!</p>',
    category: 'Health & Wellness',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    title: 'New Library Hours Announced',
    shortDescription: 'The Greenwood Public Library extends operating hours to better serve the community, now open seven days a week.',
    content: '<p>The Greenwood Public Library has announced extended operating hours to better accommodate residents\' schedules. Starting next week, the library will be open:</p><ul><li>Monday - Thursday: 9 AM - 8 PM</li><li>Friday - Saturday: 9 AM - 6 PM</li><li>Sunday: 12 PM - 5 PM</li></ul><p>Library Director Sarah Martinez stated, "We want to ensure that all community members have access to our resources and services. These extended hours will make the library more accessible to everyone."</p><p>The library also announced new digital resources and online programming available through their website.</p>',
    category: 'Education',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    title: 'Road Construction Update: Main Street Improvements',
    shortDescription: 'City provides update on Main Street road improvement project with new completion timeline and traffic updates.',
    content: '<p>The Main Street improvement project is progressing on schedule, with completion expected by the end of next month. The project includes:</p><ul><li>Resurfacing of Main Street from Highway 5 to Elm Avenue</li><li>New street lighting installation</li><li>Improved crosswalks and pedestrian safety features</li><li>Updated traffic signals</li></ul><p>Traffic will be temporarily rerouted during peak construction hours. Alternate routes are clearly marked, and the city thanks residents for their patience during this important infrastructure upgrade.</p>',
    category: 'Infrastructure',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
];

/**
 * Dummy events to seed
 */
const DUMMY_EVENTS = [
  {
    title: 'Greenwood City Summer Festival 2025',
    description: '<p>Join us for the annual Summer Festival featuring live music, local food vendors, art exhibitions, and family-friendly activities. This year\'s festival promises to be bigger and better than ever!</p><p>Highlights include:</p><ul><li>Live performances from local bands</li><li>Food trucks and local restaurant vendors</li><li>Arts and crafts market</li><li>Children\'s activity area with games and face painting</li><li>Fireworks display at dusk</li></ul><p>Free admission. All ages welcome!</p>',
    eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    location: 'Greenwood City Park, 123 Park Avenue',
  },
  {
    title: 'City Council Monthly Meeting',
    description: '<p>The Greenwood City Council will hold its monthly public meeting. Agenda items include budget discussions, community proposals, and updates on ongoing city projects.</p><p>Residents are encouraged to attend and participate in the public comment session. Meeting agenda and materials are available on the city website one week prior to the meeting.</p>',
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: 'City Hall Council Chambers, 456 Main Street',
  },
  {
    title: 'Community Farmers Market',
    description: '<p>Weekly farmers market featuring fresh produce, local artisans, baked goods, and handmade crafts. Support local vendors and enjoy the vibrant community atmosphere.</p><p>Available items:</p><ul><li>Fresh fruits and vegetables</li><li>Locally sourced meats and dairy</li><li>Homemade baked goods and preserves</li><li>Handcrafted items and artwork</li><li>Live music and entertainment</li></ul>',
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    location: 'Greenwood Community Center Parking Lot, 789 Center Drive',
  },
  {
    title: 'Greenwood Public Library Book Club Meeting',
    description: '<p>Monthly book club discussion featuring "The Greenwood Chronicles" by local author Jane Smith. Join fellow readers for engaging discussion, refreshments, and literary conversation.</p><p>Copies of the book are available at the library circulation desk. New members always welcome!</p>',
    eventDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    location: 'Greenwood Public Library, Meeting Room B, 321 Library Lane',
  },
  {
    title: 'Free Yoga in the Park',
    description: '<p>Start your weekend with free outdoor yoga classes in the park. Suitable for all levels, from beginners to advanced practitioners. Bring your own mat or use one of ours.</p><p>Instructors will guide participants through gentle stretches and poses suitable for all fitness levels. Classes are weather permitting.</p>',
    eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    location: 'Greenwood City Park, Yoga Lawn Area',
  },
  {
    title: 'Community Cleanup Day',
    description: '<p>Join your neighbors for a community-wide cleanup day. Help keep Greenwood beautiful by participating in litter collection, park maintenance, and beautification projects.</p><p>Supplies provided. Volunteers of all ages welcome. Meet at the community center at 8 AM for assignments and refreshments.</p>',
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    location: 'Greenwood Community Center, 789 Center Drive',
  },
];

/**
 * Dummy notifications to seed
 */
const DUMMY_NOTIFICATIONS: Array<{
  title: string;
  message: string;
  priority: 'normal' | 'urgent';
  expiryDate: Date;
}> = [
  {
    title: 'Water Main Maintenance Scheduled',
    message: 'Water service will be temporarily interrupted on Elm Street from 9 AM to 3 PM on November 15th for scheduled maintenance. Please store water for essential use during this time.',
    priority: 'normal' as const,
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
  },
  {
    title: 'Traffic Alert: Road Closure on Main Street',
    message: 'Main Street will be closed between 5th and 7th Avenue from November 10-12 for road improvement work. Please use alternate routes. Expect delays.',
    priority: 'urgent' as const,
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
  },
  {
    title: 'Property Tax Payment Deadline Reminder',
    message: 'Reminder: Property tax payments are due by November 30th. Payments can be made online, by mail, or in person at City Hall. Late fees apply after the deadline.',
    priority: 'normal' as const,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  {
    title: 'New Recreation Programs Registration Open',
    message: 'Registration is now open for winter recreation programs including basketball, swimming, and fitness classes. Sign up online or visit the Recreation Department. Early registration recommended.',
    priority: 'normal' as const,
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
  },
  {
    title: 'Severe Weather Advisory',
    message: 'The National Weather Service has issued a severe weather advisory for our area. Residents are advised to stay indoors, avoid unnecessary travel, and monitor weather updates. Emergency services remain available.',
    priority: 'urgent' as const,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
];

/**
 * Dummy advertisements to seed
 */
const DUMMY_ADVERTISEMENTS = [
  {
    title: 'Greenwood Medical Center - Health Checkup Special',
    description: 'Get a comprehensive health checkup for your family. Modern facilities with experienced doctors.',
    category: 'Healthcare',
    businessName: 'Greenwood Medical Center',
    contactPhone: '+1-555-0101',
    contactEmail: 'info@greenwoodmedical.com',
    website: 'https://greenwoodmedical.com',
    discount: '25% OFF',
    offer: 'Special discount on all health checkups this month. Book your appointment now!',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  {
    title: 'Tony\'s Pizza - Family Night Special',
    description: 'Delicious Italian pizzas made with fresh ingredients. Perfect for family dinners and gatherings.',
    category: 'Food & Dining',
    businessName: 'Tony\'s Pizza',
    contactPhone: '+1-555-0202',
    contactEmail: 'order@tonyspizza.com',
    website: 'https://tonyspizza.com',
    discount: '20% OFF',
    offer: 'Family Night Special - Get 20% off on all family-sized pizzas every Friday and Saturday!',
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
  },
  {
    title: 'Greenwood Auto Repair - Spring Maintenance Special',
    description: 'Professional auto repair and maintenance services. Trusted by the community for over 20 years.',
    category: 'Services',
    businessName: 'Greenwood Auto Repair',
    contactPhone: '+1-555-0303',
    contactEmail: 'service@greenwoodauto.com',
    website: 'https://greenwoodauto.com',
    discount: '15% OFF',
    offer: 'Spring maintenance special! Get 15% off on oil change and tire rotation services.',
    validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
  },
  {
    title: 'Community Fitness Center - New Member Welcome Offer',
    description: 'State-of-the-art fitness equipment, group classes, and personal training available.',
    category: 'Health & Wellness',
    businessName: 'Community Fitness Center',
    contactPhone: '+1-555-0404',
    contactEmail: 'membership@communityfitness.com',
    website: 'https://communityfitness.com',
    discount: '50% OFF',
    offer: 'New member special! Get 50% off on the first month membership. Sign up today!',
    validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
  },
  {
    title: 'Greenwood Grocery Store - Weekly Deals',
    description: 'Fresh produce, quality meats, and daily essentials at affordable prices.',
    category: 'Food & Dining',
    businessName: 'Greenwood Grocery',
    contactPhone: '+1-555-0505',
    contactEmail: 'info@greenwoodgrocery.com',
    website: 'https://greenwoodgrocery.com',
    discount: '10% OFF',
    offer: 'Weekly deals on fresh produce and groceries. Shop now and save!',
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    title: 'Sunset Cafe - Breakfast Special',
    description: 'Start your day right with our delicious breakfast menu. Fresh pastries and premium coffee.',
    category: 'Food & Dining',
    businessName: 'Sunset Cafe',
    contactPhone: '+1-555-0606',
    contactEmail: 'hello@sunsetcafe.com',
    website: 'https://sunsetcafe.com',
    discount: 'Buy 1 Get 1',
    offer: 'Breakfast special! Buy one breakfast combo, get the second one free. Valid until 10 AM.',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    title: 'Greenwood Home Cleaning Services',
    description: 'Professional home cleaning services. Residential and commercial cleaning available.',
    category: 'Services',
    businessName: 'Greenwood Cleaning Services',
    contactPhone: '+1-555-0707',
    contactEmail: 'book@greenwoodcleaning.com',
    website: 'https://greenwoodcleaning.com',
    discount: '30% OFF',
    offer: 'First-time customer special! Get 30% off on your first deep cleaning service.',
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
  },
  {
    title: 'Dental Care Clinic - Checkup Special',
    description: 'Comprehensive dental care including cleanings, fillings, and cosmetic procedures.',
    category: 'Healthcare',
    businessName: 'Greenwood Dental Care',
    contactPhone: '+1-555-0808',
    contactEmail: 'appointments@greenwooddental.com',
    website: 'https://greenwooddental.com',
    discount: 'Free Checkup',
    offer: 'Free dental checkup and cleaning for new patients. Book your appointment today!',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
];

/**
 * Seeds dummy content categories if they don't already exist
 * @param strapi - Strapi instance
 */
async function seedContentCategories(strapi: Core.Strapi): Promise<void> {
  try {
    const contentType = strapi.contentTypes['api::content-category.content-category'];

    if (!contentType) {
      strapi.log.warn('Content Category content type not found. Skipping seed.');
      return;
    }

    const existingCategories = await strapi.entityService.findMany(
      'api::content-category.content-category',
      {
        fields: ['name'],
      }
    );

    const existingNames = new Set(
      existingCategories
        .map((cat) => (cat.name ? String(cat.name).toLowerCase() : ''))
        .filter((name) => name.length > 0)
    );

    const categoriesToCreate = DUMMY_CATEGORIES.filter(
      (cat) => !existingNames.has(cat.name.toLowerCase())
    );

    if (categoriesToCreate.length === 0) {
      strapi.log.info('All dummy content categories already exist. Skipping seed.');
      return;
    }

    strapi.log.info(`Seeding ${categoriesToCreate.length} content categories...`);

    for (const category of categoriesToCreate) {
      try {
        const slug = generateSlug(category.name);
        await strapi.entityService.create('api::content-category.content-category', {
          data: {
            name: category.name,
            slug,
            description: category.description,
            color: category.color,
            publishedAt: new Date(),
          },
        });
        strapi.log.info(`Created content category: ${category.name}`);
      } catch (error) {
        strapi.log.error(`Failed to create category "${category.name}":`, error);
      }
    }

    strapi.log.info('Content category seeding completed.');
  } catch (error) {
    strapi.log.error('Error seeding content categories:', error);
  }
}

/**
 * Seeds dummy advertisements if they don't already exist
 * Note: Images need to be uploaded manually through Strapi admin panel
 * @param strapi - Strapi instance
 */
async function seedAdvertisements(strapi: Core.Strapi): Promise<void> {
  try {
    const contentType = strapi.contentTypes['api::advertisement.advertisement'];

    if (!contentType) {
      strapi.log.warn('Advertisement content type not found. Skipping seed.');
      return;
    }

    const existingAdvertisements = await strapi.entityService.findMany(
      'api::advertisement.advertisement',
      {
        fields: ['title'],
      }
    );

    const existingTitles = new Set(
      existingAdvertisements
        .map((ad) => (ad.title ? String(ad.title).toLowerCase() : ''))
        .filter((title) => title.length > 0)
    );

    const advertisementsToCreate = DUMMY_ADVERTISEMENTS.filter(
      (ad) => !existingTitles.has(ad.title.toLowerCase())
    );

    if (advertisementsToCreate.length === 0) {
      strapi.log.info('All dummy advertisements already exist. Skipping seed.');
      return;
    }

    strapi.log.info(`Seeding ${advertisementsToCreate.length} advertisements...`);
    strapi.log.info('Note: Images need to be added manually through the Strapi admin panel.');

    for (const advertisement of advertisementsToCreate) {
      try {
        await strapi.entityService.create('api::advertisement.advertisement', {
          data: {
            title: advertisement.title,
            description: advertisement.description,
            category: advertisement.category,
            businessName: advertisement.businessName,
            contactPhone: advertisement.contactPhone,
            contactEmail: advertisement.contactEmail,
            website: advertisement.website,
            discount: advertisement.discount,
            offer: advertisement.offer,
            validUntil: advertisement.validUntil,
            publishedAt: new Date(),
            // Note: image field is omitted - add images manually through admin panel
          },
        });
        strapi.log.info(`Created advertisement: ${advertisement.title}`);
      } catch (error) {
        strapi.log.error(`Failed to create advertisement "${advertisement.title}":`, error);
      }
    }

    strapi.log.info('Advertisement seeding completed.');
  } catch (error) {
    strapi.log.error('Error seeding advertisements:', error);
  }
}

/**
 * Seeds dummy news articles if they don't already exist
 * Note: Images need to be uploaded manually through Strapi admin panel
 * @param strapi - Strapi instance
 */
async function seedNews(strapi: Core.Strapi): Promise<void> {
  try {
    const contentType = strapi.contentTypes['api::news.news'];

    if (!contentType) {
      strapi.log.warn('News content type not found. Skipping seed.');
      return;
    }

    const existingNews = await strapi.entityService.findMany('api::news.news', {
      fields: ['title'],
    });

    const existingTitles = new Set(
      existingNews
        .map((item) => (item.title ? String(item.title).toLowerCase() : ''))
        .filter((title) => title.length > 0)
    );

    const newsToCreate = DUMMY_NEWS.filter(
      (item) => !existingTitles.has(item.title.toLowerCase())
    );

    if (newsToCreate.length === 0) {
      strapi.log.info('All dummy news articles already exist. Skipping seed.');
      return;
    }

    strapi.log.info(`Seeding ${newsToCreate.length} news articles...`);
    strapi.log.info('Note: Images need to be added manually through the Strapi admin panel.');

    for (const news of newsToCreate) {
      try {
        const slug = generateSlug(news.title);
        await strapi.entityService.create('api::news.news', {
          data: {
            title: news.title,
            slug,
            shortDescription: news.shortDescription,
            content: news.content,
            category: news.category,
            publishedAt: news.publishedAt || new Date(),
            // Note: image field is omitted - add images manually through admin panel
          },
        });
        strapi.log.info(`Created news article: ${news.title}`);
      } catch (error) {
        strapi.log.error(`Failed to create news article "${news.title}":`, error);
      }
    }

    strapi.log.info('News seeding completed.');
  } catch (error) {
    strapi.log.error('Error seeding news:', error);
  }
}

/**
 * Seeds dummy events if they don't already exist
 * Note: Images need to be uploaded manually through Strapi admin panel
 * @param strapi - Strapi instance
 */
async function seedEvents(strapi: Core.Strapi): Promise<void> {
  try {
    const contentType = strapi.contentTypes['api::event.event'];

    if (!contentType) {
      strapi.log.warn('Event content type not found. Skipping seed.');
      return;
    }

    const existingEvents = await strapi.entityService.findMany('api::event.event', {
      fields: ['title'],
    });

    const existingTitles = new Set(
      existingEvents
        .map((item) => (item.title ? String(item.title).toLowerCase() : ''))
        .filter((title) => title.length > 0)
    );

    const eventsToCreate = DUMMY_EVENTS.filter(
      (item) => !existingTitles.has(item.title.toLowerCase())
    );

    if (eventsToCreate.length === 0) {
      strapi.log.info('All dummy events already exist. Skipping seed.');
      return;
    }

    strapi.log.info(`Seeding ${eventsToCreate.length} events...`);
    strapi.log.info('Note: Images need to be added manually through the Strapi admin panel.');

    for (const event of eventsToCreate) {
      try {
        const slug = generateSlug(event.title);
        await strapi.entityService.create('api::event.event', {
          data: {
            title: event.title,
            slug,
            description: event.description,
            eventDate: event.eventDate,
            location: event.location,
            publishedAt: new Date(),
            // Note: coverImage and gallery fields are omitted - add images manually through admin panel
          },
        });
        strapi.log.info(`Created event: ${event.title}`);
      } catch (error) {
        strapi.log.error(`Failed to create event "${event.title}":`, error);
      }
    }

    strapi.log.info('Event seeding completed.');
  } catch (error) {
    strapi.log.error('Error seeding events:', error);
  }
}

/**
 * Configures public API permissions for all content types
 * Enables find and findOne for public access without authentication
 * @param strapi - Strapi instance
 */
async function configurePublicPermissions(strapi: Core.Strapi): Promise<void> {
  try {
    // Get the Public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('Public role not found. Skipping permission configuration.');
      return;
    }

    // Content types that need public access
    const contentTypes = [
      'api::news.news',
      'api::event.event',
      'api::advertisement.advertisement',
      'api::content-category.content-category',
      'api::notification.notification',
      'api::gallery.gallery',
      'api::policy.policy',
      'api::rwa.rwa',
    ];

    // Actions to enable for each content type
    const actions = ['find', 'findOne'];

    // Get all existing permissions for the public role
    const existingPermissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({
        where: { role: publicRole.id },
      });

    const existingPermissionActions = new Set(
      existingPermissions.map((p) => `${p.action}-${p.action?.split('::')[1] || ''}`)
    );

    const permissionsToCreate: Array<{ action: string }> = [];

    for (const contentType of contentTypes) {
      for (const action of actions) {
        const permissionAction = `${contentType}.${action}`;
        const permissionKey = `${permissionAction}-${contentType}`;

        if (!existingPermissionActions.has(permissionKey)) {
          permissionsToCreate.push({
            action: permissionAction,
          });
        }
      }
    }

    // Also enable Upload/Media find permission for images
    const uploadFindAction = 'plugin::upload.content-api.find';
    const hasUploadFind = existingPermissions.some((p) => p.action === uploadFindAction);

    if (!hasUploadFind) {
      permissionsToCreate.push({
        action: uploadFindAction,
      });
    }

    if (permissionsToCreate.length === 0) {
      strapi.log.info('All public permissions already configured. Skipping.');
      return;
    }

    strapi.log.info(`Configuring ${permissionsToCreate.length} public permissions...`);

    // Create permissions
    for (const permission of permissionsToCreate) {
      try {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            ...permission,
            role: publicRole.id,
          },
        });
      } catch (error) {
        strapi.log.error(`Failed to create permission "${permission.action}":`, error);
      }
    }

    strapi.log.info('Public permissions configured successfully.');
  } catch (error) {
    strapi.log.error('Error configuring public permissions:', error);
  }
}

/**
 * Seeds dummy notifications if they don't already exist
 * @param strapi - Strapi instance
 */
async function seedNotifications(strapi: Core.Strapi): Promise<void> {
  try {
    const contentType = strapi.contentTypes['api::notification.notification'];

    if (!contentType) {
      strapi.log.warn('Notification content type not found. Skipping seed.');
      return;
    }

    const existingNotifications = await strapi.entityService.findMany(
      'api::notification.notification',
      {
        fields: ['title'],
      }
    );

    const existingTitles = new Set(
      existingNotifications
        .map((item) => (item.title ? String(item.title).toLowerCase() : ''))
        .filter((title) => title.length > 0)
    );

    const notificationsToCreate = DUMMY_NOTIFICATIONS.filter(
      (item) => !existingTitles.has(item.title.toLowerCase())
    );

    if (notificationsToCreate.length === 0) {
      strapi.log.info('All dummy notifications already exist. Skipping seed.');
      return;
    }

    strapi.log.info(`Seeding ${notificationsToCreate.length} notifications...`);

    for (const notification of notificationsToCreate) {
      try {
        await strapi.entityService.create('api::notification.notification', {
          data: {
            title: notification.title,
            message: notification.message,
            priority: notification.priority as 'normal' | 'urgent',
            expiryDate: notification.expiryDate,
            publishedAt: new Date(),
          },
        });
        strapi.log.info(`Created notification: ${notification.title}`);
      } catch (error) {
        strapi.log.error(`Failed to create notification "${notification.title}":`, error);
      }
    }

    strapi.log.info('Notification seeding completed.');
  } catch (error) {
    strapi.log.error('Error seeding notifications:', error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await configurePublicPermissions(strapi);
    await seedContentCategories(strapi);
    await seedAdvertisements(strapi);
    await seedNews(strapi);
    await seedEvents(strapi);
    await seedNotifications(strapi);
  },
};
