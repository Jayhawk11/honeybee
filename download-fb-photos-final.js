#!/usr/bin/env node

/**
 * Download Facebook photos in batches
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'facebook');
const MANIFEST_FILE = path.join(__dirname, 'public', 'data', 'photos-manifest.json');
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61559277947065&sk=photos';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadPhotos() {
  console.log('🐝 Starting Facebook photo download...\n');

  let browser;
  try {
    console.log('🔗 Connecting to browser (localhost:9222)...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];

    const pages = context.pages();
    const page = pages.length > 0 ? pages[0] : await context.newPage();

    console.log('📍 Navigating to photos page...');
    await page.goto('https://www.facebook.com/profile.php?id=61559277947065&sk=photos', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    console.log('✅ Page loaded\n');

    // Collect all photo URLs
    console.log('=== STEP 1: Collecting Photo URLs ===\n');
    let allPhotos = new Map();
    let scrollAttempts = 0;
    const MAX_ATTEMPTS = 30;
    let previousCount = 0;

    do {
      const photos = await page.evaluate(() => {
        const photos = [];
        const imgElements = document.querySelectorAll('img[src*="fbcdn"]');

        imgElements.forEach((img) => {
          const src = img.src || img.getAttribute('src');
          const alt = img.alt || img.getAttribute('alt') || '';
          const width = img.naturalWidth || 0;
          const height = img.naturalHeight || 0;

          if (src &&
              !src.includes('profile') &&
              !src.includes('avatar') &&
              !src.includes('button') &&
              !src.includes('rsrc') &&
              width > 50) {
            photos.push({ url: src, description: alt, width, height });
          }
        });

        return photos;
      });

      let newCount = 0;
      photos.forEach((photo) => {
        const baseUrl = photo.url.split('?')[0];
        if (!allPhotos.has(baseUrl)) {
          allPhotos.set(baseUrl, { ...photo, id: allPhotos.size + 1 });
          newCount++;
        }
      });

      console.log(`   Scroll ${scrollAttempts + 1}: ${newCount} new, ${allPhotos.size} total unique`);

      previousCount = allPhotos.size;

      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight * 4);
      });

      await page.waitForTimeout(2500);
      scrollAttempts++;

    } while (scrollAttempts < MAX_ATTEMPTS && allPhotos.size > previousCount);

    console.log(`\n✅ Collected ${allPhotos.size} unique photos\n`);

    const photosArray = Array.from(allPhotos.values()).sort((a, b) => a.id - b.id);

    // Download photos one by one
    console.log('=== STEP 2: Downloading Photos ===\n');

    const manifest = {
      extractedAt: new Date().toISOString(),
      source: FACEBOOK_URL,
      totalPhotos: photosArray.length,
      photos: []
    };

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < photosArray.length; i++) {
      const photo = photosArray[i];
      const filename = `photo-${String(i + 1).padStart(3, '0')}.jpg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      console.log(`   [${i + 1}/${photosArray.length}] ${photo.description ? photo.description.substring(0, 50) : 'No description'}...`);

      try {
        // Download through browser context
        const response = await context.request.get(photo.url);

        if (response.ok()) {
          const buffer = await response.body();
          fs.writeFileSync(filepath, buffer);
          successCount++;

          manifest.photos.push({
            id: i + 1,
            filename: filename,
            url: photo.url,
            description: photo.description || '',
            width: photo.width,
            height: photo.height,
            downloadedAt: new Date().toISOString(),
            size: buffer.length
          });

          console.log(`      ✓ Downloaded (${buffer.length} bytes)`);
        } else {
          errorCount++;
          console.log(`      ✗ Failed: HTTP ${response.status()}`);
          manifest.photos.push({
            id: i + 1,
            filename: null,
            url: photo.url,
            description: photo.description || '',
            width: photo.width,
            height: photo.height,
            error: `HTTP ${response.status()}`,
            downloadedAt: null
          });
        }
      } catch (err) {
        errorCount++;
        console.log(`      ✗ Failed: ${err.message}`);
        manifest.photos.push({
          id: i + 1,
          filename: null,
          url: photo.url,
          description: photo.description || '',
          width: photo.width,
          height: photo.height,
          error: err.message,
          downloadedAt: null
        });
      }

      // Save manifest after each photo (in case of interruption)
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
      }
    }

    // Save final manifest
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

    console.log(`\n📄 Manifest saved to: ${MANIFEST_FILE}`);

    console.log(`\n=== SUMMARY ===`);
    console.log(`   Total photos: ${photosArray.length}`);
    console.log(`   Successfully downloaded: ${successCount}`);
    console.log(`   Failed: ${errorCount}`);
    console.log(`   Output: ${OUTPUT_DIR}\n`);

    console.log('✅ Download complete!\n');

    // Don't close browser
    console.log('📌 Browser remains open.\n');

  } catch (error) {
    console.error('❌ Error:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

downloadPhotos().catch(console.error);
