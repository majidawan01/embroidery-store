import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../services/api"
import { categories } from "../data/products"
import ProductCard from "../components/ProductCard"
import StitchDivider from "../components/StitchDivider"
import LoadingSpinner from "../components/LoadingSpinner"
import HeroSlider from "../components/HeroSlider" // HeroSlider Imported
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"
function HomePage() {
  const [bestSellers, setBestSellers] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts()
        setBestSellers(data.filter((p) => p.isSale).slice(0, 4))
        setNewArrivals(data.filter((p) => p.isNew).slice(0, 4))
      } catch {
        setBestSellers([])
        setNewArrivals([])
      } finally {
        setLoadingProducts(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <div className="min-h-screen">

      {/* ── Hero Section Replaced with HeroSlider ── */}
      <HeroSlider />

      {/* ── Categories Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl text-ink-charcoal font-semibold mb-2">
            Shop by Category
          </h2>
          <p className="font-body text-ink-charcoal/60 text-base">
            Four distinct embroidery traditions, one collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter((c) => c !== "All").map((category) => (
            <Link
              key={category}
              to={"/products?category=" + encodeURIComponent(category)}
              className="group relative bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-zari-gold/20 hover:border-zari-gold/60"
            >
              <div className="w-12 h-12 bg-fabric-cream rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-zari-gold/20 transition-colors duration-200">
                <span className="text-2xl">
                  {category === "Zari Work" && "✨"}
                  {category === "Thread Embroidery" && "🧵"}
                  {category === "Mirror Work" && "🪞"}
                  {category === "Cutwork & Lace" && "🌸"}
                </span>
              </div>
              <h3 className="font-body font-semibold text-ink-charcoal text-sm group-hover:text-thread-maroon transition-colors duration-200">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <StitchDivider />

    {/* ── Best Sellers ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-body text-zari-gold text-xs uppercase tracking-widest mb-2 block">
              Customer Favorites
            </span>
            <h2 className="font-display text-3xl text-ink-charcoal font-semibold">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:block font-body text-thread-maroon font-semibold hover:underline text-sm"
          >
            View All →
          </Link>
        </div>

        {loadingProducts ? (
          <LoadingSpinner />
        ) : bestSellers.length === 0 ? (
          <p className="text-center font-body text-ink-charcoal/60 py-12">
            Best sellers will appear here soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <StitchDivider />

      {/* ── New Arrivals ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-body text-zari-gold text-xs uppercase tracking-widest mb-2 block">
              Fresh from the Workshop
            </span>
            <h2 className="font-display text-3xl text-ink-charcoal font-semibold">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="hidden sm:block font-body text-thread-maroon font-semibold hover:underline text-sm"
          >
            View All →
          </Link>
        </div>

        {loadingProducts ? (
          <LoadingSpinner />
        ) : newArrivals.length === 0 ? (
          <p className="text-center font-body text-ink-charcoal/60 py-12">
            New arrivals coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/products"
            className="font-body text-thread-maroon font-semibold hover:underline text-sm"
          >
            View All Products →
          </Link>
        </div>
      </section>

      <StitchDivider />

      {/* ── About Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
              Our Story
            </span>
            <h2 className="font-display text-3xl text-ink-charcoal font-semibold mb-5 leading-snug">
              Three Generations of Artisan Craft
            </h2>
            <p className="font-body text-ink-charcoal/70 text-base leading-relaxed mb-4">
              Founded in Lahore over 30 years ago, Embroidery Factory has been
              preserving and celebrating Pakistan's rich embroidery heritage.
              Every piece that leaves our workshop carries the skill, patience,
              and passion of our master artisans.
            </p>
            <p className="font-body text-ink-charcoal/70 text-base leading-relaxed mb-8">
              From delicate Zari work to intricate Mirror embroidery, we blend
              traditional techniques with contemporary designs — creating pieces
              that are as wearable as they are beautiful.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { number: "30+", label: "Years of Craft" },
                { number: "500+", label: "Products Made" },
                { number: "100%", label: "Handmade" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl text-thread-maroon font-bold">
                    {stat.number}
                  </div>
                  <div className="font-body text-xs text-ink-charcoal/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
            >
              Explore Collection
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80"
              alt="Artisan doing embroidery"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-zari-gold/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <div className="font-body font-semibold text-ink-charcoal text-sm">
                  Master Artisans
                </div>
                <div className="font-body text-ink-charcoal/60 text-xs">
                  Lahore, Pakistan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StitchDivider />
      <Testimonials />
      <Newsletter />

      {/* ── Trust Badges ── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Nationwide Delivery", desc: "All major cities covered" },
              { icon: "💰", title: "Cash on Delivery", desc: "Pay when you receive" },
              { icon: "💬", title: "WhatsApp Support", desc: "Quick response guaranteed" },
              { icon: "✋", title: "100% Handmade", desc: "Authentic artisan craft" },
            ].map((badge) => (
              <div key={badge.title} className="flex flex-col items-center text-center p-4">
                <span className="text-3xl mb-3">{badge.icon}</span>
                <h4 className="font-body font-semibold text-ink-charcoal text-sm mb-1">
                  {badge.title}
                </h4>
                <p className="font-body text-ink-charcoal/60 text-xs">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage