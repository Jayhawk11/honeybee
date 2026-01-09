/**
 * Download Facebook photos from collected URLs
 * Uses Playwright to download through logged-in browser session
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'facebook');
const MANIFEST_FILE = path.join(__dirname, '..', 'public', 'data', 'photos-manifest.json');
const URLS_FILE = path.join(__dirname, '..', 'facebook-photos.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadPhotos() {
  console.log('🐝 Starting Facebook photo download...\n');

  // Read collected URLs
  let photoUrls = [];
  if (fs.existsSync(URLS_FILE)) {
    photoUrls = JSON.parse(fs.readFileSync(URLS_FILE, 'utf8'));
    console.log(`📄 Found ${photoUrls.length} URLs in ${URLS_FILE}`);
  } else {
    console.error('❌ facebook-photos.json not found!');
    console.error('   Please collect URLs first via Playwright');
    process.exit(1);
  }

  // Connect to browser with logged-in session
  let browser;
  try {
    console.log('🔗 Connecting to browser with logged-in session...');
    browser = await chromium.connectOverCDP('http://localhost:9222');
    const context = browser.contexts()[0];
    console.log('✅ Connected\n');

    // Download photos
    console.log('📥 Downloading photos through browser session...\n');

    const manifest = {
      extractedAt: new Date().toISOString(),
      source: 'https://www.facebook.com/profile.php?id=61559277947065&sk=photos',
      totalPhotos: photoUrls.length,
      photos: []
    };

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < photoUrls.length; i++) {
      const photo = photoUrls[i];
      const filename = `photo-${String(i + 1).padStart(3, '0')}.jpg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      console.log(`[${i + 1}/${photoUrls.length}] ${photo.description ? photo.description.substring(0, 50) : 'No description'}...`);

      try {
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
            width: photo.width || 0,
            height: photo.height || 0,
            downloadedAt: new Date().toISOString()
          });
        } else {
          errorCount++;
          console.log(`  ❌ HTTP ${response.status()}`);
          manifest.photos.push({
            id: i + 1,
            filename: null,
            url: photo.url,
            description: photo.description || '',
            width: photo.width || 0,
            height: photo.height || 0,
            error: `HTTP ${response.status()}`,
            downloadedAt: null
          });
        }
      } catch (err) {
        errorCount++;
        console.log(`  ❌ Error: ${err.message}`);
        manifest.photos.push({
          id: i + 1,
          filename: null,
          url: photo.url,
          description: photo.description || '',
          width: photo.width || 0,
          height: photo.height || 0,
          error: err.message,
          downloadedAt: null
        });
      }
    }

    // Save manifest
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`\n📄 Manifest saved to: ${MANIFEST_FILE}`);

    console.log(`\n📊 Summary:`);
    console.log(`   Total photos: ${photoUrls.length}`);
    console.log(`   Successfully downloaded: ${successCount}`);
    console.log(`   Failed: ${errorCount}`);
    console.log(`   Output directory: ${OUTPUT_DIR}\n`);

    console.log('✅ Download complete!\n');

    // Don't close browser
    console.log('📌 Browser remains open for your use.\n');

    return manifest;

  } catch (error) {
    console.error('❌ Error during download:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  downloadPhotos().catch(console.error);
}

module.exports = { downloadPhotos };
