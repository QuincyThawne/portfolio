# 🚀 Deployment Checklist for Vercel

Use this checklist to ensure your portfolio is ready for production deployment.

## Pre-Deployment Checklist

### ✅ Code Optimization
- [x] Environment variables configured (`.env` created)
- [x] Sensitive data (API keys) removed from code
- [x] `.gitignore` updated to exclude `.env` files
- [x] Build optimization enabled in `vite.config.ts`
- [ ] All console.logs removed or will be removed in production build
- [ ] Code linting passed (`npm run lint`)
- [ ] Production build tested locally (`npm run build && npm run preview`)

### ✅ Content Updates
- [ ] Personal information updated in `portfolioData.ts`
- [ ] All social media links updated with real URLs
- [ ] Project descriptions reviewed and accurate
- [ ] Project images added and optimized
- [ ] Achievement images added (if available)
- [ ] Email address verified in contact section

### ✅ EmailJS Setup
- [ ] EmailJS account created
- [ ] Email service configured (Gmail/Outlook/etc.)
- [ ] Email template created with proper variables
- [ ] Service ID obtained
- [ ] Template ID obtained
- [ ] Public Key obtained
- [ ] Test email sent successfully from local dev

### ✅ Testing
- [ ] All pages load correctly
- [ ] Navigation works (both modes)
- [ ] Contact form submits successfully
- [ ] Game mode loads and is playable
- [ ] Pentagon charts are clickable and enlarge
- [ ] Achievements dialog opens with images
- [ ] Mobile responsive design tested
- [ ] Dark mode works properly
- [ ] All images load correctly
- [ ] All links open in correct tabs

### ✅ Performance
- [ ] Images optimized (compressed)
- [ ] Large assets under 500KB each
- [ ] No unnecessary dependencies
- [ ] Lazy loading implemented where needed

## Vercel Deployment Steps

### 1. GitHub Setup
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial deployment setup"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

### 2. Vercel Import
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings ✓

### 3. Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add these variables (one by one):
   - `VITE_EMAILJS_SERVICE_ID` = `your_service_id`
   - `VITE_EMAILJS_TEMPLATE_ID` = `your_template_id`
   - `VITE_EMAILJS_PUBLIC_KEY` = `your_public_key`
3. Select "Production", "Preview", and "Development" for each
4. Click "Save"

### 4. Deploy
1. Click "Deploy" button
2. Wait for build to complete (2-3 minutes)
3. Check deployment logs for any errors
4. Visit your live site URL

### 5. Post-Deployment Testing
- [ ] Visit your live site
- [ ] Test contact form with real submission
- [ ] Check email received at your inbox
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Verify all images load
- [ ] Check page load speed
- [ ] Test game mode functionality

## Custom Domain Setup (Optional)

### Add Custom Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain name
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### DNS Configuration
For most domain providers:
- **Type**: A Record
- **Name**: @ (or your subdomain)
- **Value**: 76.76.21.21 (Vercel's IP)

Or use CNAME:
- **Type**: CNAME
- **Name**: www (or your subdomain)
- **Value**: cname.vercel-dns.com

## Continuous Deployment

Once set up, deployments are automatic:
- **Push to `main` branch** → Production deployment
- **Open Pull Request** → Preview deployment
- **Push to other branches** → Preview deployment

## Monitoring & Analytics

### Add Analytics (Optional)
1. In Vercel Dashboard, go to Analytics tab
2. Enable Vercel Analytics (free tier available)
3. View real-time performance metrics

### Monitor Deployments
- Check deployment logs in Vercel Dashboard
- Set up deployment notifications in Settings
- Monitor build times and success rates

## Troubleshooting

### Build Fails
1. Check build logs in Vercel
2. Test build locally: `npm run build`
3. Verify all dependencies in `package.json`
4. Check for TypeScript errors

### Environment Variables Not Working
1. Verify variable names match exactly (case-sensitive)
2. Redeploy after adding variables
3. Check variables are set for correct environment

### Contact Form Not Working
1. Test EmailJS credentials in local dev first
2. Verify environment variables in Vercel
3. Check EmailJS dashboard for delivery status
4. Look for errors in browser console

### Images Not Loading
1. Verify images are imported correctly
2. Check file paths are relative to `src/`
3. Ensure images are committed to git
4. Check Vercel deployment logs

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **EmailJS Docs**: https://www.emailjs.com/docs/
- **React Docs**: https://react.dev/

## Security Reminders

- ✅ Never commit `.env` files to git
- ✅ Use environment variables for all secrets
- ✅ Keep dependencies updated regularly
- ✅ Enable HTTPS (automatic on Vercel)
- ⚠️ Consider adding reCAPTCHA for production

---

**Ready to deploy? Double-check all items above, then go for it! 🚀**
