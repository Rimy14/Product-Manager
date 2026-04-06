import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Products — Inventory Manager",
  description: "A clean product management dashboard. Add, view, edit, and delete products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ProductProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1C1917",
                color: "#F5F5F4",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                padding: "10px 14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              },
              success: { iconTheme: { primary: "#E85D04", secondary: "#fff" } },
              error: { iconTheme: { primary: "#DC2626", secondary: "#fff" } },
            }}
          />
        </ProductProvider>
      </body>
    </html>
  );
}
