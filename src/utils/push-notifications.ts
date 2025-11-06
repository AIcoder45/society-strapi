/**
 * Push Notification Service
 * Handles sending push notifications to subscribed users
 */

import webpush from 'web-push';
import type { Core } from '@strapi/strapi';

/**
 * Initialize VAPID keys for push notifications
 * @param strapi - Optional Strapi instance for logging
 */
function initializeVAPID(strapi?: Core.Strapi): void {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const email = process.env.VAPID_EMAIL || 'mailto:admin@greenwoodcity.com';

  if (!publicKey || !privateKey) {
    if (strapi) {
      strapi.log.warn(
        'VAPID keys not configured. Push notifications will not work. Set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in environment variables.'
      );
    }
    return;
  }

  webpush.setVapidDetails(email, publicKey, privateKey);
  if (strapi) {
    strapi.log.info('VAPID keys initialized for push notifications');
  }
}

/**
 * Send push notification to a subscription
 * @param subscription - Push subscription object
 * @param payload - Notification payload
 * @param strapi - Strapi instance
 */
export async function sendPushNotification(
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  },
  payload: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: Record<string, unknown>;
  },
  strapi: Core.Strapi
): Promise<void> {
  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      strapi.log.warn('VAPID keys not configured. Cannot send push notification.');
      return;
    }

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || '/favicon.ico',
      badge: payload.badge || '/favicon.ico',
      data: payload.data || {},
    });

    await webpush.sendNotification(subscription, notificationPayload);

    strapi.log.info(`Push notification sent successfully to ${subscription.endpoint.substring(0, 50)}...`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    strapi.log.error(`Failed to send push notification: ${errorMessage}`);

    // If subscription is invalid, we might want to delete it
    if (errorMessage.includes('410') || errorMessage.includes('expired')) {
      strapi.log.warn('Subscription appears to be invalid or expired');
    }

    throw error;
  }
}

/**
 * Send push notification to all active subscriptions
 * @param payload - Notification payload
 * @param strapi - Strapi instance
 * @param filters - Optional filters (e.g., device type)
 */
export async function sendPushNotificationToAll(
  payload: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: Record<string, unknown>;
  },
  strapi: Core.Strapi,
  filters?: { device?: string }
): Promise<{ sent: number; failed: number }> {
  try {
    const filtersClause: Record<string, unknown> = {};
    if (filters?.device) {
      filtersClause.device = filters.device;
    }

    const findOptions: {
      filters?: Record<string, unknown>;
    } = {};

    if (Object.keys(filtersClause).length > 0) {
      findOptions.filters = filtersClause;
    }

    const subscriptions = await strapi.entityService.findMany(
      'api::push-subscription.push-subscription',
      findOptions
    );

    if (!subscriptions || subscriptions.length === 0) {
      strapi.log.info('No push subscriptions found');
      return { sent: 0, failed: 0 };
    }

    let sent = 0;
    let failed = 0;

    // Send notifications in parallel
    const promises = subscriptions.map(async (sub: {
      id: number | string;
      endpoint?: string;
      keys?: unknown;
      [key: string]: unknown;
    }) => {
      try {
        if (!sub.endpoint || !sub.keys) {
          strapi.log.warn('Invalid subscription found, skipping');
          return;
        }

        const subscription = {
          endpoint: sub.endpoint,
          keys: sub.keys as { p256dh: string; auth: string },
        };

        await sendPushNotification(subscription, payload, strapi);
        sent++;
      } catch (error) {
        failed++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        strapi.log.error(`Failed to send to subscription: ${errorMessage}`);

        // Remove invalid subscriptions
        if (
          errorMessage.includes('410') ||
          errorMessage.includes('expired') ||
          errorMessage.includes('Gone')
        ) {
          try {
            if (sub.id) {
              await strapi.entityService.delete('api::push-subscription.push-subscription', sub.id);
              strapi.log.info('Removed invalid subscription');
            }
          } catch (deleteError) {
            strapi.log.error(`Failed to delete invalid subscription: ${deleteError}`);
          }
        }
      }
    });

    await Promise.allSettled(promises);

    strapi.log.info(`Push notifications sent: ${sent} successful, ${failed} failed`);

    return { sent, failed };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    strapi.log.error(`Failed to send push notifications: ${errorMessage}`);
    throw error;
  }
}

/**
 * Send notification when content is created/updated
 * @param contentType - Content type name (e.g., 'news', 'event')
 * @param action - Action type ('create', 'update', 'delete')
 * @param entry - Entry data
 * @param strapi - Strapi instance
 */
export async function notifyContentChange(
  contentType: string,
  action: 'create' | 'update' | 'delete',
  entry: { title?: string; [key: string]: unknown },
  strapi: Core.Strapi
): Promise<void> {
  try {
    const contentTypeLabels: Record<string, string> = {
      news: 'News Article',
      event: 'Event',
      notification: 'Notification',
      advertisement: 'Advertisement',
      policy: 'Policy',
    };

    const contentTypeLabel = contentTypeLabels[contentType] || contentType;

    const actionLabels: Record<string, string> = {
      create: 'New',
      update: 'Updated',
      delete: 'Deleted',
    };

    const actionLabel = actionLabels[action] || action;

    const title = `${actionLabel} ${contentTypeLabel}`;
    const body =
      entry.title && typeof entry.title === 'string'
        ? entry.title
        : `${actionLabel} ${contentTypeLabel.toLowerCase()}`;

    await sendPushNotificationToAll(
      {
        title,
        body,
        data: {
          contentType,
          action,
          entryId: entry.id,
        },
      },
      strapi
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    strapi.log.error(`Failed to send content change notification: ${errorMessage}`);
  }
}

// Initialize VAPID on module load
let vapidInitialized = false;

export function ensureVAPIDInitialized(strapi?: Core.Strapi): void {
  if (!vapidInitialized) {
    initializeVAPID(strapi);
    vapidInitialized = true;
  }
}

