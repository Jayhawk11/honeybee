#!/usr/bin/env node

const sharp = require('sharp');

async function optimizeLogo() {
  console.log('🔧 Optimizing logo-icon.png...');

  try {
    // Get original size
    const metadata = await sharp('public/images/logo-icon.png').metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height}, 843KB`);

    // Create smaller versions
    const sizes = [64, 128, 256, 512];

    for (const size of sizes) {
      await sharp('public/images/logo-icon.png')
        .resize(size, size, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(`public/images/logo-icon-${size}.png`);

      const fileSize = require('fs').statSync(`public/images/logo-icon-${size}.png`).size;
      console.log(`   ${size}px: ${Math.round(fileSize / 1024)}KB`);
    }

    console.log('✅ Logo optimization complete!');
    console.log('\n⚠️  Update data/services.ts to use logo-icon-64.png for icon (only 4KB)');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

optimizeLogo();
