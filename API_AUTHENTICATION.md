# API Authentication Guide

This guide explains how to authenticate with the Strapi API for Greenwood City.

---

## Option 1: Public Access (No Token Required) ✅ Recommended for Public Content

Public permissions are automatically configured on server startup. Most content types can be accessed without authentication.

### Endpoints Available Without Authentication:

- ✅ `GET /api/news-articles` - Get all news articles
- ✅ `GET /api/news-articles/:id` - Get single news article
- ✅ `GET /api/events` - Get all events
- ✅ `GET /api/events/:id` - Get single event
- ✅ `GET /api/advertisements` - Get all advertisements
- ✅ `GET /api/advertisements/:id` - Get single advertisement
- ✅ `GET /api/content-categories` - Get all categories
- ✅ `GET /api/notifications` - Get all notifications
- ✅ `GET /api/galleries` - Get all galleries
- ✅ `GET /api/policies` - Get all policies
- ✅ `GET /api/rwas` - Get all RWAs

### Example Usage (No Token):

```javascript
// Fetch news articles
const response = await fetch('http://localhost:1337/api/news-articles?populate=*');
const data = await response.json();

// Fetch single event
const event = await fetch('http://localhost:1337/api/events/1?populate=*');
```

**Note:** Public permissions are automatically configured via bootstrap function. If you see 403 errors, ensure Strapi has been restarted after the bootstrap runs.

---

## Option 2: API Token Authentication (For Protected Endpoints)

If you need to create, update, or delete content, you'll need an API token.

### Step 1: Create an API Token in Strapi Admin

1. Log in to Strapi Admin: `http://localhost:1337/admin`
2. Go to **Settings** → **API Tokens** → **Create new API Token**
3. Fill in the form:
   - **Name**: e.g., "Frontend API Token"
   - **Token duration**: Unlimited (or set expiration)
   - **Token type**: **Full access** (or select specific permissions)
4. Click **Save**
5. **Copy the token immediately** (you won't be able to see it again!)

### Step 2: Use the Token in API Requests

Include the token in the `Authorization` header:

```javascript
const token = 'your-api-token-here';

// Using fetch
const response = await fetch('http://localhost:1337/api/news-articles', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// Using axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const news = await api.get('/news-articles');
```

### Step 3: Environment Variables (Best Practice)

Store your token securely in environment variables:

**.env.local** (for Next.js/frontend):
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

**Usage in code:**
```javascript
const token = process.env.STRAPI_API_TOKEN;

const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/news-articles`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

---

## Option 3: JWT Authentication (For User Accounts)

If you have user accounts in Strapi, you can authenticate users via JWT tokens.

### Step 1: User Login

```javascript
const response = await fetch('http://localhost:1337/api/auth/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    identifier: 'user@example.com',
    password: 'password123',
  }),
});

const { jwt, user } = await response.json();
```

### Step 2: Use JWT Token

```javascript
// Store JWT token (e.g., in localStorage or httpOnly cookie)
localStorage.setItem('jwt', jwt);

// Use in subsequent requests
const token = localStorage.getItem('jwt');

const response = await fetch('http://localhost:1337/api/news-articles', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

---

## Common Issues & Solutions

### Issue 1: 403 Forbidden Error

**Problem:** Getting 403 errors even though content should be public.

**Solutions:**
1. **Restart Strapi** - Bootstrap function runs on startup to configure permissions
2. **Check Permissions Manually**:
   - Go to Strapi Admin → **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
   - Verify `find` and `findOne` are enabled for your content type
   - Click **Save**

### Issue 2: Token Not Working

**Problem:** Token authentication returns 401 Unauthorized.

**Solutions:**
1. Verify token is correct (copy/paste from Strapi admin)
2. Check token hasn't expired
3. Ensure `Bearer ` prefix is included: `Authorization: Bearer YOUR_TOKEN`
4. Verify token has required permissions for the endpoint

### Issue 3: CORS Errors

**Problem:** Browser blocks requests with CORS errors.

**Solutions:**
1. Check `config/middlewares.ts` includes your frontend URL
2. Ensure `FRONTEND_URL` environment variable is set
3. For development, ensure `http://localhost:3000` is in allowed origins

---

## API Token Permissions

When creating an API token, you can choose:

- **Full access**: Can read and write all content types
- **Read-only**: Can only read (find, findOne)
- **Custom**: Select specific content types and actions

For public-facing frontends, **Read-only** or **Public access** (no token) is recommended.

---

## Security Best Practices

1. **Never expose API tokens in client-side code** - Use them only on the server side
2. **Use environment variables** - Store tokens in `.env` files (not committed to git)
3. **Rotate tokens regularly** - Regenerate tokens periodically
4. **Use read-only tokens** - For public APIs, use read-only permissions
5. **Set token expiration** - Don't use unlimited duration tokens unless necessary

---

## Testing API Access

### Test Public Access:
```bash
curl http://localhost:1337/api/news-articles
```

### Test with Token:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/news-articles
```

---

## Summary

- **Public Content (GET requests)**: No token needed ✅
- **Protected Content (POST/PUT/DELETE)**: API token required 🔒
- **User Authentication**: JWT token after login 👤

Most common use case: Use **public access** (no token) for reading content, and API tokens only when you need to create/update content.

