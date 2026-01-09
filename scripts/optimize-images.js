#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [640, 750, 828, 1080, 1200, 1920];
const QUALITY = 80;
const WEBP_QUALITY = 75;

// Images to optimize
const IMAGES_TO_OPTIMIZE = [
  {
    input: 'public/assets/kc-police-station.jpg',
    outputDir: 'public/assets',
    name: 'kc-police-station'
  },
  {
    input: 'public/assets/union-station.jpg',
    outputDir: 'public/assets',
    name: 'union-station'
  },
  {
    input: 'public/assets/renaissance-festival.jpg',
    outputDir: 'public/assets',
    name: 'renaissance-festival'
  },
  {
    input: 'public/images/logo-icon.png',
    outputDir: 'public/images',
    name: 'logo-icon'
  }
];

async function optimizeImage(image) {
  console.log(`\n🔧 Optimizing: ${image.name}`);
  const { input, outputDir, name } = image;

  try {
    // Get image metadata
    const metadata = await sharp(input).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${Math.round(fs.statSync(input).size / 1024)}KB`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // For PNG (logo-icon.png), convert to optimized PNG first
    if (input.endsWith('.png')) {
      const optimizedPng = path.join(outputDir, `${name}-optimized.png`);

      await sharp(input)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedPng);

      const newSize = Math.round(fs.statSync(optimizedPng).size / 1024);
      console.log(`   Optimized PNG: ${newSize}KB`);
      console.log(`   ⚠️  Rename ${path.basename(optimizedPng)} to ${name}.png manually to replace`);
    }

    // Create WebP variant (fallback for modern browsers)
    const webpOutput = path.join(outputDir, `${name}.webp`);

    await sharp(input)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOutput);

    const webpSize = Math.round(fs.statSync(webpOutput).size / 1024);
    console.log(`   WebP version: ${webpSize}KB`);

    // Create responsive variants for JPEGs
    if (input.match(/\.(jpg|jpeg)$/i)) {
      for (const size of SIZES) {
        // Only create sizes smaller than or equal to original
        if (size > metadata.width) continue;

        const width = size;
        const height = Math.round((size / metadata.width) * metadata.height);

        const outputName = `${name}-${width}.webp`;
        const outputPath = path.join(outputDir, outputName);

        await sharp(input)
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(outputPath);

        const variantSize = Math.round(fs.statSync(outputPath).size / 1024);
        console.log(`   Variant ${width}px: ${variantSize}KB`);
      }
    }

    console.log(`   ✅ ${image.name} optimized successfully!`);

  } catch (error) {
    console.error(`   ❌ Error optimizing ${image.name}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  for (const image of IMAGES_TO_OPTIMIZE) {
    if (fs.existsSync(image.input)) {
      await optimizeImage(image);
    } else {
      console.log(`⚠️  File not found: ${image.input}`);
    }
  }

  console.log('\n✨ Optimization complete!');
}

main().catch(console.error);
