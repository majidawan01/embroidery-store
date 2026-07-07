

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import AnnouncementBar from "./AnnouncementBar"
import SearchBar from "./SearchBar"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  // Change 1 — Dropdown and categories state added
  const [shopOpen, setShopOpen] = useState(false)
  const { cartCount } = useCart()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]

  const categories = [
    { name: "Zari Work", icon: "✨", desc: "Gold & silver thread luxury" },
    { name: "Thread Embroidery", icon: "🧵", desc: "Colorful traditional motifs" },
    { name: "Mirror Work", icon: "🪞", desc: "Hand-set sparkling mirrors" },
    { name: "Cutwork & Lace", icon: "🌸", desc: "Delicate openwork elegance" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-ink-charcoal">
      <AnnouncementBar />

      {/* Top thin gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-zari-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left — Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <span className="font-display text-xl text-fabric-cream font-semibold tracking-wide">
              Embroidery
            </span>
            <span className="font-display text-xl text-zari-gold font-semibold tracking-wide">
              Store
            </span>
          </Link>

          {/* Center — Nav Links (Desktop) - Change 2 Applied */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 font-body text-sm font-semibold text-zari-gold border-b-2 border-zari-gold"
                    : "px-4 py-2 font-body text-sm text-fabric-cream/80 hover:text-fabric-cream transition-colors duration-200 border-b-2 border-transparent"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="px-4 py-2 font-body text-sm text-fabric-cream/80 hover:text-fabric-cream transition-colors duration-200 flex items-center gap-1.5">
                Shop by Category
                <span className={"text-xs transition-transform duration-200 " + (shopOpen ? "rotate-180" : "")}>
                  ▾
                </span>
              </button>

              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80">
                  <div className="bg-white rounded-2xl shadow-2xl border border-zari-gold/20 overflow-hidden">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={"/products?category=" + encodeURIComponent(cat.name)}
                        onClick={() => setShopOpen(false)}
                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-fabric-cream/60 transition-colors border-b border-zari-gold/5 last:border-0"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <p className="font-body text-sm font-semibold text-ink-charcoal">
                            {cat.name}
                          </p>
                          <p className="font-body text-xs text-ink-charcoal/50">
                            {cat.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to="/products"
                      onClick={() => setShopOpen(false)}
                      className="block text-center py-3 font-body text-sm font-semibold text-thread-maroon bg-fabric-cream/40 hover:bg-fabric-cream transition-colors"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Cart + Contact */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-fabric-cream/80 hover:text-zari-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Desktop Only Right Side Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://wa.me/923440232857"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.851L.057 24l6.303-1.654A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.733.979.997-3.645-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
                </svg>
                <span className="font-body text-sm text-white font-semibold">
                  WhatsApp
                </span>
              </a>
              <div className="w-px h-4 bg-fabric-cream/20" />
              <Link to="/cart" className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-thread-maroon hover:bg-thread-maroon/90 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-9-4h4"
                    />
                  </svg>
                  <span className="font-body text-sm text-white font-semibold">
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-zari-gold text-ink-charcoal text-xs font-mono font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Right Side Controls */}
            <div className="md:hidden flex items-center gap-3">
              <Link to="/cart" className="relative">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-thread-maroon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-9-4h4"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="bg-zari-gold text-ink-charcoal text-xs font-mono font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="p-2"
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fabric-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fabric-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu - Change 3 Applied */}
      {menuOpen && (
        <div className="md:hidden border-t border-fabric-cream/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-3 font-body text-sm font-semibold text-zari-gold border-l-2 border-zari-gold bg-white/5 rounded-r-lg"
                    : "px-4 py-3 font-body text-sm text-fabric-cream/80 hover:text-fabric-cream border-l-2 border-transparent"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Shop by Category Header and Links */}
            <p className="px-4 pt-3 pb-1 font-body text-xs text-fabric-cream/40 uppercase tracking-wider">
              Shop by Category
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={"/products?category=" + encodeURIComponent(cat.name)}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 font-body text-sm text-fabric-cream/80 hover:text-fabric-cream border-l-2 border-transparent flex items-center gap-3"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
            
            <a
              href="https://wa.me/923440232857"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 font-body text-sm text-zari-gold border-l-2 border-transparent"
              onClick={() => setMenuOpen(false)}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </nav>
  )
}

export default Navbar