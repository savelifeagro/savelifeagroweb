import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function convertAssets() {
  const publicDir = path.join(process.cwd(), 'public');
  
  const filesToConvert = [
    { in: path.join('images', '13.jpeg'), out: 'story1.webp' },
    { in: path.join('images', '2.jpeg'), out: 'region1.webp' },
    { in: path.join('images', '26.jpeg'), out: 'region2.webp' },
    { in: path.join('images', '1.jpeg'), out: 'success1.webp' },
    { in: path.join('images', '27.jpeg'), out: 'success2.webp' },
    { in: path.join('images', '30.jpeg'), out: 'success3.webp' },
    { in: path.join('images', '31.jpeg'), out: 'success4.webp' },
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
