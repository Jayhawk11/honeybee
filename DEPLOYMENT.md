# HBCS Website - Netlify Deployment Guide

Your HBCS website is ready for Netlify deployment!

## ✅ What's Already Configured

- ✅ GitHub repository: https://github.com/Jayhawk11/honeybee
- ✅ Netlify configuration: `netlify.toml` (build command, publish directory, security headers)
- ✅ Next.js build configured: `npm run build`
- ✅ Output directory: `.next`
- ✅ Node version: 18

## 🚀 How to Deploy on Netlify

### Option 1: Quick Deploy via Netlify Dashboard (Easiest)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import from existing project"
3. Select GitHub and authorize Netlify
4. Choose the repository: `Jayhawk11/honeybee`
5. Configure build settings (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18
6. Click "Deploy site"
7. Wait for build to complete (~2-3 minutes)

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Follow the prompts:
# - Choose "Create and configure a new site"
# - Team: (your team)
# - Site name: (leave default or choose custom)
# - Build command: npm run build
# - Publish directory: .next

# Deploy
netlify deploy --prod
```

### Option 3: Connect via GitHub Integration

1. Go to https://app.netlify.com
2. Click "Sites" → "Add new site"
3. Select "Import from GitHub"
4. Authorize Netlify to access your GitHub
5. Select `Jayhawk11/honeybee` repository
6. Netlify will auto-detect your `netlify.toml` configuration
7. Click "Deploy site"

## 📁 Project Structure

```
honeybee/
├── app/                 # Next.js app directory
│   ├── page.tsx       # Home page
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/         # React components
│   ├── Header.tsx     # Navigation header
│   ├── Hero.tsx       # Hero section
│   ├── Services.tsx    # Services section
│   ├── About.tsx       # About section
│   ├── Testimonials.tsx # Testimonials carousel
│   ├── Locations.tsx   # Locations with map
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer
│   └── Map.tsx        # Leaflet map component
├── contexts/          # React contexts
│   └── ThemeContext.tsx # Theme provider
├── lib/              # Utility functions
├── public/            # Static assets
├── netlify.toml      # Netlify configuration
├── package.json       # Dependencies
└── next.config.js     # Next.js config
```

## 🔧 Build Settings (Already Configured)

Your `netlify.toml` includes:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

## 🔒 Security Headers

Netlify will automatically apply these security headers:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 🌐 Your Site URL

Once deployed, your site will be available at:
- Default: `https://[your-site-name].netlify.app`
- Custom domain: Configure in Netlify dashboard

## 🔄 Automatic Deploys

After initial setup, Netlify will:
- Auto-deploy on every push to `main` branch
- Build preview deployments on pull requests
- Show build status in your GitHub PRs

## 🐛 Troubleshooting

### Build Fails
- Check Netlify build logs for errors
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first to verify

### Images Not Loading
- Check remote patterns in `next.config.js`
- Ensure image domains are in configuration
- Verify image URLs are accessible

### Map Not Displaying
- Check if `leaflet` CSS is loaded
- Verify map container has explicit height
- Check browser console for errors

### 404 Errors
- Ensure `netlify.toml` has correct publish directory (`.next`)
- Check that all pages have proper exports

## 📝 Notes

- The site is fully functional and ready for production
- All navigation links work correctly with smooth scrolling
- Theme toggle works (light/dark mode)
- Contact form is ready (add your backend API)
- Map component displays location placeholders
- All sections are responsive for mobile devices

## ✨ Next Steps

1. Connect GitHub repo to Netlify
2. Deploy to Netlify
3. Add custom domain (optional)
4. Set up environment variables if needed (API keys, etc.)
5. Test all functionality in production
