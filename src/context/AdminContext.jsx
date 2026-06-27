import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as defaultProducts } from '../products';

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

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('savelife_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('savelife_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  useEffect(() => {
    localStorage.setItem('savelife_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('savelife_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const updateTestimonial = (updatedTestimonial) => {
    setTestimonials(testimonials.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t));
  };

  const addTestimonial = (newTestimonial) => {
    setTestimonials([...testimonials, { ...newTestimonial, id: Date.now() }]);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      products,
      updateProduct,
      testimonials,
      updateTestimonial,
      addTestimonial,
      deleteTestimonial
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
