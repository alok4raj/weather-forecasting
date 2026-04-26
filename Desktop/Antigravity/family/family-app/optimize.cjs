const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

(async () => {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    // If larger than 500kb, optimize it
    if (stats.size > 500000) {
      console.log(`Optimizing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
      const tempPath = filePath + '.tmp';
      
      try {
        await sharp(filePath)
          .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 75, progressive: true }) // Progressive JPEGs load much faster on mobile
          .toFile(tempPath);
          
        fs.renameSync(tempPath, filePath);
        
        const newStats = fs.statSync(filePath);
        console.log(`  -> Reduced to ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
      } catch (err) {
        console.error(`  -> Failed to optimize ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
  console.log('All photos optimized successfully!');
})();
