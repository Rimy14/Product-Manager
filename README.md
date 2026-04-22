# 🛍️ Product Manager

A modern, full-featured **Product Management Dashboard** built as part of a Full Stack Intern Assessment. Manage your product inventory with a sleek dark UI — add, view, edit, search, and delete products effortlessly.

---

## 🚀 Live Demo

Run the project locally following the setup instructions below.

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone <https://github.com/Rimy14/Product-Manager.git>
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
npm start
```

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | React framework with file-based routing |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling |
| **Radix UI** | Accessible headless components (Dialog) |
| **Lucide React** | Beautiful, consistent icon set |
| **react-hot-toast** | Elegant toast notifications |

---

## ✨ Features

### Core CRUD
- ✅ **Add Product** — Name, price, description, image URL, category
- ✅ **View Products** — Grid or Table layout toggle
- ✅ **Edit Product** — Pre-filled form with live validation
- ✅ **Delete Product** — Confirmation modal before deletion

### Bonus Features
- 🔍 **Search** — Real-time filter by name, description, or category
- 🏷️ **Category Filter** — One-click category filtering
- 🔔 **Toast Notifications** — Success/error feedback on every action
- ✔️ **Form Validation** — Required fields, URL format, length checks, live error display
- 🖼️ **Image Preview** — Live image preview while entering URL
- 📊 **Stats Dashboard** — Total products, inventory value, average price, category count
- 🎨 **Dark Mode** — Fully dark UI with ambient glow effects
- 📱 **Responsive** — Works on mobile, tablet, and desktop
- 💾 **Local Storage** — All data persists between sessions
- 🎭 **Sample Data** — Pre-loaded with 6 sample products on first launch

---

## 🗂️ Project Structure

```
product-manager/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home page
├── components/
│   ├── ProductPage.tsx      # Main page with header, stats, toolbar
│   ├── ProductCard.tsx      # Grid card with hover actions
│   ├── ProductTable.tsx     # Table view with thumbnails
│   ├── ProductFormModal.tsx # Add/Edit form modal with validation
│   └── DeleteConfirmModal.tsx # Delete confirmation dialog
├── context/
│   └── ProductContext.tsx   # Global state management (React Context)
├── lib/
│   ├── storage.ts           # LocalStorage CRUD operations
│   └── utils.ts             # Tailwind class merge utility
└── types/
    └── product.ts           # TypeScript interfaces
```

---

## 🏗️ Architecture Notes

### State Management
Uses **React Context API** (`ProductContext`) as a single source of truth, exposing products, search/filter state, and CRUD actions to all child components.

### Data Layer
The `lib/storage.ts` module abstracts all localStorage operations, keeping components clean and decoupled from persistence logic.

### Form Validation
Client-side validation with touch tracking — errors only display after the user has interacted with a field (on blur), with a final full validation on submit.

---

## 🎨 Design Decisions & Assumptions

1. **No backend required** — LocalStorage provides full CRUD persistence for this assessment.
2. **Sample data seeded** — 6 diverse products are added on first visit to demonstrate the UI in a populated state. Re-seeding only happens when localStorage is empty.
3. **Image URL only** — Image upload was marked "optional"; URL input with live preview was chosen for simplicity without requiring a server.
4. **Category system** — Predefined list of 10 categories for consistency; could be made dynamic in a production app.
5. **Dark mode as default** — Chosen for modern aesthetics; light mode toggle would be a future enhancement.
6. **Radix UI Dialog** — Used for accessible, focus-managed modals instead of building custom ones from scratch.

---

## 🔮 Future Improvements

- [ ] Light/dark mode toggle
- [ ] Bulk delete with multi-select
- [ ] Sort by price, name, or date
- [ ] Export products as CSV/JSON
- [ ] Pagination or infinite scroll for large catalogs
- [ ] Image upload to a cloud service (Cloudinary, etc.)
- [ ] Backend integration with REST API or tRPC
- [ ] Unit tests with Jest + React Testing Library

---

## 📄 License

MIT — feel free to use this for learning and assessment purposes.
