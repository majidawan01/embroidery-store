# Embroidery Store

An e-commerce website for a handmade embroidery business in Lahore, Pakistan. Customers browse products, place orders and track them, while the store owner manages products, orders and reviews from an admin panel.

**Live demo:** https://embroidery-store-tau.vercel.app
**Backend repo:** [embroidery-backend](https://github.com/majidawan01/embroidery-backend)

## Key Features

**Store**
- Homepage with hero slider, best sellers, new arrivals and testimonials
- Live product search
- Category browsing (Zari Work, Thread Embroidery, Mirror Work, Cutwork and Lace)
- Product detail pages with customer reviews and ratings
- Shopping cart with quantity management
- Checkout with Cash on Delivery, JazzCash or Easypaisa as payment options
- Order tracking by order ID
- WhatsApp button for support and custom orders
- FAQ, Shipping Policy, Return Policy, About and Contact pages
- Responsive layout for mobile, tablet and desktop

**Admin panel**
- Admin login with JWT
- Dashboard with order count, revenue and low-stock alerts
- Add, edit and delete products
- Order management with status updates
- Review moderation (approve or remove reviews)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (this repo) | React 19, Vite, React Router, Tailwind CSS v4 |
| Backend ([embroidery-backend](https://github.com/majidawan01/embroidery-backend)) | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt |
| Hosting | Vercel (frontend), Railway (backend), MongoDB Atlas (database) |

## Screenshots

### Homepage
![Homepage](./ambridory%20home%20page.PNG)

### Products
![Products page](./ambridory%20product.PNG)

### Product detail
![Product detail](./ambridory%20product%20detail.PNG)

### Shopping cart
![Cart](./shopping%20cart.PNG)

### Checkout
![Checkout](./checkout.PNG)

### Admin dashboard
![Admin dashboard](./admin%20dashboard.PNG)

### Admin orders
![Admin orders](./admin%20order.PNG)

### Admin reviews
![Admin reviews](./admin%20reviews.PNG)

## Getting Started

### Prerequisites

- Node.js 18 or later
- The [embroidery-backend](https://github.com/majidawan01/embroidery-backend) API running on `http://localhost:5000` for full functionality

### Run

```bash
git clone https://github.com/majidawan01/embroidery-store.git
cd embroidery-store
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build
```

## Environment Variables

None for this frontend. The API URL is set in `src/services/api.js`: `http://localhost:5000/api` in development and the Railway URL in production. The backend's variables are documented in its own repo.

## Project Structure

```
src/
├── components/   Reusable UI (Navbar, Footer, ProductCard, ...)
├── pages/        Store pages (Home, Products, Cart, Checkout, ...)
├── pages/admin/  Admin panel pages
├── context/      Cart state
├── data/         Static reference data
├── services/     API calls
└── utils/        Helpers
```

## Author

**Majid Awan** · [Portfolio](https://majid-awan-updated-portfolio-stzz.vercel.app) · [LinkedIn](https://www.linkedin.com/in/majid-awan-8210943a3) · [GitHub](https://github.com/majidawan01)
