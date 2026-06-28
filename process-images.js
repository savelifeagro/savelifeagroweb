import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'images');
const outputDir = path.join(process.cwd(), 'public', 'gallery');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  const galleryData = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const outputFileName = `result-${i + 1}.webp`;
    const outputPath = path.join(outputDir, outputFileName);
    
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    console.log(`Converted ${file} -> ${outputFileName}`);
    galleryData.push({
      url: `/gallery/${outputFileName}`,
      caption: 'Real Results from the Field',
      createdAt: new Date().toISOString()
    });
  }
  
  fs.writeFileSync(path.join(process.cwd(), 'gallery-seed.json'), JSON.stringify(galleryData, null, 2));
  console.log('Done! Seed data written to gallery-seed.json');
}

processImages().catch(console.error);
