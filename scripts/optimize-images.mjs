import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const images = fs.readdirSync(publicDir).filter(f => 
  /\.(png|jpg|jpeg|webp)$/i.test(f) && 
  !['favicon.svg', 'icons.svg'].includes(f)
);

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputPath = path.join(publicDir, filename);
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size / 1024;
  
  try {
    await sharp(inputPath)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .png({ compressionLevel: 9, quality: 80 })
      .webp({ quality: 80 })
      .toFile(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    
    const newStats = fs.statSync(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    const newSize = newStats.size / 1024;
    console.log(`${filename}: ${originalSize.toFixed(0)}KB → ${newSize.toFixed(0)}KB (${((1-newSize/originalSize)*100).toFixed(0)}% reduction)`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

async function main() {
  console.log('Optimizing images...\n');
  await Promise.all(images.map(optimizeImage));
  console.log('\nDone!');
}

main();
