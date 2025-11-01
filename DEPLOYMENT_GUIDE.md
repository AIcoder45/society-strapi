# Quick Deployment Guide
## Step-by-Step Instructions for Strapi + Next.js

---

## 🎯 **RECOMMENDED: Render (Free Tier)**

### **Step 1: Deploy Strapi Backend**

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create PostgreSQL Database**
   - Click **New +** → **PostgreSQL**
   - Name: `greenwood-db`
   - Plan: **Free**
   - Region: **Oregon** (or closest to you)
   - Click **Create Database**
   - **Save the Internal Database URL** for later

4. **Deploy Strapi Web Service**
   - Click **New +** → **Web Service**
   - Connect your GitHub repo
   - Name: `greenwood-strapi`
   - Region: **Oregon**
   - Branch: `main`
   - Root Directory: `.` (or leave blank)
   - Runtime: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

5. **Set Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=<paste Internal Database URL from step 3>
   HOST=0.0.0.0
   PORT=10000
   ```
   
   **Generate Secret Keys** (run these in terminal):
   ```bash
   # Generate APP_KEYS
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Generate API_TOKEN_SALT
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Generate ADMIN_JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Generate JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Generate TRANSFER_TOKEN_SALT
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   
   Add each generated value to Render environment variables.

6. **Deploy!**
   - Click **Create Web Service**
   - Wait for build (5-10 minutes)
   - Your Strapi will be available at: `https://greenwood-strapi.onrender.com`

7. **First Time Setup**
   - Visit `https://greenwood-strapi.onrender.com/admin`
   - Create admin account
   - Configure content types

---

### **Step 2: Deploy Next.js Frontend**

1. **In your Next.js project directory**, create/update `.env.local`:
   ```
   STRAPI_URL=https://greenwood-strapi.onrender.com
   ```

2. **Build Next.js for production:**
   ```bash
   npm run build
   ```

3. **Deploy to Render (Static Site)**:
   - Click **New +** → **Static Site**
   - Connect GitHub repo (Next.js project)
   - Name: `greenwood-frontend`
   - Branch: `main`
   - Root Directory: `.` (or your Next.js root)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `.next` (or `out` if using static export)

4. **Set Environment Variables:**
   ```
   STRAPI_URL=https://greenwood-strapi.onrender.com
   ```

5. **Deploy!**
   - Click **Create Static Site**
   - Wait for build
   - Your site will be at: `https://greenwood-frontend.onrender.com`

---

## 🚂 **ALTERNATIVE: Railway (Both Apps)**

### **Step 1: Setup Railway**

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click **New Project**
   - Select **Deploy from GitHub repo** (Strapi repo)

3. **Add PostgreSQL**
   - Click **+ New** → **Database** → **PostgreSQL**
   - Railway automatically provisions database

4. **Configure Environment Variables**
   - Click on your Strapi service
   - Go to **Variables** tab
   - Add:
     ```
     DATABASE_CLIENT=postgres
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     NODE_ENV=production
     ```
   - Generate secret keys (same as Render step above) and add them

5. **Deploy**
   - Railway auto-detects Node.js
   - Starts building automatically
   - Your Strapi URL: Check the **Settings** tab

6. **Deploy Next.js**
   - Add another service to same project
   - Connect Next.js GitHub repo
   - Set environment variable:
     ```
     STRAPI_URL=<your-strapi-railway-url>
     ```

---

## ⚙️ **Post-Deployment Configuration**

### **1. Update Strapi CORS Settings**

Your `config/middlewares.ts` is already configured, but update `FRONTEND_URL`:

In Render/Railway environment variables:
```
FRONTEND_URL=https://your-nextjs-url.onrender.com
```

### **2. Configure Public API Permissions**

1. Go to Strapi Admin: `https://your-strapi-url/admin`
2. Navigate: **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Enable **find** and **findOne** for all your content types:
   - ✅ News: `find`, `findOne`
   - ✅ Event: `find`, `findOne`
   - ✅ Gallery: `find`, `findOne`
   - ✅ Notification: `find`, `findOne`
   - ✅ Policy: `find`, `findOne`
   - ✅ RWA: `find`, `findOne`
   - ✅ Contact: `create` (if users can submit)
4. Click **Save**

### **3. Test API Endpoints**

Test your Strapi API:
```bash
# Test news endpoint
curl https://your-strapi-url.onrender.com/api/news

# Should return JSON data
```

### **4. Configure Custom Domain (Optional)**

**Render:**
- Go to service → **Settings** → **Custom Domains**
- Add your domain
- Update DNS records as instructed

**Railway:**
- Go to service → **Settings** → **Networking**
- Generate domain or add custom domain

---

## 🐛 **Troubleshooting**

### **Issue: Database Connection Error**

**Symptoms:** `Error: connect ECONNREFUSED`

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check database is running (Render/Railway dashboard)
3. Ensure `DATABASE_CLIENT=postgres` is set

### **Issue: CORS Errors in Browser**

**Symptoms:** `Access to fetch at ... has been blocked by CORS policy`

**Solution:**
1. Verify `FRONTEND_URL` is set correctly
2. Check `config/middlewares.ts` includes your frontend domain
3. Restart Strapi service after changing CORS settings

### **Issue: Images Not Loading**

**Symptoms:** Images return 404 or broken links

**Solution:**
1. Check media upload permissions in Strapi
2. Ensure `strapi::public` middleware is enabled
3. Verify CORS settings allow image domains

### **Issue: Build Fails**

**Symptoms:** Deployment build error

**Common Fixes:**
1. Ensure `package.json` has `engines.node` specified
2. Check Node version matches (18.x or 20.x)
3. Verify all dependencies are in `dependencies` (not `devDependencies`)
4. Check build logs for specific errors

### **Issue: Service Goes to Sleep (Free Tier)**

**Symptoms:** First request takes 30-60 seconds

**Solutions:**
1. **Free**: Accept the cold start (fine for 10-20 users/day)
2. **Paid**: Upgrade to always-on plan ($5-7/month)
3. **Workaround**: Use a cron job to ping service every 10 minutes

---

## 📊 **Monitoring & Maintenance**

### **Health Check Endpoint**

Create a simple health check:

**File: `src/index.ts`** - Add health route:
```typescript
// ... existing code ...

if (process.env.NODE_ENV === 'production') {
  // Health check endpoint
  strapi.server.httpServer.get('/_health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}
```

### **Database Backups**

**Render:** Automatic backups (check dashboard)
**Railway:** Manual backups via CLI or dashboard

### **Logs**

- **Render**: View logs in dashboard → **Logs** tab
- **Railway**: View logs in dashboard → **Deployments** → **View Logs**

---

## ✅ **Deployment Checklist**

Before going live:

- [ ] All environment variables set
- [ ] Database connected and migrated
- [ ] Admin account created in Strapi
- [ ] Public API permissions configured
- [ ] CORS settings updated with frontend URL
- [ ] Health check endpoint working
- [ ] Next.js connected to Strapi API
- [ ] Images loading correctly
- [ ] SSL certificate active (automatic on most platforms)
- [ ] Custom domain configured (if applicable)
- [ ] Tested all API endpoints
- [ ] Backup strategy in place

---

## 🔄 **Updating Your Deployment**

### **Render:**
1. Push changes to GitHub
2. Render auto-detects and redeploys
3. Monitor in dashboard

### **Railway:**
1. Push changes to GitHub
2. Railway auto-deploys
3. Check deployment status

---

## 💰 **Cost Optimization Tips**

1. **Use Free Tiers First**: Test with free tiers before upgrading
2. **Monitor Usage**: Check Render/Railway dashboards regularly
3. **Optimize Builds**: Reduce build time with caching
4. **Database**: Free PostgreSQL tiers are sufficient for 10-20 users/day
5. **CDN**: Use Vercel for Next.js (free, better CDN)

---

## 📞 **Need Help?**

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Strapi Docs**: https://docs.strapi.io/dev-docs/deployment

---

**Estimated Setup Time**: 30-45 minutes  
**Monthly Cost**: $0-7 (depending on free vs paid tier)

