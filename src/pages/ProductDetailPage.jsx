import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { fetchProducts, fetchProductById } from "../services/api"
import { useCart } from "../context/CartContext"
import StitchDivider from "../components/StitchDivider"
import ProductCard from "../components/ProductCard"
import LoadingSpinner from "../components/LoadingSpinner"
import ProductReviews from "../components/ProductReviews"
function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [productData, productsData] = await Promise.all([
          fetchProductById(id),
          fetchProducts(),
        ])
        setProduct(productData)
        setAllProducts(productsData)
        setActiveImage(0)
        setQuantity(1)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">🧵</span>
        <h2 className="font-display text-3xl text-ink-charcoal mb-3">Product Not Found</h2>
        <p className="font-body text-ink-charcoal/60 mb-6">This product does not exist or has been removed.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate("/cart")
  }

  return (
    <div className="min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 font-body text-sm text-ink-charcoal/60 mb-8">
          <Link to="/" className="hover:text-thread-maroon transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-thread-maroon transition-colors">Products</Link>
          <span>/</span>
          <span className="text-ink-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

          <div>
            <div className="rounded-2xl overflow-hidden mb-3 bg-white shadow-sm">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={
                    activeImage === index
                      ? "w-20 h-20 rounded-xl overflow-hidden border-2 border-thread-maroon"
                      : "w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity"
                  }
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-body text-xs text-thread-sage uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h1 className="font-display text-3xl text-ink-charcoal font-semibold mb-2 leading-snug">
              {product.name}
            </h1>
            <p className="font-mono text-xs text-ink-charcoal/40 mb-4">
              SKU: {product.sku}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-3xl text-thread-maroon font-semibold">
                {formatPKR(product.price)}
              </span>
              {product.comparePrice && (
                <span className="font-mono text-lg text-ink-charcoal/40 line-through">
                  {formatPKR(product.comparePrice)}
                </span>
              )}
              {product.isSale && (
                <span className="bg-thread-maroon text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                  Sale
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              {product.stock === 0 ? (
                <span className="font-body text-sm text-red-500 font-semibold">Out of Stock</span>
              ) : product.stock <= 3 ? (
                <span className="font-body text-sm text-zari-gold font-semibold">
                  Only {product.stock} left in stock
                </span>
              ) : (
                <span className="font-body text-sm text-thread-sage font-semibold">In Stock</span>
              )}
            </div>

            <p className="font-body text-ink-charcoal/70 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="bg-white rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3 border border-zari-gold/20">
              {[
                { label: "Fabric", value: product.fabric },
                { label: "Stitch Time", value: product.stitchTime },
                { label: "Color", value: product.color },
                { label: "Care", value: product.care },
              ].map((detail) => (
                <div key={detail.label}>
                  <p className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-0.5">
                    {detail.label}
                  </p>
                  <p className="font-body text-sm text-ink-charcoal font-semibold">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-zari-gold/30 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-ink-charcoal hover:bg-fabric-cream transition-colors font-semibold text-lg"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono text-ink-charcoal font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-11 h-11 flex items-center justify-center text-ink-charcoal hover:bg-fabric-cream transition-colors font-semibold text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={
                  product.stock === 0
                    ? "flex-1 py-3 rounded-xl font-body font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "flex-1 py-3 rounded-xl font-body font-semibold bg-thread-maroon text-white hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
                }
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
            <a
              href={"https://wa.me/923440232857?text=" + encodeURIComponent("Hi! I am interested in: " + product.name + " (SKU: " + product.sku + ")")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-body font-semibold border-2 border-thread-sage text-thread-sage hover:bg-thread-sage hover:text-white transition-all duration-200 text-center"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>

        <StitchDivider />
        <ProductReviews productId={product.id} />

        <StitchDivider />

        {related.length > 0 && (
          <section className="py-12">
            <h2 className="font-display text-2xl text-ink-charcoal font-semibold mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default ProductDetailPage