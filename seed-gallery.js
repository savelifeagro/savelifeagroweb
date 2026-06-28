import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedGallery() {
  const data = JSON.parse(fs.readFileSync('gallery-seed.json', 'utf-8'));
  const galleryRef = collection(db, 'gallery');

  console.log(`Seeding ${data.length} images to Firebase...`);
  for (const item of data) {
    await addDoc(galleryRef, item);
    console.log(`Added: ${item.url}`);
  }
  console.log('Finished seeding gallery collection.');
  process.exit(0);
}

seedGallery().catch(console.error);
