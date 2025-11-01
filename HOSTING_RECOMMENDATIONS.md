# Hosting Recommendations for Strapi + Next.js
## For 10-20 Users Per Day

---

## 🏆 **TOP RECOMMENDATIONS (Best Value)**

### **Option 1: Vercel + Railway** ⭐ RECOMMENDED
**Total Cost: ~$0-10/month**

#### Setup:
- **Next.js Frontend**: Vercel (FREE tier)
  - Unlimited deployments
  - Automatic SSL
  - Global CDN
  - Perfect for Next.js
  
- **Strapi Backend**: Railway ($5/month or free credits)
  - Easy deployment
  - PostgreSQL included
  - Auto-deploy from GitHub
  - 500 hours free per month

**Why This Combo:**
- ✅ Zero cost if within free tiers
- ✅ Best-in-class Next.js hosting
- ✅ Simple setup
- ✅ Production-ready

**Monthly Cost Breakdown:**
- Vercel: $0 (free tier sufficient)
- Railway: $5/month or free if using credits
- **Total: $0-5/month**

---

### **Option 2: Render (Both Apps)** ⭐ BEST FOR SIMPLICITY
**Total Cost: Free (with limitations) or $7/month**

#### Setup:
- **Next.js**: Render Static Site (FREE)
- **Strapi**: Render Web Service (FREE tier with sleep, or $7/month always-on)

**Free Tier Limitations:**
- Services sleep after 15 min inactivity (wake-up takes ~30 seconds)
- Suitable for 10-20 users/day

**Paid Tier ($7/month):**
- Always-on Strapi instance
- No cold starts
- 512MB RAM, 0.5 CPU

**Why Render:**
- ✅ Host both apps on one platform
- ✅ Free PostgreSQL database included
- ✅ Easy GitHub integration
- ✅ Free SSL certificates

---

### **Option 3: Railway (Both Apps)** ⭐ BEST FOR EASE
**Total Cost: $5/month**

#### Setup:
- **Next.js**: Railway service
- **Strapi**: Railway service
- **PostgreSQL**: Railway service (included)

**Monthly Cost:**
- $5/month base plan
- Includes: 512MB RAM, PostgreSQL, deployments

**Why Railway:**
- ✅ Everything in one place
- ✅ Simple GitHub deploy
- ✅ Automatic database provisioning
- ✅ Great developer experience

---

## 💰 **CHEAPEST OPTIONS (VPS)**

### **Option 4: Contabo VPS** 💵 ULTRA CHEAP
**Total Cost: $4-6/month**

#### Specs:
- 2 vCPU cores
- 4GB RAM
- 50GB SSD
- Perfect for both apps

**Setup Required:**
- Manual Node.js installation
- PM2 for process management
- Nginx reverse proxy
- Let's Encrypt SSL

**Why Contabo:**
- ✅ Extremely cheap
- ✅ Full control
- ✅ Can handle both apps easily
- ❌ Requires Linux/server knowledge

**Monthly Cost: $4-6/month**

---

### **Option 5: DigitalOcean App Platform**
**Total Cost: $12/month**

#### Setup:
- Next.js App: $5/month
- Strapi App: $5/month  
- Managed PostgreSQL: $15/month (or use managed DB separately)

**Why DigitalOcean:**
- ✅ Reliable and stable
- ✅ Good documentation
- ✅ Professional support
- ❌ More expensive than others

---

## 📊 **COMPARISON TABLE**

| Provider | Next.js | Strapi | Database | Total/Month | Ease | Best For |
|----------|---------|--------|----------|-------------|------|----------|
| **Vercel + Railway** | Free | $5 | Included | **$0-5** | ⭐⭐⭐⭐⭐ | Best value |
| **Render (Both)** | Free | Free/$7 | Included | **$0-7** | ⭐⭐⭐⭐⭐ | Simplest |
| **Railway (Both)** | Included | Included | Included | **$5** | ⭐⭐⭐⭐⭐ | One platform |
| **Contabo VPS** | Manual | Manual | Manual | **$4-6** | ⭐⭐ | Cheapest VPS |
| **DigitalOcean** | $5 | $5 | $15 | **$25** | ⭐⭐⭐⭐ | Production |

---

## 🚀 **RECOMMENDED SETUP: Render (Free Tier)**

For your traffic (10-20 users/day), Render's free tier is perfect:

### Step 1: Deploy Strapi to Render

1. **Create Render Account**: https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   Environment: Node 18 or 20
   ```
4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   DATABASE_URL=<from PostgreSQL service>
   APP_KEYS=<generate random string>
   API_TOKEN_SALT=<generate random string>
   ADMIN_JWT_SECRET=<generate random string>
   TRANSFER_TOKEN_SALT=<generate random string>
   JWT_SECRET=<generate random string>
   HOST=0.0.0.0
   PORT=10000
   ```
5. **Add PostgreSQL Database:**
   - New → PostgreSQL
   - Copy connection string to `DATABASE_URL`

### Step 2: Deploy Next.js to Render

1. **New Static Site** (or Web Service if using SSR)
2. **Settings:**
   ```
   Build Command: npm install && npm run build
   Publish Directory: .next (or .out if static export)
   ```
3. **Environment Variables:**
   ```
   STRAPI_URL=https://your-strapi.onrender.com
   ```

### Step 3: Configure CORS in Strapi

Update `config/middlewares.ts`:
```typescript
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
            'https://your-nextjs-site.onrender.com',
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
      origin: ['https://your-nextjs-site.onrender.com', 'http://localhost:3000'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## 🔧 **QUICK DEPLOYMENT SCRIPTS**

### For Railway:

Create `railway.json` in Strapi root:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### For Render:

Create `render.yaml`:
```yaml
services:
  - type: web
    name: greenwood-strapi
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: greenwood-db
          property: connectionString
      - key: APP_KEYS
        generateValue: true
      - key: API_TOKEN_SALT
        generateValue: true
      - key: ADMIN_JWT_SECRET
        generateValue: true
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: greenwood-db
    plan: free
    databaseName: greenwood
    user: greenwood
```

---

## 💡 **IMPORTANT CONSIDERATIONS**

### For Free Tiers:
1. **Cold Starts**: Free tier services may sleep after inactivity
   - First request after sleep takes 30-60 seconds
   - Consider $5-7/month for always-on

2. **Database Limits**: 
   - Free PostgreSQL: 1GB storage, 256MB RAM
   - Sufficient for 10-20 users/day

3. **Build Time Limits**:
   - Render: 45 min free tier
   - Railway: 500 hours/month free

### Production Checklist:
- [ ] Set up environment variables
- [ ] Configure CORS for your domain
- [ ] Set up database backups (free tiers usually auto-backup)
- [ ] Configure custom domain (free on most platforms)
- [ ] Enable SSL (automatic on most platforms)
- [ ] Set up monitoring/alerts

---

## 🎯 **FINAL RECOMMENDATION**

**For 10-20 users/day: Use Render Free Tier**

**Why:**
1. ✅ $0/month to start
2. ✅ Host both apps on one platform
3. ✅ Includes free PostgreSQL
4. ✅ Easy GitHub integration
5. ✅ Free SSL certificates
6. ✅ Can upgrade to $7/month if needed (always-on)

**If free tier sleep time is an issue, upgrade to:**
- **Railway $5/month** (always-on, simple)
- **Render $7/month** (always-on, same platform)

---

## 📝 **NEXT STEPS**

1. Choose your hosting provider
2. Set up environment variables
3. Configure database (PostgreSQL recommended for production)
4. Deploy Strapi backend
5. Deploy Next.js frontend
6. Update CORS settings
7. Test production deployment

---

## 🔗 **USEFUL LINKS**

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)

