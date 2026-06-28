import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as defaultProducts } from '../products';
import { db, auth } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AdminContext = createContext();

export const initialTestimonials = [
  {
    id: 1,
    name: "Ramesh Patil",
    location: "Verified Farmer • Ratnagiri, Maharashtra",
    quote: "Bud Jet has made a huge difference in my mango orchard. The flowering was uniform and the fruit formation was much better than previous seasons. Highly recommended!"
  },
  {
    id: 2,
    name: "Suresh Deshmukh",
    location: "Verified Farmer • Devgad, Maharashtra",
    quote: "After using Bud Jet, my Alphonso mango crop showed significantly more buds and stronger fruitset. The results speak for themselves every season."
  },
  {
    id: 3,
    name: "Vitthal Jadhav",
    location: "Verified Farmer • Sindhudurg, Maharashtra",
    quote: "I was struggling with potash deficiency for years. Bud Jet solved the problem in one season. Easy to apply and highly effective. Save Life Agro is a trusted brand."
  }
];

export const initialJournals = [
  {
    id: 'bud-break-science',
    category: 'agro-science',
    tag: 'CROP SCIENCE',
    title: 'The Physiology of Bud Break',
    summary: 'A deep dive into how Organic Cytokinin 5000 PPM triggers cell division and uniform flowering in Kesar and Alphonso mango crops.',
    body: 'In this investigation, we analyze the biological processes behind bud initiation. Flower bud differentiation is a crucial stage in mango cultivation. By applying organic cytokinin, we stimulate lateral bud development and cellular division. Combined with 10% potash, it reduces excess nitrogen, balancing plant vigor and promoting uniform flowering. Save Life Agro agronomists work with field data across Ratnagiri to refine application timing for maximum fruit setting.',
    image: '/macro_crop_leaves.png'
  },
  {
    id: 'soil-vitality-konkan',
    category: 'soil-vitality',
    tag: 'SOIL VITALITY',
    title: 'Restoring Soil Nutrients in the Mango Belt',
    summary: 'How potassium deficiency affects fruit size, weight, and color, and our methods to replenish soil vitality organically.',
    body: 'Mango crops draw heavy amounts of potassium during fruit development. In coastal soils like Ratnagiri and Devgad, high rainfall leaches away vital minerals. Potash application is critical to balance soil composition. Our Soil Energizer formula helps release locked nutrients, promoting healthy root structures that absorb trace elements. Farmers using organic soil conditioners report improved crop resistance to weather extremes and better soil water retention.',
    image: '/modern_farming.png'
  },
  {
    id: 'sangli-to-orchards',
    category: 'journey',
    tag: 'DISTRIBUTOR NETWORK',
    title: 'Connecting Sangli to Indian Mango Orchards',
    summary: 'How Save Life Agro grew from a local Sangli formulation laboratory to a trusted brand serving thousands of farmers.',
    body: 'Founded in Sangli, Maharashtra, Save Life Agro began with a simple mission: to provide high-efficacy organic agricultural products to local farmers. Today, our distributor network spans Maharashtra, Karnataka, Gujarat, and Goa. We coordinate directly with local dealers to ensure that fresh, lab-tested batches of Bud Jet reach farmers right before the bud differentiation season. This close-knit relationship ensures technical field support is always a phone call away.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'organic-horticulture',
    category: 'sustainability',
    tag: 'SUSTAINABILITY',
    title: 'Sustainable Farming: The Future of Horticulture',
    summary: 'Why organic farming formulations are key to preserving soil quality for future generations.',
    body: 'Over-application of chemical nitrogen fertilizers has led to soil acidification and decreased microbial activity in many orchards. At Save Life Agro, we advocate for organic alternatives. Our products trigger the plant\'s natural hormonal pathways without leaving harmful chemical residues. By adopting organic plant growth regulators like Bud Jet, farmers build long-term sustainability, ensuring their land remains fertile and productive for generations to come.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'potash-role-quality',
    category: 'agro-science',
    tag: 'NUTRIENT RESEARCH',
    title: 'The Vital Role of Potash in Fruit Quality',
    summary: 'Analyzing how potash aids in starch conversion and enzyme activation during the critical mango fruit setting phase.',
    body: 'Potassium (supplied as Potash) acts as an activator for dozens of essential enzymes within plant tissues. It regulates water loss by controlling the opening and closing of stomata, facilitates the transport of sugars and starches from leaves to developing fruit, and plays a major role in nitrogen utilization. When combined with organic Cytokinin, it guarantees that the uniform blossoms transition into heavy, sweet, and uniform mangoes.',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=80'
  }
];

export function AdminProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [journals, setJournals] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [announcement, setAnnouncement] = useState({ text: 'Welcome to Save Life Agro!', enabled: false });
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // Fetch Products
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (prods.length === 0) {
        defaultProducts.forEach(async (p) => { await setDoc(doc(db, 'products', p.id), p); });
        setProducts(defaultProducts);
      } else {
        setProducts(prods);
      }
    });
    return unsub;
  }, []);

  // Fetch Testimonials
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const tests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (tests.length === 0) {
        initialTestimonials.forEach(async (t) => { await setDoc(doc(db, 'testimonials', t.id.toString()), t); });
        setTestimonials(initialTestimonials);
      } else {
        setTestimonials(tests);
      }
    });
    return unsub;
  }, []);

  // Fetch Journals
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'journals'), (snapshot) => {
      const j = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (j.length === 0) {
        initialJournals.forEach(async (item) => { await setDoc(doc(db, 'journals', item.id), item); });
        setJournals(initialJournals);
      } else {
        setJournals(j);
      }
    });
    return unsub;
  }, []);

  // Fetch Gallery
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const g = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by newest first based on createdAt
      setGallery(g.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    });
    return unsub;
  }, []);

  // Fetch Inquiries
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const inqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by newest first
      setInquiries(inqs.sort((a, b) => b.createdAt - a.createdAt));
    });
    return unsub;
  }, []);

  // Fetch Announcement Settings
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'announcement'), (docSnap) => {
      if (docSnap.exists()) {
        setAnnouncement(docSnap.data());
      } else {
        setDoc(doc(db, 'settings', 'announcement'), announcement);
      }
    });
    return unsub;
  }, []);

  // ---- Product Mutators ----
  const addProduct = async (newProduct) => {
    await setDoc(doc(db, 'products', newProduct.id), newProduct);
  };
  const updateProduct = async (updatedProduct) => {
    await setDoc(doc(db, 'products', updatedProduct.id), updatedProduct);
  };
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
  };

  // ---- Testimonial Mutators ----
  const addTestimonial = async (newTestimonial) => {
    const id = Date.now().toString();
    await setDoc(doc(db, 'testimonials', id), { ...newTestimonial, id });
  };
  const updateTestimonial = async (updatedTestimonial) => {
    await setDoc(doc(db, 'testimonials', updatedTestimonial.id.toString()), updatedTestimonial);
  };
  const deleteTestimonial = async (id) => {
    await deleteDoc(doc(db, 'testimonials', id.toString()));
  };

  // ---- Journal Mutators ----
  const addJournal = async (newJournal) => {
    const id = Date.now().toString();
    await setDoc(doc(db, 'journals', id), { ...newJournal, id });
  };
  const updateJournal = async (updatedJournal) => {
    await setDoc(doc(db, 'journals', updatedJournal.id), updatedJournal);
  };
  const deleteJournal = async (id) => {
    await deleteDoc(doc(db, 'journals', id));
  };

  // ---- Gallery Mutators ----
  const addGalleryImage = async (newImage) => {
    const id = Date.now().toString();
    await setDoc(doc(db, 'gallery', id), { ...newImage, id, createdAt: new Date().toISOString() });
  };
  const updateGalleryImage = async (updatedImage) => {
    await setDoc(doc(db, 'gallery', updatedImage.id), updatedImage);
  };
  const deleteGalleryImage = async (id) => {
    await deleteDoc(doc(db, 'gallery', id));
  };
  
  const seedGallery = async (images) => {
    for (const item of images) {
      const id = Date.now().toString() + Math.random().toString(36).substring(7);
      await setDoc(doc(db, 'gallery', id), { ...item, id });
    }
  };

  // ---- Inquiry Mutators ----
  const addInquiry = async (inquiryData) => {
    const id = Date.now().toString();
    await setDoc(doc(db, 'inquiries', id), { ...inquiryData, id, createdAt: Date.now(), read: false });
  };
  const deleteInquiry = async (id) => {
    await deleteDoc(doc(db, 'inquiries', id));
  };
  const markInquiryAsRead = async (id) => {
    // We update the document, keeping existing data and adding/updating read: true
    await setDoc(doc(db, 'inquiries', id), { read: true }, { merge: true });
  };

  // ---- Settings Mutators ----
  const updateAnnouncement = async (data) => {
    await setDoc(doc(db, 'settings', 'announcement'), data);
  };

  // Provide defaults while loading to prevent UI flickering
  const contextProducts = products.length > 0 ? products : defaultProducts;
  const contextTestimonials = testimonials.length > 0 ? testimonials : initialTestimonials;
  const contextJournals = journals.length > 0 ? journals : initialJournals;

  return (
    <AdminContext.Provider value={{
      products: contextProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      testimonials: contextTestimonials,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      journals: contextJournals,
      addJournal,
      updateJournal,
      deleteJournal,
      gallery,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      seedGallery,
      inquiries,
      addInquiry,
      deleteInquiry,
      markInquiryAsRead,
      announcement,
      updateAnnouncement,
      adminUser,
      authLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
