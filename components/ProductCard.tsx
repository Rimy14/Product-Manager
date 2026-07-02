"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { Product } from "@/types/product";
import { useProducts } from "@/context/ProductContext";
import ProductFormModal from "./ProductFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import toast from "react-hot-toast";

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "#3B82F6",
  Fashion: "#EC4899",
  Home: "#F59E0B",
  Sports: "#10B981",
  Furniture: "#F97316",
  Books: "#8B5CF6",
  Beauty: "#F43F5E",
  Toys: "#EAB308",
  Automotive: "#64748B",
  Other: "#14B8A6",
};

export default function ProductCard({ product }: { product: Product }) {
  const { deleteProductAction } = useProducts();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  const dot = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Other;

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.2s, transform 0.2s",
          boxShadow: hovered
            ? "0 8px 24px rgba(0,0,0,0.10)"
            : "0 1px 3px rgba(0,0,0,0.05)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          cursor: "default",
        }}
      >
        {/* ── Image ── */}
        <div style={{
          position: "relative",
          aspectRatio: "16 / 10",
          width: "100%",
          flexShrink: 0,
          background: "#F5F4F2",
          overflow: "hidden",
        }}>
          {product.image && !imgErr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Package size={28} color="var(--border-strong)" />
            </div>
          )}

          {/* Category chip */}
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.93)",
            backdropFilter: "blur(6px)",
            padding: "4px 9px",
            borderRadius: "20px",
            border: "1px solid rgba(0,0,0,0.07)",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: 500, color: "#1C1917", letterSpacing: "0.01em" }}>
              {product.category}
            </span>
          </div>

          {/* Action buttons — appear on hover */}
          <div
            className="flex opacity-100 pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100 lg:pointer-events-none lg:group-hover:pointer-events-auto transition-opacity duration-200"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              gap: "6px",
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setEditOpen(true); }}
              title="Edit"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#1C1917",
              }}
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setDeleteOpen(true); }}
              title="Delete"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#EF4444",
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Name */}
          <h3 style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#1C1917",
            margin: 0,
            marginBottom: "6px",
            lineHeight: "1.4",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}>
            {product.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: "12.5px",
            color: "#78716C",
            margin: 0,
            lineHeight: "1.55",
            flex: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            marginBottom: "14px",
          }}>
            {product.description}
          </p>

          {/* Price row */}
          <div style={{
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1C1917",
              letterSpacing: "-0.02em",
            }}>
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <ProductFormModal open={editOpen} onOpenChange={setEditOpen} editProduct={product} />
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        productName={product.name}
        onConfirm={() => {
          deleteProductAction(product.id);
          toast.success(`"${product.name}" deleted`);
        }}
      />
    </>
  );
}
