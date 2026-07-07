import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import StitchDivider from "../components/StitchDivider"

function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart()

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="font-display text-3xl text-ink-charcoal mb-3">
          Your Cart is Empty
        </h2>
        <p className="font-body text-ink-charcoal/60 mb-8">
          Looks like you have not added anything yet. Explore our handmade collection.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="bg-ink-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Your Selection
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold">
            Shopping Cart
          </h1>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-zari-gold/10"
              >
                <Link to={"/products/" + item.id}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <span className="font-body text-xs text-thread-sage uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link to={"/products/" + item.id}>
                    <h3 className="font-display text-base text-ink-charcoal font-semibold leading-snug hover:text-thread-maroon transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-mono text-thread-maroon font-semibold text-base mt-1">
                    {formatPKR(item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-ink-charcoal/30 hover:text-thread-maroon transition-colors text-sm font-body"
                  >
                    Remove
                  </button>
                  <div className="flex items-center border border-zari-gold/30 rounded-xl overflow-hidden bg-fabric-cream">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-ink-charcoal hover:bg-zari-gold/20 transition-colors font-semibold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-ink-charcoal text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-ink-charcoal hover:bg-zari-gold/20 transition-colors font-semibold"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-mono text-xs text-ink-charcoal/50">
                    {formatPKR(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-body text-sm text-thread-maroon hover:underline mt-2"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10 sticky top-24">
              <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="font-body text-sm text-ink-charcoal/70 truncate flex-1 mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-mono text-sm text-ink-charcoal font-semibold">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zari-gold/20 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-ink-charcoal">
                    Total
                  </span>
                  <span className="font-mono text-xl text-thread-maroon font-semibold">
                    {formatPKR(cartTotal)}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-charcoal/50 mt-1">
                  Delivery charges calculated at checkout
                </p>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-3.5 bg-thread-maroon text-white font-body font-semibold rounded-xl text-center hover:bg-thread-maroon/90 transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default CartPage