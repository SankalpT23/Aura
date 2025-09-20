# 🚀 AURA Deployment Guide

## 📋 Overview

Your AURA application consists of two parts:
- **Landing Page** (Next.js) - Marketing/landing page at root `/`
- **Dashboard** (Vite + React) - Main application at `/dashboard`

## 🏗️ Build Process

### Local Development
```bash
# Run both applications
npm run dev

# Run individually
npm run dev:main      # Dashboard only
npm run dev:landing   # Landing page only
```

### Production Build
```bash
# Build both applications
npm run build

# Build individually
npm run build:main    # Dashboard only
npm run build:landing # Landing page only
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel:**
- Excellent Next.js support
- Automatic deployments
- Great performance
- Easy setup

**Steps:**
1. Push your code to GitHub
2. Connect to Vercel
3. Vercel will automatically detect Next.js
4. Deploy!

**Configuration:**
- The `vercel.json` file is already configured
- Landing page serves at root `/`
- Dashboard serves at `/dashboard`

**Cost:** Free tier available, paid plans start at $20/month

---

### Option 2: Netlify

**Why Netlify:**
- Good for static sites
- Easy drag-and-drop deployment
- Good free tier

**Steps:**
1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `Landing-page/out` folder
4. Configure redirects in `netlify.toml`

**Cost:** Free tier available, paid plans start at $19/month

---

### Option 3: AWS S3 + CloudFront

**Why AWS:**
- Highly scalable
- Global CDN
- Pay-as-you-go

**Steps:**
1. Build: `npm run build`
2. Upload `Landing-page/out` to S3 bucket
3. Upload `dist` folder to S3 bucket
4. Configure CloudFront distribution
5. Set up routing rules

**Cost:** Pay-as-you-go, typically $5-20/month

---

### Option 4: DigitalOcean App Platform

**Why DigitalOcean:**
- Simple deployment
- Good pricing
- Easy scaling

**Steps:**
1. Connect GitHub repository
2. Configure build settings
3. Deploy

**Cost:** Starting at $5/month

---

## 📊 Bundle Size Optimization

### Current Optimizations Applied:
- ✅ Code splitting with manual chunks
- ✅ Vendor libraries separated
- ✅ UI components chunked
- ✅ Chart libraries separated

### Additional Optimizations:
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for unused dependencies
npx depcheck
```

## 🔧 Environment Variables

Create these files for production:

**`.env.production`** (for Landing page):
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DASHBOARD_URL=https://yourdomain.com/dashboard
```

**`.env.production`** (for Dashboard):
```
VITE_APP_URL=https://yourdomain.com
VITE_API_URL=https://yourdomain.com/api
```

## 🚀 Quick Deploy Commands

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=Landing-page/out
```

## 📈 Performance Monitoring

### Recommended Tools:
- **Vercel Analytics** (if using Vercel)
- **Google Analytics**
- **Sentry** (error tracking)
- **Lighthouse** (performance audits)

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use environment variables
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure properly for API calls

## 📱 Mobile Optimization

- ✅ Responsive design already implemented
- ✅ Touch-friendly interfaces
- ✅ Fast loading on mobile networks

## 🎯 SEO Optimization

- ✅ Meta tags configured
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap generation (add if needed)

## 🆘 Troubleshooting

### Common Issues:

1. **404 on /dashboard routes**
   - Check if `vercel.json` or `netlify.toml` is configured correctly
   - Ensure build output is in correct directory

2. **Assets not loading**
   - Check `base` path in `vite.config.ts`
   - Verify asset paths in production

3. **API calls failing**
   - Check CORS configuration
   - Verify environment variables

## 📞 Support

If you encounter issues:
1. Check the build logs
2. Verify environment variables
3. Test locally with production build
4. Check browser console for errors

---

## 🎉 You're Ready to Deploy!

Choose your preferred platform and follow the steps above. Vercel is recommended for the easiest setup and best performance.
