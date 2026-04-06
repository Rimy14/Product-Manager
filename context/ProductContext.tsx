"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product, ProductFormData } from "@/types/product";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  seedSampleProducts,
} from "@/lib/storage";

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (v: "grid" | "table") => void;
  addProductAction: (data: ProductFormData) => Product;
  updateProductAction: (id: string, data: ProductFormData) => Product | null;
  deleteProductAction: (id: string) => boolean;
  refreshProducts: () => void;
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const refreshProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    seedSampleProducts();
    refreshProducts();
  }, [refreshProducts]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))).sort(),
  ];

  const addProductAction = (data: ProductFormData): Product => {
    const product = addProduct(data);
    refreshProducts();
    return product;
  };

  const updateProductAction = (
    id: string,
    data: ProductFormData
  ): Product | null => {
    const product = updateProduct(id, data);
    refreshProducts();
    return product;
  };

  const deleteProductAction = (id: string): boolean => {
    const result = deleteProduct(id);
    refreshProducts();
    return result;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        viewMode,
        setViewMode,
        addProductAction,
        updateProductAction,
        deleteProductAction,
        refreshProducts,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
};
