/**
 * Generate secure random strings for Strapi environment variables
 * Run with: node scripts/generate-env-secrets.js
 */

const crypto = require('crypto');

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

console.log('=== Strapi Environment Secrets ===\n');
console.log('Copy these values to your hosting platform\'s environment variables:\n');

console.log(`APP_KEYS=${generateSecret()}`);
console.log(`API_TOKEN_SALT=${generateSecret()}`);
console.log(`ADMIN_JWT_SECRET=${generateSecret()}`);
console.log(`JWT_SECRET=${generateSecret()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateSecret()}\n`);

console.log('=== Important ===');
console.log('1. Never commit these values to Git');
console.log('2. Add them to your hosting platform\'s environment variables');
console.log('3. Keep them secure - regenerate if exposed');

