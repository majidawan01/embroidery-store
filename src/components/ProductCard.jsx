import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const formatPKR = (amount) =>
    "Rs. " + amount.toLocaleString("en-PK")

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group">
      
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={"/products/" + product.id}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isSale && (
            <span className="bg-thread-maroon text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-zari-gold text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <span className="bg-ink-charcoal text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-400 text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Category */}
        <span className="text-xs font-body text-thread-sage uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Name */}
        <Link to={"/products/" + product.id}>
          <h3 className="font-display text-base text-ink-charcoal font-semibold leading-snug mb-2 hover:text-thread-maroon transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-thread-maroon font-semibold text-lg">
            {formatPKR(product.price)}
          </span>
          {product.comparePrice && (
            <span className="font-mono text-ink-charcoal/40 text-sm line-through">
              {formatPKR(product.comparePrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={
            product.stock === 0
              ? "mt-auto w-full py-2.5 rounded-xl font-body font-semibold text-sm bg-gray-200 text-gray-400 cursor-not-allowed"
              : "mt-auto w-full py-2.5 rounded-xl font-body font-semibold text-sm bg-thread-maroon text-white hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
          }
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard