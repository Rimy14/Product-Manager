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

export default function ProductTable() {
  const { filteredProducts, deleteProductAction } = useProducts();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  if (filteredProducts.length === 0) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "80px 24px",
        borderRadius: "14px", border: "1px solid var(--border)",
        background: "#FFFFFF",
      }}>
        <Package size={32} color="var(--border-strong)" />
        <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-1)", margin: "12px 0 4px" }}>
          No products found
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-3)", margin: 0 }}>
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        borderRadius: "14px",
        border: "1px solid var(--border)",
        background: "#FFFFFF",
        overflowX: "auto",
      }}>
        <table className="min-w-[640px]" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#FAFAF9", borderBottom: "1px solid var(--border)" }}>
              {["Product", "Category", "Price", ""].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "11px 18px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#A8A29E",
                    textAlign: h === "" ? "right" : "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, i) => (
              <TableRow
                key={product.id}
                product={product}
                isOdd={i % 2 !== 0}
                onEdit={() => setEditProduct(product)}
                onDelete={() => setDeleteTarget(product)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        open={!!editProduct}
        onOpenChange={(o) => !o && setEditProduct(null)}
        editProduct={editProduct}
      />
      <DeleteConfirmModal
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        productName={deleteTarget?.name ?? ""}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteProductAction(deleteTarget.id);
          toast.success(`"${deleteTarget.name}" deleted`);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}

function TableRow({ product, isOdd, onEdit, onDelete }: {
  product: Product;
  isOdd: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dot = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Other;

  return (
    <tr
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#F5F4F2" : isOdd ? "#FAFAF9" : "#FFFFFF",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.12s",
      }}
    >
      {/* Product */}
      <td style={{ padding: "12px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "9px",
            overflow: "hidden", flexShrink: 0,
            border: "1px solid var(--border)",
            background: "#F5F4F2",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {product.image && !imgErr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => setImgErr(true)}
              />
            ) : (
              <Package size={16} color="var(--border-strong)" />
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              margin: 0,
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#1C1917",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "220px",
            }}>
              {product.name}
            </p>
            <p style={{
              margin: "2px 0 0",
              fontSize: "12px",
              color: "#A8A29E",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "220px",
            }}>
              {product.description}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td style={{ padding: "12px 18px" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: 500,
          color: "#57534E",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot, flexShrink: 0 }} />
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td style={{ padding: "12px 18px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1C1917", letterSpacing: "-0.02em" }}>
          ${product.price.toFixed(2)}
        </span>
      </td>



      {/* Actions */}
      <td style={{ padding: "12px 18px", textAlign: "right" }}>
        <div
          className="flex items-center justify-end gap-1.5 opacity-100 pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100 lg:pointer-events-none lg:group-hover:pointer-events-auto transition-opacity duration-150"
          style={{}}
        >
          <button
            onClick={onEdit}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 10px", borderRadius: "7px",
              border: "1px solid var(--border)",
              background: "#FFFFFF",
              fontSize: "12px", fontWeight: 500,
              color: "#57534E", cursor: "pointer",
              transition: "border-color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1C1917"; e.currentTarget.style.color = "#1C1917"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "#57534E"; }}
          >
            <Pencil size={11} /> Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              width: "28px", height: "28px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "7px",
              border: "1px solid var(--border)",
              background: "#FFFFFF",
              color: "#A8A29E", cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#EF4444"; e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "#A8A29E"; }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}
