import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-ink-charcoal text-fabric-cream mt-16">

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="font-display text-xl font-semibold mb-3">
            <span className="text-fabric-cream">Embroidery</span>{" "}
            <span className="text-zari-gold">Store</span>
          </h3>
          <p className="font-body text-sm text-fabric-cream/70 leading-relaxed mb-4">
            Handmade embroidery crafted with love in Lahore — Zari Work, Thread
            Embroidery, Mirror Work & Cutwork, straight from our artisans to your home.
          </p>
          
          <a
            href="https://wa.me/923440232857?text=Hi! I have a question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-semibold text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.851L.057 24l6.303-1.654A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.733.979.997-3.645-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-body font-semibold text-zari-gold text-sm uppercase tracking-wider mb-4">
            Shop
          </h4>
          <ul className="flex flex-col gap-2.5 font-body text-sm">
            <li><Link to="/products" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">All Products</Link></li>
            <li><Link to="/products?category=Zari%20Work" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Zari Work</Link></li>
            <li><Link to="/products?category=Thread%20Embroidery" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Thread Embroidery</Link></li>
            <li><Link to="/products?category=Mirror%20Work" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Mirror Work</Link></li>
            <li><Link to="/products?category=Cutwork%20%26%20Lace" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Cutwork & Lace</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-body font-semibold text-zari-gold text-sm uppercase tracking-wider mb-4">
            Customer Care
          </h4>
          <ul className="flex flex-col gap-2.5 font-body text-sm">
            <li><Link to="/track-order" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Track Your Order</Link></li>
            <li><Link to="/faqs" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">FAQs</Link></li>
            <li><Link to="/contact" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping-policy" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Shipping & Delivery</Link></li>
            <li><Link to="/return-policy" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Returns & Exchange</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-body font-semibold text-zari-gold text-sm uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 font-body text-sm mb-6">
            <li><Link to="/about" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">About Us</Link></li>
            <li><Link to="/" className="text-fabric-cream/70 hover:text-zari-gold transition-colors">Home</Link></li>
          </ul>
          <div className="font-body text-sm text-fabric-cream/70 leading-relaxed">
            <p className="mb-1">📍 Lahore, Punjab, Pakistan</p>
            <p className="mb-1">📞 +92 344 0232857</p>
            <p>✉️ info@embroiderystore.com</p>
          </div>
        </div>
      </div>

      {/* ── Payment & Trust Bar ── */}
      <div className="border-t border-fabric-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-body text-xs text-fabric-cream/50">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">💵 Cash on Delivery</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">📱 JazzCash</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">📲 Easypaisa</span>
          </div>
          <p className="font-body text-xs text-fabric-cream/50">
            🚚 Delivering all across Pakistan
          </p>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-fabric-cream/10 py-4 text-center font-body text-xs text-fabric-cream/50">
        © {new Date().getFullYear()} Embroidery Store — Handcrafted in Lahore, Pakistan. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer