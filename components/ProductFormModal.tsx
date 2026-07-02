"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertCircle, ChevronDown } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { Product, ProductFormData } from "@/types/product";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Electronics", "Fashion", "Home", "Sports",
  "Furniture", "Books", "Beauty", "Toys", "Automotive", "Other",
];

interface FormErrors {
  name?: string; price?: string; description?: string; image?: string;
}

const empty: ProductFormData = { name: "", price: 0, description: "", image: "", category: "Electronics" };

function validate(f: ProductFormData): FormErrors {
  const e: FormErrors = {};
  if (!f.name.trim()) e.name = "Product name is required";
  else if (f.name.trim().length < 2) e.name = "Name must be at least 2 characters";
  if (!f.price || f.price <= 0) e.price = "Price must be greater than 0";
  if (!f.description.trim()) e.description = "Description is required";
  else if (f.description.trim().length < 10) e.description = "At least 10 characters required";
  else if (f.description.trim().length > 500) e.description = "Max 500 characters";
  if (f.image && !/^https?:\/\/.+\..+/.test(f.image)) e.image = "Enter a valid URL";
  return e;
}

export default function ProductFormModal({
  open, onOpenChange, editProduct,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editProduct?: Product | null;
}) {
  const { addProductAction, updateProductAction } = useProducts();
  const [form, setForm] = useState<ProductFormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(editProduct
        ? { name: editProduct.name, price: editProduct.price, description: editProduct.description, image: editProduct.image, category: editProduct.category }
        : empty
      );
      setErrors({}); setTouched({}); setImgErr(false);
    }
  }, [open, editProduct]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: name === "price" ? parseFloat(value) || 0 : value };
    setForm(updated);
    if (touched[name]) setErrors(validate(updated));
  };

  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
    setErrors(validate(form));
    // Reset focus border
    e.target.style.borderColor = (errors as Record<string, string>)[e.target.name] ? "#EF4444" : "var(--border)";
    e.target.style.boxShadow = "none";
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const hasErr = (errors as Record<string, string>)[e.target.name];
    e.target.style.borderColor = hasErr ? "#EF4444" : "#1C1917";
    e.target.style.boxShadow = hasErr
      ? "0 0 0 3px rgba(239,68,68,0.08)"
      : "0 0 0 3px rgba(28,25,23,0.06)";
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) { toast.error("Please fix the errors"); return; }
    if (editProduct) { updateProductAction(editProduct.id, form); toast.success("Product updated"); }
    else { addProductAction(form); toast.success("Product added"); }
    onOpenChange(false);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "#FAFAF9",
    color: "var(--text-1)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };

  const inputError = (name: keyof FormErrors): React.CSSProperties =>
    errors[name] && touched[name]
      ? { borderColor: "#EF4444", background: "#FFF5F5" }
      : {};

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="dialog-overlay fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        />
        <Dialog.Content
          className="dialog-content fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-32px)] sm:w-full"
          style={{
            maxWidth: "520px",
            maxHeight: "92vh",
            overflowY: "auto",
            background: "#FFFFFF",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "24px 24px 0",
            marginBottom: "24px",
          }}>
            <div>
              <Dialog.Title style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "var(--text-1)",
                margin: 0,
                lineHeight: 1.3,
              }}>
                {editProduct ? "Edit product" : "New product"}
              </Dialog.Title>
              <p style={{ fontSize: "13px", color: "var(--text-3)", marginTop: "4px" }}>
                {editProduct ? "Update the details below" : "Fill in the details to add a product"}
              </p>
            </div>
            <Dialog.Close style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1.5px solid var(--border)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-2)",
              flexShrink: 0,
              marginLeft: "16px",
            }}>
              <X size={14} />
            </Dialog.Close>
          </div>

          <form onSubmit={submit} noValidate style={{ padding: "0 24px 24px" }}>
            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "24px" }} />

            {/* Product name */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-2)",
                marginBottom: "6px",
              }}>
                Product name <span style={{ color: "#E85D04" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={change}
                onBlur={blur}
                onFocus={focus}
                placeholder="e.g. Wireless Headphones"
                style={{ ...inputBase, ...inputError("name") }}
              />
              {errors.name && touched.name && (
                <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>
                  <AlertCircle size={11} /> {errors.name}
                </p>
              )}
            </div>

            {/* Price + Category row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[18px]">
              {/* Price */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-2)", marginBottom: "6px" }}>
                  Price <span style={{ color: "#E85D04" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                    color: "var(--text-3)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}>$</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price || ""}
                    onChange={change}
                    onBlur={blur}
                    onFocus={focus}
                    placeholder="0.00"
                    step="0.01"
                    style={{ ...inputBase, paddingLeft: "26px", ...inputError("price") }}
                  />
                </div>
                {errors.price && touched.price && (
                  <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>
                    <AlertCircle size={11} /> {errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-2)", marginBottom: "6px" }}>
                  Category <span style={{ color: "#E85D04" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    name="category"
                    value={form.category}
                    onChange={change}
                    style={{
                      ...inputBase,
                      appearance: "none",
                      WebkitAppearance: "none",
                      paddingRight: "36px",
                      cursor: "pointer",
                      backgroundImage: "none",
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-3)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-2)" }}>
                  Description <span style={{ color: "#E85D04" }}>*</span>
                </label>
                <span style={{
                  fontSize: "11px",
                  color: form.description.length > 450 ? "#F59E0B" : "var(--text-3)",
                }}>
                  {form.description.length}/500
                </span>
              </div>
              <textarea
                name="description"
                value={form.description}
                onChange={change}
                onBlur={blur}
                onFocus={focus}
                placeholder="Describe the product — features, specifications, materials…"
                rows={4}
                style={{
                  ...inputBase,
                  resize: "none",
                  lineHeight: "1.6",
                  ...inputError("description"),
                }}
              />
              {errors.description && touched.description && (
                <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>
                  <AlertCircle size={11} /> {errors.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-2)", marginBottom: "6px" }}>
                Image URL{" "}
                <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--text-3)" }}>(optional)</span>
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={(e) => { change(e); setImgErr(false); }}
                onBlur={blur}
                onFocus={focus}
                placeholder="https://example.com/product.jpg"
                style={{ ...inputBase, ...inputError("image") }}
              />
              {errors.image && touched.image && (
                <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>
                  <AlertCircle size={11} /> {errors.image}
                </p>
              )}

              {/* Image preview */}
              {form.image && !errors.image && (
                <div style={{
                  marginTop: "10px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1.5px solid var(--border)",
                  height: "130px",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {imgErr ? (
                    <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Preview unavailable</p>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.image}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={() => setImgErr(true)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "18px" }} />

            {/* Actions */}
            <div style={{ display: "flex", gap: "10px" }}>
              <Dialog.Close asChild>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-2)",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-1)"; e.currentTarget.style.color = "var(--text-1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: "var(--text-1)",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.15s",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {editProduct ? "Save changes" : "Add product"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
