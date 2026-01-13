# ⚡ Quick Start Guide

Get your portfolio live in 15 minutes!

## 🚀 Fast Track to Deployment

### Step 1: Push to GitHub (2 min)
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

### Step 2: Deploy to Vercel (3 min)
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Deploy" (don't add env vars yet)

### Step 3: Add Environment Variables (2 min)
In Vercel Dashboard:
1. Go to Project → Settings → Environment Variables
2. Add these 3 variables:

```
Name: VITE_EMAILJS_SERVICE_ID
Value: service_4tl3qpe

Name: VITE_EMAILJS_TEMPLATE_ID
Value: template_renfsem

Name: VITE_EMAILJS_PUBLIC_KEY
Value: doJOeWgXmUrvDqBhB
```

3. Select all environments (Production, Preview, Development)
4. Click Save for each

### Step 4: Redeploy (1 min)
1. Go to Deployments tab
2. Click "..." on the latest deployment
3. Click "Redeploy"

### Step 5: Test Your Site (5 min)
1. Click "Visit" to open your live site
2. Test the contact form
3. Verify all features work

## ✅ Done!

Your portfolio is now live! 🎉

### Your URLs
- **Production**: `https://your-project.vercel.app`
- **Dashboard**: `https://vercel.com/your-username/your-project`

### What's Next?
- [ ] Update personal info in `src/data/portfolioData.ts`
- [ ] Add your real social media links
- [ ] Replace placeholder images
- [ ] Test on mobile
- [ ] Share with the world! 🌍

---

**Need more details?** Read [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md)
