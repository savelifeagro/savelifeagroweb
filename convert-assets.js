import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function convertAssets() {
  const publicDir = path.join(process.cwd(), 'public');
  
  const filesToConvert = [
    { in: 'before.png', out: 'before.webp' },
    { in: 'after.jpeg', out: 'after.webp' },
    { in: path.join('images', '27.jpeg'), out: 'cytokinin.webp' },
    { in: path.join('images', '31.jpeg'), out: 'potash.webp' }
  ];

  for (const file of filesToConvert) {
    const inputPath = path.join(process.cwd(), file.in);
    const outputPath = path.join(publicDir, file.out);
    
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${file.in} to ${file.out}`);
    } else {
      console.error(`Missing file: ${inputPath}`);
    }
  }
}

convertAssets().catch(console.error);
