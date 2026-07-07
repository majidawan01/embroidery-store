import { useLocation, Link } from "react-router-dom"
import StitchDivider from "../components/StitchDivider"

function OrderConfirmationPage() {
  const { state } = useLocation()

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">🧵</span>
        <h2 className="font-display text-3xl text-ink-charcoal mb-3">
          No Order Found
        </h2>
        <p className="font-body text-ink-charcoal/60 mb-6">
          Please place an order first.
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

  const { orderId, form, cartItems, cartTotal } = state
  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  const paymentLabels = {
    cod: "Cash on Delivery",
    jazzcash: "JazzCash",
    easypaisa: "Easypaisa",
  }

  const whatsappMessage =
    "Hi! I just placed an order.\n" +
    "Order ID: " + orderId + "\n" +
    "Name: " + form.fullName + "\n" +
    "Phone: " + form.phone + "\n" +
    "Address: " + form.address + ", " + form.city + "\n" +
    "Payment: " + paymentLabels[form.payment] + "\n" +
    "Total: " + formatPKR(cartTotal) + "\n\n" +
    "Items:\n" +
    cartItems.map((i) => i.name + " x" + i.quantity).join("\n")

  return (
    <div className="min-h-screen">

      <section className="bg-thread-sage py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="font-display text-4xl text-white font-bold mb-3">
            Order Placed Successfully!
          </h1>
          <p className="font-body text-white/80 text-base">
            Thank you for your order. We will contact you shortly to confirm delivery details.
          </p>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ink-charcoal font-semibold">
              Order Details
            </h2>
            <span className="font-mono text-sm text-thread-maroon font-semibold bg-thread-maroon/10 px-3 py-1 rounded-full">
              {orderId}
            </span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-ink-charcoal text-sm truncate">
                    {item.name}
                  </p>
                  <p className="font-body text-xs text-ink-charcoal/60">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-mono text-sm text-ink-charcoal font-semibold">
                  {formatPKR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-zari-gold/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-body font-semibold text-ink-charcoal">
                Total
              </span>
              <span className="font-mono text-xl text-thread-maroon font-semibold">
                {formatPKR(cartTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-zari-gold/10">
            <h3 className="font-body font-semibold text-ink-charcoal text-sm uppercase tracking-wider mb-3">
              Delivery Address
            </h3>
            <p className="font-body text-ink-charcoal/70 text-sm leading-relaxed">
              {form.fullName}<br />
              {form.address}<br />
              {form.city}, {form.province}
              {form.postalCode && <><br />{form.postalCode}</>}
              <br />
              {form.phone}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-zari-gold/10">
            <h3 className="font-body font-semibold text-ink-charcoal text-sm uppercase tracking-wider mb-3">
              Payment Method
            </h3>
            <p className="font-body text-ink-charcoal/70 text-sm">
              {paymentLabels[form.payment]}
            </p>
            {form.payment === "cod" && (
              <p className="font-body text-xs text-thread-sage mt-2">
                Please keep exact change ready at the time of delivery.
              </p>
            )}
          </div>
        </div>

        <StitchDivider />

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href={"https://wa.me/923440232857?text=" + encodeURIComponent(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 bg-thread-sage text-white font-body font-semibold rounded-xl text-center hover:bg-thread-sage/90 transition-colors duration-200"
          >
            Track via WhatsApp
          </a>
          
          <Link
            to="/products"
            className="flex-1 py-3.5 border-2 border-thread-maroon text-thread-maroon font-body font-semibold rounded-xl text-center hover:bg-thread-maroon hover:text-white transition-all duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  )
}

export default OrderConfirmationPage