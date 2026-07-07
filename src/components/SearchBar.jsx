import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchProducts } from "../services/api"

function SearchBar({ onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  // Products ek baar load karo
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
    inputRef.current?.focus()
  }, [])

  // Query change par filter karo
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matched = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6)
    setResults(matched)
  }, [query, products])

  function handleViewAll() {
    onClose()
    navigate("/products")
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Search Panel */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zari-gold/20">
          <svg
            className="h-5 w-5 text-ink-charcoal/40 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products... e.g. dupatta, mirror work"
            className="flex-1 font-body text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="text-ink-charcoal/40 hover:text-ink-charcoal text-xl flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">

          {query.trim().length < 2 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-body text-sm text-ink-charcoal/50">
                Start typing to search products...
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {["Dupatta", "Mirror Work", "Zari", "Cushion"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full font-body text-xs bg-fabric-cream text-ink-charcoal/70 hover:bg-zari-gold/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <span className="text-3xl mb-2 block">🔍</span>
              <p className="font-body text-sm text-ink-charcoal/60 mb-1">
                No products found for "{query}"
              </p>
              <p className="font-body text-xs text-ink-charcoal/40">
                Try different keywords like "dupatta" or "mirror"
              </p>
            </div>
          ) : (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={"/products/" + product.id}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-fabric-cream/60 transition-colors border-b border-zari-gold/5"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-ink-charcoal truncate">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-thread-sage">
                      {product.category}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-thread-maroon font-semibold flex-shrink-0">
                    {formatPKR(product.price)}
                  </p>
                </Link>
              ))}

              <button
                onClick={handleViewAll}
                className="w-full py-3.5 font-body text-sm font-semibold text-thread-maroon hover:bg-fabric-cream/60 transition-colors"
              >
                View All Products →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar