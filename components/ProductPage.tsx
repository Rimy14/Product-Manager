"use client";

import React, { useState } from "react";
import {
  Search, Plus, LayoutGrid, List, X, Package,
  TrendingUp, DollarSign, Tag,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import ProductFormModal from "./ProductFormModal";

export default function ProductPage() {
  const {
    filteredProducts, products,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    viewMode, setViewMode,
    categories,
  } = useProducts();

  const [addOpen, setAddOpen] = useState(false);

  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const avgPrice = products.length ? totalValue / products.length : 0;
  const uniqueCategories = new Set(products.map((p) => p.category)).size;

  const stats = [
    { label: "Total products", value: String(products.length), icon: Package, color: "#6366F1" },
    { label: "Inventory value", value: `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: DollarSign, color: "#10B981" },
    { label: "Avg. price", value: `$${avgPrice.toFixed(2)}`, icon: TrendingUp, color: "#F59E0B" },
    { label: "Categories", value: String(uniqueCategories), icon: Tag, color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="responsive-container h-[60px] flex items-center justify-between">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg, #E85D04, #F97316)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(232,93,4,0.35)" }}>
              <Package size={16} color="#fff" />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#1C1917", letterSpacing: "-0.02em" }}>Product</span>
              <span style={{ fontSize: "15px", fontWeight: 400, color: "#A8A29E", letterSpacing: "-0.01em" }}>Manager</span>
            </div>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: "7px", padding: "8px 18px", borderRadius: "9px", fontSize: "13.5px", fontWeight: 600, color: "#FFFFFF", background: "linear-gradient(135deg, #E85D04, #F97316)", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(232,93,4,0.3)", transition: "box-shadow 0.2s, transform 0.2s", fontFamily: "inherit" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,93,4,0.45)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(232,93,4,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Plus size={15} />
            New product
          </button>
        </div>
      </header>

      <main className="responsive-container pt-6 md:pt-10 pb-16 box-border">

        {/* ── Page heading ── */}
        <div style={{ marginBottom: "32px" }}>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>
            All products
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-2)" }}>
            {products.length} items in your inventory
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className="stats-grid">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
                    {s.label}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: s.color + "18" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-2xl font-semibold" style={{ color: "var(--text-1)" }}>
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Toolbar ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          {/* Row 1: search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "var(--text-3)" }}
            />
            <input
              type="text"
              placeholder="Search by name, description, or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none"
              style={{
                paddingLeft: "36px",
                paddingRight: "36px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-1)",
                width: "100%",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--text-1)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-3)" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Row 2: category filters + view toggle */}
          <div className="toolbar-row">
            {/* Category pills — scrollable */}
            <div className="categories-scroll" style={{ flex: 1 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    border: "1px solid",
                    ...(selectedCategory === cat
                      ? { background: "var(--text-1)", color: "#fff", borderColor: "var(--text-1)" }
                      : { background: "var(--surface)", color: "var(--text-2)", borderColor: "var(--border)" }
                    )
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div
              style={{ display: "flex", alignItems: "center", borderRadius: "12px", border: "1px solid var(--border)", flexShrink: 0, padding: "4px", background: "var(--surface)" }}
            >
              <button
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  viewMode === "grid"
                    ? { background: "var(--bg)", color: "var(--text-1)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : { color: "var(--text-3)" }
                }
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  viewMode === "table"
                    ? { background: "var(--bg)", color: "var(--text-1)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : { color: "var(--text-3)" }
                }
              >
                <List className="w-3.5 h-3.5" />
                Table
              </button>
            </div>
          </div>

          {/* Results line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              {filteredProducts.length === products.length
                ? `${products.length} product${products.length !== 1 ? "s" : ""}`
                : `${filteredProducts.length} of ${products.length} products`}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-xs flex items-center gap-1 transition-opacity hover:opacity-60"
                style={{ color: "var(--text-2)" }}
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Products ── */}
        {viewMode === "grid" ? (
          filteredProducts.length === 0 ? (
            <EmptyState
              onAdd={() => setAddOpen(true)}
              hasFilters={!!(searchQuery || selectedCategory !== "All")}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )
        ) : (
          <ProductTable />
        )}
      </main>

      <ProductFormModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}

function EmptyState({ onAdd, hasFilters }: { onAdd: () => void; hasFilters: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <Package className="w-5 h-5" style={{ color: "var(--text-3)" }} />
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: "var(--text-1)" }}>
        {hasFilters ? "No products match" : "No products yet"}
      </p>
      <p className="text-xs mb-5" style={{ color: "var(--text-3)" }}>
        {hasFilters ? "Try a different search or filter" : "Add your first product to get started"}
      </p>
      {!hasFilters && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "var(--text-1)", color: "#fff" }}
        >
          <Plus className="w-3.5 h-3.5" />
          New product
        </button>
      )}
    </div>
  );
}
