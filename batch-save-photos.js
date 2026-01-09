#!/usr/bin/env node

/**
 * Batch download Facebook photos
 * Downloads in small batches to avoid timeouts
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'facebook');
const MANIFEST_FILE = path.join(__dirname, 'public', 'data', 'photos-manifest.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize manifest
let manifest = {
  extractedAt: new Date().toISOString(),
  source: 'https://www.facebook.com/profile.php?id=61559277947065&sk=photos',
  totalPhotos: 0,
  photos: []
};

if (fs.existsSync(MANIFEST_FILE)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
}

console.log('📥 Batch Download Script\n');
console.log(`Current manifest has ${manifest.photos.length} photos\n`);

// Function to save base64 image
function saveBase64Image(base64Data, filepath) {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filepath, buffer);
  return buffer.length;
}

// Process downloaded results from browser
const RESULTS_FILE = path.join(__dirname, 'browser-results.json');

if (fs.existsSync(RESULTS_FILE)) {
  const data = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  let savedCount = 0;

  console.log(`Processing ${data.results.length} downloaded photos...\n`);

  data.results.forEach((result) => {
    if (result.success && result.base64) {
      try {
        const filepath = path.join(OUTPUT_DIR, result.filename);
        const size = saveBase64Image(result.base64, filepath);

        // Check if photo already in manifest
        const existing = manifest.photos.find(p => p.id === result.id);
        if (!existing) {
          manifest.photos.push({
            id: result.id,
            filename: result.filename,
            url: result.url,
            description: result.description || '',
            width: result.width || 0,
            height: result.height || 0,
            downloadedAt: new Date().toISOString(),
            size: size
          });
        }

        savedCount++;
        console.log(`✓ Saved ${result.filename} (${size} bytes)`);

      } catch (err) {
        console.log(`✗ Failed to save ${result.filename}: ${err.message}`);
      }
    }
  });

  // Update total count
  manifest.totalPhotos = data.totalPhotos || manifest.photos.length;

  // Save updated manifest
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Saved ${savedCount} new photos`);
  console.log(`📄 Manifest updated: ${MANIFEST_FILE}`);
  console.log(`📊 Total photos in manifest: ${manifest.photos.length}\n`);

} else {
  console.log('❌ browser-results.json not found!');
  console.log('   Please download photos via Playwright browser first.');
}
