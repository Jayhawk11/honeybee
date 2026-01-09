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

// Helper to save base64 to file
function saveBase64File(base64Data, filepath) {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filepath, buffer);
  return buffer.length;
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

    // Download photos in batches of 20
    console.log('=== STEP 2: Downloading Photos ===\n');

    const BATCH_SIZE = 20;
    let manifest = {
      extractedAt: new Date().toISOString(),
      source: FACEBOOK_URL,
      totalPhotos: photosArray.length,
      photos: []
    };

    let successCount = 0;
    let errorCount = 0;

    for (let batchStart = 0; batchStart < photosArray.length; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE, photosArray.length);
      console.log(`\n📥 Downloading batch ${batchStart + 1}-${batchEnd}/${photosArray.length}...`);

      const batch = photosArray.slice(batchStart, batchEnd);

      // Download this batch
      const batchResults = await page.evaluate(async (photoUrls, context) => {
        // This runs in browser context - we can't use Node.js APIs here
        // We'll need to download one by one
        const results = [];

        for (let i = 0; i < photoUrls.length; i++) {
          const photo = photoUrls[i];
          const url = photo.url;

          try {
            const response = await fetch(url);
            if (response.ok) {
              const buffer = await response.arrayBuffer();
              const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
              results.push({
                id: photo.id,
                url: url,
                base64: base64,
                success: true,
                size: buffer.byteLength
              });
            } else {
              results.push({
                id: photo.id,
                url: url,
                success: false,
                error: `HTTP ${response.status}`
              });
            }
          } catch (err) {
            results.push({
              id: photo.id,
              url: url,
              success: false,
              error: err.message
            });
          }
        }

        return results;
      }, batch);

      // Save photos from this batch
      for (const result of batchResults) {
        const filename = `photo-${String(result.id).padStart(3, '0')}.jpg`;
        const filepath = path.join(OUTPUT_DIR, filename);

        if (result.success && result.base64) {
          try {
            const size = saveBase64File(result.base64, filepath);
            successCount++;

            // Find original photo data
            const original = photosArray.find(p => p.id === result.id);

            manifest.photos.push({
              id: result.id,
              filename: filename,
              url: result.url,
              description: original ? original.description : '',
              width: original ? original.width : 0,
              height: original ? original.height : 0,
              downloadedAt: new Date().toISOString(),
              size: size
            });

            console.log(`      ✓ Saved ${filename} (${size} bytes)`);
          } catch (err) {
            errorCount++;
            console.log(`      ✗ Failed to save ${filename}: ${err.message}`);
          }
        } else {
          errorCount++;
          console.log(`      ✗ Failed to download photo ${result.id}: ${result.error}`);
        }
      }

      // Update manifest after each batch
      fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    }

    console.log(`\n=== COMPLETE ===`);
    console.log(`   Total photos: ${photosArray.length}`);
    console.log(`   Successfully downloaded: ${successCount}`);
    console.log(`   Failed: ${errorCount}`);
    console.log(`   Output: ${OUTPUT_DIR}`);
    console.log(`   Manifest: ${MANIFEST_FILE}\n`);

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
