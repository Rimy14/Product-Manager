"use client";
import { Product, ProductFormData } from "@/types/product";

const STORAGE_KEY = "product_manager_products";

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (formData: ProductFormData): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...formData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProducts([...products, newProduct]);
  return newProduct;
};

export const updateProduct = (
  id: string,
  formData: ProductFormData
): Product | null => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct: Product = {
    ...products[index],
    ...formData,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
};

export const seedSampleProducts = (): void => {
  const existing = getProducts();
  if (existing.length > 0) return;

  const samples: ProductFormData[] = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      price: 299.99,
      description:
        "Premium over-ear headphones with 30-hour battery life, active noise cancellation, and studio-quality sound.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      category: "Electronics",
    },
    {
      name: "Mechanical Keyboard Pro",
      price: 149.99,
      description:
        "Tactile mechanical switches with RGB backlighting, USB-C connectivity, and aluminum frame construction.",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
      category: "Electronics",
    },
    {
      name: "Ergonomic Office Chair",
      price: 499.0,
      description:
        "Lumbar support, adjustable armrests, breathable mesh back, and 360° swivel for all-day comfort.",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop",
      category: "Furniture",
    },
    {
      name: "Minimalist Leather Backpack",
      price: 89.95,
      description:
        "Full-grain leather, fits 15-inch laptop, water-resistant lining, and magnetic closure.",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      category: "Fashion",
    },
    {
      name: "Smart LED Desk Lamp",
      price: 59.99,
      description:
        "Touch-sensitive dimming, built-in USB charging port, and adjustable color temperature for eye care.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      category: "Home",
    },
    {
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      description:
        "Triple-insulated, keeps drinks cold 24hrs or hot 12hrs, BPA-free, and dishwasher safe.",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
      category: "Sports",
    },
  ];

  const now = new Date().toISOString();
  const products: Product[] = samples.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
  saveProducts(products);
};
