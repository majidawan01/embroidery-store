import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"
import AdminRoute from "./components/AdminRoute"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminProducts from "./pages/admin/AdminProducts"
import TrackOrderPage from "./pages/TrackOrderPage"
import FAQPage from "./pages/FAQPage"
import ContactPage from "./pages/ContactPage"
import ShippingPolicyPage from "./pages/ShippingPolicyPage"
import ReturnPolicyPage from "./pages/ReturnPolicyPage"
import AboutPage from "./pages/AboutPage"
import AdminReviews from "./pages/admin/AdminReviews"

function StoreLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-fabric-cream">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>

          {/* ── Customer Website ── */}
          <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />
          <Route path="/products" element={<StoreLayout><ProductsPage /></StoreLayout>} />
          <Route path="/products/:id" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
          <Route path="/cart" element={<StoreLayout><CartPage /></StoreLayout>} />
          <Route path="/checkout" element={<StoreLayout><CheckoutPage /></StoreLayout>} />
          <Route path="/order-confirmation" element={<StoreLayout><OrderConfirmationPage /></StoreLayout>} />
          <Route path="/track-order" element={<StoreLayout><TrackOrderPage /></StoreLayout>} />
          <Route path="/faqs" element={<StoreLayout><FAQPage /></StoreLayout>} />
          <Route path="/contact" element={<StoreLayout><ContactPage /></StoreLayout>} />
          <Route path="/shipping-policy" element={<StoreLayout><ShippingPolicyPage /></StoreLayout>} />
          <Route path="/return-policy" element={<StoreLayout><ReturnPolicyPage /></StoreLayout>} />
          <Route path="/about" element={<StoreLayout><AboutPage /></StoreLayout>} />
          

          {/* ── Admin Panel ── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App