# 🛍️ Product Management Dashboard

A modern, full-featured **Product Management Dashboard** built as part of a Full Stack Intern Assessment. Manage your product inventory with a sleek, premium dark UI — add, view, edit, search, and delete products effortlessly.

This project is optimized for absolute visual elegance and premium usability, featuring a clean responsive design, local storage persistence, and advanced client-side image processing.

---

## 🚀 Live Demo

Check out the deployed application: [Live Demo Link](https://inventorymanagerr.netlify.app/)

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Rimy14/Product-Manager.git
cd product-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | React framework with file-based routing |
| **TypeScript** | Strict type safety across the entire application |
| **Tailwind CSS v4** | Modern utility-first styling |
| **Canvas API** | Client-side image optimization and compression |
| **Radix UI Dialog** | Accessible, focus-managed headless modal interactions |
| **Lucide React** | Consistent, clean icon system |
| **react-hot-toast** | Elegant, non-blocking toast notifications |

---

## ✨ Features

### Core CRUD Operations
- ✅ **Add Product** — Input name, price, description, category, and image.
- ✅ **View Products** — Smooth toggle between Grid and Table layouts.
- ✅ **Edit Product** — Pre-filled edit form with live feedback.
- ✅ **Delete Product** — Confirmed deletion via Radix Dialog to avoid accidental data loss.

### Advanced Enhancements
- 📱 **Clean Mobile & Responsive Design** — Custom CSS container queries and responsive spacing to prevent layout squeezing.
- 🎛️ **Centered Pill Segment Control** — Re-imagined mobile switcher for Grid/Table views positioned cleanly below categories.
- 📸 **Direct Image Upload** — Function to upload directly from local photos or input an image URL.
- ⚙️ **On-the-fly Image Compression** — Automatically rescales high-resolution uploads to a standard max-width/max-height of 600px/450px at 70% quality, reducing local storage footprint to ~40-80KB.
- 🔍 **Real-time Search & Filter** — Instant searching across name, category, or description, plus quick tags to filter by categories.
- 🔔 **Toast Feedback** — Visual notification confirmation on every success or error.
- ✔️ **Interactive Validation** — Strict validation constraints with blur tracking to prevent premature validation warnings.
- 🖼️ **Live Preview** — Visual image previews for both external URLs and local file uploads.
- 📊 **Stats Dashboard** — Instant metrics: Total products, inventory value, average price, and category distribution.
- 💾 **Local Storage Persistence** — Auto-seeds 6 sample products on first launch and saves state across reloads.
- 🔄 **Schema Migration** — Automatic local storage data patching for deprecated asset URLs.

---

## 🗂️ Project Structure

```
product-manager/
├── app/
│   ├── globals.css          # Core responsive utilities & dark design tokens
│   ├── layout.tsx           # Layout provider config
│   └── page.tsx             # Entry point
├── components/
│   ├── ProductPage.tsx      # Main wrapper (Header, Stats, Toolbar, Layout views)
│   ├── ProductCard.tsx      # Grid card layout with fluid aspect ratios
│   ├── ProductTable.tsx     # Responsive table with horizontal overflow wrapping
│   ├── ProductFormModal.tsx # Unified CRUD form with validation & image compressor
│   └── DeleteConfirmModal.tsx # Radix-based confirmation modal
├── context/
│   └── ProductContext.tsx   # Global state context for search/filter and CRUD logic
├── lib/
│   ├── storage.ts           # CRUD Storage abstractions & schema migrations
│   └── utils.ts             # Conditional CSS helper
└── types/
    └── product.ts           # Typescript specifications
```

---

## 🏗️ Architecture & Technical Design

### Data Optimization & Canvas Compression
To stay under the `5MB` browser `localStorage` limit while supporting rich image file uploads, we implement a canvas-based compression mechanism in the product form:
1. When a file is uploaded, a `FileReader` reads it as a data URL.
2. An off-screen image scales down the dimensions proportionally if they exceed 600px (width) or 450px (height).
3. The image is drawn into an HTML5 Canvas context and exported as JPEG data URL at `0.7` quality.
4. This reduces raw photo sizes down to under 100KB, preventing storage exhaustion.

### Layout Fluidity & Aspect Ratios
To resolve common image scaling bugs:
- We utilize `aspect-ratio: 16/10` across grid item cards.
- The wrapper leverages `object-fit: cover` to retain proportional focal areas, eliminating layout distortion or cropping.

### Accessible Dialog States
We employ Radix UI Dialog primitives to handle focus trapping, DOM accessibility tags, and keyboard escape hooks out-of-the-box. Custom responsive classes prevent modal bounds from breaking layout margins on small-screen devices.

---

## 🎨 Design Decisions & Assumptions

1. **Client-only Environment** — Built to run entirely on the client, caching updates in localStorage.
2. **Simplified Visual Hierarchy** — Removed the "Date Created" visual columns to reduce design noise on smaller viewports.
3. **Optimized Lamp Mockup Asset** — Upgraded the Smart Desk Lamp placeholder image URL to a reliable, clean mockup source.
4. **Dark Mode-First Identity** — A default custom dark theme with ambient borders and cards was chosen to deliver a high-quality modern visual appeal.


