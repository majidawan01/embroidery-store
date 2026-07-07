import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../services/api"
import { categories } from "../data/products"
import ProductCard from "../components/ProductCard"
import StitchDivider from "../components/StitchDivider"
import LoadingSpinner from "../components/LoadingSpinner"


function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data)
        setFetchError("")
      } catch {
        setFetchError("Could not load products. Please make sure the server is running.")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((p) => (minPrice === "" ? true : p.price >= Number(minPrice)))
    .filter((p) => (maxPrice === "" ? true : p.price <= Number(maxPrice)))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
      return 0
    })

  return (
    <div className="min-h-screen">
      <section className="bg-ink-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Our Collection
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold mb-3">
            All Products
          </h1>
          <p className="font-body text-fabric-cream/70 text-base max-w-xl mx-auto">
            Browse our complete range of handmade embroidery pieces
          </p>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {loading ? (
          <LoadingSpinner />
        ) : fetchError ? (
          <div className="text-center py-24">
            <span className="text-5xl mb-4 block">⚠️</span>
            <h3 className="font-display text-2xl text-ink-charcoal mb-2">
              Something went wrong
            </h3>
            <p className="font-body text-ink-charcoal/60 mb-6">{fetchError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal placeholder:text-ink-charcoal/40 focus:outline-none focus:border-zari-gold"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    activeCategory === cat
                      ? "px-4 py-2 rounded-full font-body text-sm font-semibold bg-thread-maroon text-white"
                      : "px-4 py-2 rounded-full font-body text-sm font-semibold bg-white text-ink-charcoal border border-zari-gold/30 hover:border-thread-maroon hover:text-thread-maroon transition-colors duration-200"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mb-8">
              <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-32 px-3 py-2 rounded-xl border border-zari-gold/30 bg-white font-mono text-sm text-ink-charcoal placeholder:text-ink-charcoal/40 focus:outline-none focus:border-zari-gold"
              />
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-32 px-3 py-2 rounded-xl border border-zari-gold/30 bg-white font-mono text-sm text-ink-charcoal placeholder:text-ink-charcoal/40 focus:outline-none focus:border-zari-gold"
              />
              {(minPrice || maxPrice) && (
                <button
                  onClick={() => { setMinPrice(""); setMaxPrice("") }}
                  className="px-3 py-2 rounded-xl font-body text-sm text-thread-maroon border border-thread-maroon/30 hover:bg-thread-maroon hover:text-white transition-colors duration-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mb-6">
              <p className="font-body text-sm text-ink-charcoal/60">
                {filtered.length} {filtered.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <span className="text-5xl mb-4 block">🧵</span>
                <h3 className="font-display text-2xl text-ink-charcoal mb-2">
                  No products found
                </h3>
                <p className="font-body text-ink-charcoal/60 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchQuery("")
                    setMinPrice("")
                    setMaxPrice("")
                    setSortBy("default")
                  }}
                  className="px-6 py-2.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default ProductsPage