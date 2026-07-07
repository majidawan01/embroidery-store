import { useState } from "react"
import { Link } from "react-router-dom"
import { trackOrder } from "../services/api"
import StitchDivider from "../components/StitchDivider"

const statusSteps = ["pending", "confirmed", "shipped", "delivered"]

const statusLabels = {
  pending: "Order Received",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
}

const statusDescriptions = {
  pending: "We have received your order and will confirm it shortly.",
  confirmed: "Your order is confirmed and being prepared by our artisans.",
  shipped: "Your order is on its way to you.",
  delivered: "Your order has been delivered. Thank you for shopping with us!",
  cancelled: "This order has been cancelled. Contact us on WhatsApp for details.",
}

function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  async function handleTrack() {
    if (!orderId.trim()) {
      setError("Please enter your order ID")
      return
    }

    try {
      setLoading(true)
      setError("")
      setOrder(null)
      const data = await trackOrder(orderId)
      setOrder(data)
    } catch {
      setError("Order not found. Please check your order ID and try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleTrack()
  }

  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1

  return (
    <div className="min-h-screen">

      <section className="bg-ink-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Order Status
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold mb-3">
            Track Your Order
          </h1>
          <p className="font-body text-fabric-cream/70 text-base max-w-xl mx-auto">
            Enter your order ID to see the latest status of your order
          </p>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10 mb-8">
          <label className="font-body text-sm text-ink-charcoal/70 mb-2 block">
            Order ID (e.g. EMB-123456)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="EMB-000000"
              className="flex-1 px-4 py-3 rounded-xl border border-zari-gold/30 bg-white font-mono text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold uppercase"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className={
                loading
                  ? "px-8 py-3 bg-thread-maroon/60 text-white font-body font-semibold rounded-xl cursor-wait"
                  : "px-8 py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
              }
            >
              {loading ? "Tracking..." : "Track Order"}
            </button>
          </div>
          {error && (
            <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl p-3 mt-4 text-center">
              {error}
            </p>
          )}
          <p className="font-body text-xs text-ink-charcoal/50 mt-4">
            Your order ID was shown on the confirmation page and starts with EMB-.
            Lost your order ID?{" "}
            <a
              href="https://wa.me/923440232857?text=Hi! I need help finding my order ID."
              target="_blank"
              rel="noopener noreferrer"
              className="text-thread-maroon font-semibold hover:underline"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </div>

        {/* Order Result */}
        {order && (
          <div className="bg-white rounded-2xl shadow-sm border border-zari-gold/10 overflow-hidden">

            {/* Header */}
            <div className="px-6 py-4 border-b border-zari-gold/10 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-lg text-thread-maroon font-semibold">
                  {order.orderId}
                </p>
                <p className="font-body text-xs text-ink-charcoal/50">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <p className="font-mono text-lg text-ink-charcoal font-semibold">
                {formatPKR(order.totalAmount)}
              </p>
            </div>

            {/* Status */}
            <div className="px-6 py-8">
              {order.status === "cancelled" ? (
                <div className="text-center py-4">
                  <span className="text-4xl mb-3 block">❌</span>
                  <h3 className="font-display text-xl text-red-600 font-semibold mb-2">
                    Order Cancelled
                  </h3>
                  <p className="font-body text-sm text-ink-charcoal/60">
                    {statusDescriptions.cancelled}
                  </p>
                </div>
              ) : (
                <>
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-6">
                    {statusSteps.map((step, index) => (
                      <div key={step} className="flex-1 flex flex-col items-center relative">
                        {index > 0 && (
                          <div
                            className={
                              "absolute top-4 right-1/2 w-full h-1 -z-0 " +
                              (index <= currentStepIndex ? "bg-thread-sage" : "bg-gray-200")
                            }
                          />
                        )}
                        <div
                          className={
                            "w-8 h-8 rounded-full flex items-center justify-center z-10 font-body text-sm font-bold " +
                            (index <= currentStepIndex
                              ? "bg-thread-sage text-white"
                              : "bg-gray-200 text-gray-400")
                          }
                        >
                          {index < currentStepIndex ? "✓" : index + 1}
                        </div>
                        <p
                          className={
                            "font-body text-xs mt-2 text-center " +
                            (index <= currentStepIndex
                              ? "text-ink-charcoal font-semibold"
                              : "text-ink-charcoal/40")
                          }
                        >
                          {statusLabels[step]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="font-body text-sm text-ink-charcoal/70 text-center bg-fabric-cream rounded-xl p-4">
                    {statusDescriptions[order.status]}
                  </p>
                </>
              )}
            </div>

            {/* Items */}
            <div className="px-6 py-4 border-t border-zari-gold/10">
              <h4 className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-3">
                Order Items
              </h4>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between font-body text-sm text-ink-charcoal/80 mb-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-mono">{formatPKR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="px-6 py-4 border-t border-zari-gold/10 bg-fabric-cream/40">
              <h4 className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-2">
                Delivering To
              </h4>
              <p className="font-body text-sm text-ink-charcoal/80">
                {order.customer.fullName} — {order.deliveryAddress.city}, {order.deliveryAddress.province}
              </p>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="text-center mt-8">
          <p className="font-body text-sm text-ink-charcoal/60 mb-3">
            Need help with your order?
          </p>
          <a
            href="https://wa.me/923440232857?text=Hi! I have a question about my order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-xl font-body text-sm font-semibold text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            WhatsApp Support
          </a>
        </div>

      </section>
    </div>
  )
}

export default TrackOrderPage