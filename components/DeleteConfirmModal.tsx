"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2 } from "lucide-react";

export default function DeleteConfirmModal({
  open, onOpenChange, productName, onConfirm,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  productName: string;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 250));
    onConfirm();
    setLoading(false);
    onOpenChange(false);
  };

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
            maxWidth: "420px",
            background: "#FFFFFF",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            padding: "24px",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: "#FEF2F2", border: "1.5px solid #FECACA",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Trash2 size={16} color="#EF4444" />
            </div>
            <Dialog.Close style={{
              width: "32px", height: "32px", borderRadius: "8px",
              border: "1.5px solid var(--border)", background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-2)",
            }}>
              <X size={14} />
            </Dialog.Close>
          </div>

          <Dialog.Title style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-1)", marginBottom: "8px" }}>
            Delete product
          </Dialog.Title>

          <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "24px" }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>"{productName}"</strong>?
            This action cannot be undone.
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border)", marginBottom: "18px" }} />

          <div style={{ display: "flex", gap: "10px" }}>
            <Dialog.Close asChild>
              <button
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: "10px",
                  border: "1.5px solid var(--border)", background: "transparent",
                  color: "var(--text-2)", fontSize: "14px", fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-1)"; e.currentTarget.style.color = "var(--text-1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                flex: 1, padding: "10px 16px", borderRadius: "10px",
                border: "none", background: "#EF4444",
                color: "#fff", fontSize: "14px", fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
                opacity: loading ? 0.7 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {loading ? (
                <span style={{
                  width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  animation: "spin 0.6s linear infinite", display: "inline-block",
                }} />
              ) : <Trash2 size={14} />}
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
