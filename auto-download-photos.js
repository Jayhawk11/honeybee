const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'facebook');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// All 23 photo URLs
const photoUrls = [
  'https://www.facebook.com/photo.php?fbid=122204174174309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204174126309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204174072309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204174036309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173994309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173940309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173874309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173838309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173724309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173694309264&set=pb.61559277947065.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=122204173604309264&set=pb.61559277947065.-2207520000&type=3'
];

console.log('Starting automated download of', photoUrls.length, 'photos...');
console.log('Output directory:', OUTPUT_DIR);

async function downloadPhotos() {
  // Launch browser with existing context (to preserve login)
  const browser = await chromium.launch({
    headless: false, // Need to see browser for login
    channel: 'chrome'
  });
  
  // Create new context (will use existing cookies if needed)
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < photoUrls.length; i++) {
    const url = photoUrls[i];
    const filename = `photo-${String(i + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    console.log(`[${i + 1}/${photoUrls.length}] Downloading ${filename}...`);
    
    try {
      // Navigate to photo page
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for image to load
      await page.waitForTimeout(3000);
      
      // Find the image element and screenshot it
      const imgElement = await page.$('img[src*="fbcdn"]:not([src*="profile"]):not([src*="avatar"])');
      
      if (imgElement) {
        // Screenshot the image
        await imgElement.screenshot({ 
          path: filepath,
          type: 'jpeg',
          quality: 90
        });
        
        successCount++;
        console.log(`   ✅ Saved: ${filename}`);
      } else {
        throw new Error('Could not find image element');
      }
    } catch (error) {
      failCount++;
      console.log(`   ❌ Failed: ${error.message}`);
    }
    
    // Small delay between downloads
    await page.waitForTimeout(1000);
  }
  
  await browser.close();
  
  console.log('\n=== RESULTS ===');
  console.log(`Total: ${photoUrls.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

downloadPhotos().catch(console.error);
