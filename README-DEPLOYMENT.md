# Local Deployment Guide

This guide covers all methods for running the HBCS website locally.

---

## 🚀 Quick Start

### Option 1: Development Mode (Recommended for Development)

**For Hot Reload & Fast Refresh:**

```bash
npm run dev
```

**URL:** http://localhost:3000

**Features:**
- ✅ Hot reload - changes appear instantly
- ✅ Fast refresh - component state preserved
- ✅ Error overlay - detailed error messages
- ✅ Fast startup
- ✅ HMR (Hot Module Replacement)

**Use this for:**
- Developing new features
- Fixing bugs
- Testing changes quickly
- Active development work

---

### Option 2: Safe Development Mode (Automatic Port Management)

**For Automatic Port Cleanup:**

```bash
npm run dev:safe
```

**URL:** http://localhost:3000

**Features:**
- ✅ Automatically kills existing processes on port 3000
- ✅ Waits for cleanup to complete
- ✅ Starts fresh development server
- ✅ All dev mode features (hot reload, fast refresh)

**Use this for:**
- Port conflicts
- Stale servers
- Reliable startup

---

### Option 3: Clean Development Mode

**For Fresh Start:**

```bash
npm run dev:clean
```

**URL:** http://localhost:3000

**Features:**
- ✅ Removes `.next` build cache
- ✅ Clean build environment
- ✅ All dev mode features

**Use this for:**
- Build errors that won't go away
- Corrupted cache
- Fresh development environment

---

### Option 4: Static Production Preview

**For Testing Production Build:**

```bash
# Build the project
npm run build

# Preview static build
npm run preview:static
```

**URL:** http://localhost:3001

**Features:**
- ✅ Production-optimized build
- ✅ Static HTML/CSS/JS
- ✅ Optimized images (WebP, responsive)
- ✅ Minified assets
- ✅ Production bundle size

**Use this for:**
- Testing production build locally
- Verifying build works
- Performance testing
- Pre-deployment validation

**Note:** Static export has limitations:
- No server-side features
- No API routes
- No Next.js Image Optimization (use pre-optimized images)
- Requires external server (uses `serve` package)

---

## 🔧 Troubleshooting

### Issue: Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Solution 1: Use Safe Mode**
```bash
npm run dev:safe
```

**Solution 2: Kill Manually (Windows)**
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill //PID <PID> //F
```

**Solution 3: Use Different Port**
```bash
PORT=3002 npm run dev
```

---

### Issue: Build Fails or Errors

**Symptoms:**
- Build errors
- Module not found
- TypeScript errors

**Solutions:**

**Solution 1: Clean Build**
```bash
npm run dev:clean
```

**Solution 2: Clear Node Modules**
```bash
# Delete node_modules
rm -rf node_modules

# Reinstall dependencies
npm install
```

**Solution 3: Clear Next.js Cache**
```bash
# Windows
rd /s /q .next

# Linux/Mac
rm -rf .next

# Then rebuild
npm run dev
```

---

### Issue: Changes Not Reflecting

**Symptoms:**
- Changed code but no update in browser
- Need to refresh manually

**Causes & Solutions:**

**Cause 1: In Static Preview Mode**
- Static builds don't hot reload
- Need to rebuild for changes

**Solution:**
```bash
# Stop using static preview, use dev mode
npm run dev
```

**Cause 2: Browser Cache**
- Old JavaScript cached

**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Open in incognito/private mode

---

### Issue: Static Export Not Loading

**Symptoms:**
- `npm run preview:static` starts but blank page
- 404 errors
- CORS errors

**Solutions:**

**Solution 1: Verify Build Exists**
```bash
# Check if out/ folder exists
ls out/

# Should see: index.html, 404.html, static/, etc.
```

**Solution 2: Rebuild**
```bash
# Clean and rebuild
npm run dev:clean
npm run build
npm run preview:static
```

**Solution 3: Check Console for Errors**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

---

### Issue: Next.js Not Found or Command Not Found

**Symptoms:**
```
'next' is not recognized as an internal or external command
npm ERR! code ENOENT
```

**Solutions:**

**Solution 1: Install Dependencies**
```bash
npm install
```

**Solution 2: Check Node.js Version**
```bash
# Verify Node.js is installed
node --version

# Should be Node 18+ for Next.js 16
# Recommended: Node 20 LTS
```

**Solution 3: Use npx**
```bash
npx next dev
npx next build
npx next start
```

---

## 📊 Build vs Development Mode

| Feature | Development Mode | Static Preview |
|---------|------------------|----------------|
| Hot Reload | ✅ Yes | ❌ No |
| Fast Refresh | ✅ Yes | ❌ No |
| Server-Side Features | ✅ Yes | ❌ No |
| Image Optimization | ✅ Yes | ❌ No |
| API Routes | ✅ Yes | ❌ No |
| Production Build | ❌ No | ✅ Yes |
| Optimized Bundle | ❌ No | ✅ Yes |
| Static HTML | ❌ No | ✅ Yes |
| Development Speed | ⚡ Fast | 🐢 Slower (build time) |

---

## 🎯 Recommended Workflow

### For Active Development
```bash
# Use development mode
npm run dev
```

**Why:** Fast feedback, hot reload, instant updates

### Before Deployment
```bash
# Test production build
npm run build
npm run preview:static
```

**Why:** Verify production build works before deploying

### After Deployment
```bash
# Clean development environment
npm run dev:clean
```

**Why:** Fresh environment prevents stale cache issues

---

## 📁 Project Structure

```
honeybee/
├── out/              # Static export (npm run build)
├── .next/            # Development build cache
├── app/              # Next.js app directory
├── components/        # React components
├── public/           # Static assets
├── scripts/          # Utility scripts
│   └── start-dev.bat # Windows server manager
├── package.json       # Dependencies and scripts
├── next.config.ts    # Next.js configuration
└── tsconfig.json     # TypeScript configuration
```

---

## 🌐 Accessing Your Site

### Development Mode
- **URL:** http://localhost:3000
- **Network URL:** http://192.168.x.x:3000 (for mobile testing)
- **Hot Reload:** Enabled automatically

### Static Preview
- **URL:** http://localhost:3001
- **Network URL:** Same as above but port 3001
- **Hot Reload:** Disabled (requires rebuild)

---

## 🔍 Debugging Tips

### Enable Verbose Logging
```bash
# Set debug environment variable
DEBUG=* npm run dev
```

### Check Build Output
```bash
# Build with detailed output
npm run build -- --debug
```

### Use Source Maps
- Next.js includes source maps in development
- Set breakpoints in browser DevTools
- Debug TypeScript directly in browser

---

## 📝 Environment Variables

Create `.env.local` for local development:

```env
# Server port (default: 3000)
PORT=3000

# Disable Next.js telemetry (optional)
NEXT_TELEMETRY_DISABLED=1

# Enable debug logging (optional)
DEBUG=*

# Development mode (default: development)
NODE_ENV=development
```

**Note:** `.env.local` is ignored by Git - safe for secrets!

---

## ✅ Verification Checklist

After starting any deployment mode, verify:

- [ ] Server starts without errors
- [ ] Page loads in browser
- [ ] All navigation works
- [ ] Images display correctly
- [ ] Forms can be submitted
- [ ] Mobile responsive works
- [ ] Console has no errors
- [ ] Hot reload works (dev mode only)
- [ ] Performance optimizations visible

---

## 🆘 Getting Help

If you encounter issues not covered here:

1. **Check Next.js Docs:** https://nextjs.org/docs
2. **Check Build Logs:** Look for errors in terminal
3. **Check Browser Console:** Open DevTools (F12)
4. **Check Known Issues:** Review this guide's troubleshooting section
5. **Try Clean Start:** `npm run dev:clean`

---

## 🎉 Success Criteria

Your local deployment is working when:

✅ Server starts without errors
✅ Homepage loads at localhost URL
✅ Navigation works between all pages
✅ Images display correctly
✅ Forms are functional
✅ No console errors
✅ Hot reload works (dev mode)
✅ Responsive design works on mobile
✅ Performance optimizations are visible

---

**Last Updated:** January 10, 2026
