# 🚀 Deploying Skechify to Vercel

This guide will walk you through deploying your Skechify app to Vercel.

## Prerequisites

1. GitHub Account
2. Vercel Account (can be created with GitHub)
3. Google Gemini API Key

## Step-by-Step Deployment Guide

### 1. Prepare Your Repository

✅ Your code is already on GitHub at: https://github.com/Ktripathi2611/skechify

### 2. Set Up Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 3. Import Your Project

1. In Vercel Dashboard, click "Add New..."
2. Select "Project"
3. Find and select "skechify" from your GitHub repositories
4. Click "Import"

### 4. Configure Project Settings

1. Project Name: `skechify` (or choose your preferred name)
2. Framework Preset: `Create React App`
3. Root Directory: `./`
4. Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 5. Set Environment Variables

1. Expand "Environment Variables" section
2. Add the following variable:
   - NAME: `REACT_APP_GEMINI_API_KEY`
   - VALUE: `Enter your API key here`
   - Select all environments (Production, Preview, Development)
3. Click "Add"

### 6. Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once finished, you'll get a URL like: `https://skechify.vercel.app`

### 7. Verify Deployment

1. Visit your deployment URL
2. Test the following features:
   - Drawing functionality
   - Grid toggle
   - Color selection
   - Analysis feature

### 8. Custom Domain (Optional)

1. In your project dashboard, go to "Settings"
2. Click "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## Troubleshooting

### If Build Fails:

1. Check build logs for errors
2. Verify environment variables are set correctly
3. Ensure all dependencies are properly listed in package.json
4. Try a clean install:
   ```bash
   rm -rf node_modules
   npm install
   ```

### If API Doesn't Work:

1. Check Network tab in browser DevTools
2. Verify environment variable is accessible
3. Test API key directly in browser console

## Automatic Deployments

✨ Your project is set up for automatic deployments:
- Every push to `main` branch triggers a new deployment
- Preview deployments for pull requests
- Easy rollback to previous versions

## Monitoring

1. View deployment status in Vercel Dashboard
2. Check Analytics (if enabled)
3. Monitor build times and performance

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Create Issue: https://github.com/Ktripathi2611/skechify/issues
- Contact: [@Ktripathi2611](https://github.com/Ktripathi2611)

---

Remember to never commit sensitive information like API keys directly to your repository. Always use environment variables for secrets.
