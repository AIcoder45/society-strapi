# 🚀 Quick Start - Deploy to Render (FREE)

## ⚡ Fastest Path to Production (15 minutes)

### Prerequisites
- ✅ GitHub account
- ✅ Code pushed to GitHub
- ✅ Render account (free): https://render.com

---

## Step 1: Generate Secret Keys (2 min)

Run this in your terminal:
```bash
node scripts/generate-env-secrets.js
```

Copy all the generated keys - you'll need them in Step 3.

---

## Step 2: Deploy Strapi Backend (5 min)

1. **Go to Render**: https://render.com
2. **New +** → **PostgreSQL** (create database first)
   - Name: `greenwood-db`
   - Plan: **Free**
   - Create
3. **New +** → **Web Service**
   - Connect GitHub repo
   - Name: `greenwood-strapi`
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Environment: **Node**

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=<copy from PostgreSQL service>
   HOST=0.0.0.0
   PORT=10000
   ```
   
   Plus the 5 secret keys from Step 1:
   - `APP_KEYS`
   - `API_TOKEN_SALT`
   - `ADMIN_JWT_SECRET`
   - `JWT_SECRET`
   - `TRANSFER_TOKEN_SALT`

5. **Create Web Service** → Wait 5-10 minutes

6. **Create Admin Account**:
   - Visit: `https://greenwood-strapi.onrender.com/admin`
   - Create your admin account

---

## Step 3: Deploy Next.js Frontend (5 min)

1. **In your Next.js project**, update `.env.local`:
   ```
   STRAPI_URL=https://greenwood-strapi.onrender.com
   ```

2. **Deploy to Vercel** (easiest, free):
   - Go to https://vercel.com
   - **Add New Project**
   - Import GitHub repo
   - Add environment variable:
     ```
     STRAPI_URL=https://greenwood-strapi.onrender.com
     ```
   - **Deploy**

   OR

   **Deploy to Render** (same platform):
   - Render → **New +** → **Static Site**
   - Connect Next.js repo
   - Build: `npm install && npm run build`
   - Publish: `.next` (or `out` if static)
   - Environment: `STRAPI_URL=https://greenwood-strapi.onrender.com`

---

## Step 4: Configure Strapi Permissions (2 min)

1. Go to: `https://greenwood-strapi.onrender.com/admin`
2. **Settings** → **Users & Permissions** → **Roles** → **Public**
3. Enable **find** and **findOne** for:
   - ✅ News
   - ✅ Event
   - ✅ Gallery
   - ✅ Notification
   - ✅ Policy
   - ✅ RWA
4. **Save**

---

## Step 5: Test! (1 min)

Visit your Next.js site - content should load from Strapi! 🎉

---

## 💰 Cost

- **Free Tier**: $0/month (services sleep after 15 min inactivity)
- **Always-On**: $7/month (no sleep, instant responses)

For 10-20 users/day, **free tier is perfect**.

---

## 🆘 Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

---

## ✅ You're Done!

Your apps are now live:
- **Strapi**: `https://greenwood-strapi.onrender.com`
- **Next.js**: `https://your-site.vercel.app` (or `.onrender.com`)

---

## 📝 Next Steps

1. ✅ Configure custom domain (optional)
2. ✅ Set up backups
3. ✅ Monitor usage in Render dashboard
4. ✅ Upgrade to always-on if needed ($7/month)

