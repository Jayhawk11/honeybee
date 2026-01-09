const photoUrls = require('./photo-urls.json');

console.log('Starting download of', photoUrls.length, 'photos...');

// Download photos using browser
async function downloadPhotos(page) {
  const results = [];
  
  for (let i = 0; i < photoUrls.length; i++) {
    const photo = photoUrls[i];
    console.log(\`[${i+1}/${photoUrls.length}] Downloading photo ${photo.id}...\`);
    
    try {
      // Navigate to photo page
      await page.goto(photo.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for image to load
      await page.waitForTimeout(2000);
      
      // Extract the image as base64
      const imageData = await page.evaluate(() => {
        const img = document.querySelector('img[src*=\"fbcdn\"]:not([src*=\"profile\"]):not([src*=\"avatar\"])');
        if (img) {
          // Create a canvas and convert to base64
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          return {
            base64: canvas.toDataURL('image/jpeg', 0.9),
            width: img.naturalWidth,
            height: img.naturalHeight
          };
        }
        return null;
      });
      
      if (imageData) {
        results.push({
          id: photo.id,
          success: true,
          width: imageData.width,
          height: imageData.height,
          base64Length: imageData.base64.length
        });
        
        // Save to file
        const buffer = Buffer.from(imageData.base64.split(',')[1], 'base64');
        const filename = \`photo-\${String(photoUrls.indexOf(photo) + 1).padStart(3, '0')}.jpg\`;
        fs.writeFileSync(\`public/images/facebook/\${filename}\`, buffer);
        console.log(\`   ✅ Saved as \${filename} (\${imageData.width}x\${imageData.height})\`);
      } else {
        results.push({ id: photo.id, success: false, error: 'Could not extract image' });
        console.log(\`   ❌ Failed: Could not extract image\`);
      }
    } catch (error) {
      results.push({ id: photo.id, success: false, error: error.message });
      console.log(\`   ❌ Failed: \${error.message}\`);
    }
  }
  
  return results;
}

// Export function
module.exports = { downloadPhotos };
