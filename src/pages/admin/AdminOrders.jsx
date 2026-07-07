import { useState, useEffect } from "react"
import { fetchAllOrders, updateOrderStatus } from "../../services/api"
import LoadingSpinner from "../../components/LoadingSpinner"

const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [updating, setUpdating] = useState(null)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      setLoading(true)
      const data = await fetchAllOrders()
      setOrders(data)
    } catch (error) {
      console.error("Failed to load orders:", error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      setUpdating(orderId)
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      )
    } catch (error) {
      alert("Status update failed: " + error.message)
    } finally {
      setUpdating(null)
    }
  }

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus)

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-ink-charcoal font-semibold">
          Orders
        </h1>
        <p className="font-body text-sm text-ink-charcoal/60">
          {filtered.length} {filtered.length === 1 ? "order" : "orders"}
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={
            filterStatus === "all"
              ? "px-4 py-2 rounded-full font-body text-sm font-semibold bg-thread-maroon text-white"
              : "px-4 py-2 rounded-full font-body text-sm bg-white text-ink-charcoal border border-zari-gold/30 hover:border-thread-maroon transition-colors"
          }
        >
          All
        </button>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={
              filterStatus === status
                ? "px-4 py-2 rounded-full font-body text-sm font-semibold bg-thread-maroon text-white capitalize"
                : "px-4 py-2 rounded-full font-body text-sm bg-white text-ink-charcoal border border-zari-gold/30 hover:border-thread-maroon transition-colors capitalize"
            }
          >
            {status}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-zari-gold/10">
          <span className="text-4xl mb-3 block">📦</span>
          <p className="font-body text-ink-charcoal/60">No orders found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-zari-gold/10 overflow-hidden"
            >
              {/* Order Header Row */}
              <div
                className="px-5 py-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-fabric-cream/40 transition-colors"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order._id ? null : order._id)
                }
              >
                <div className="flex-1 min-w-[140px]">
                  <p className="font-mono text-sm text-thread-maroon font-semibold">
                    {order.orderId}
                  </p>
                  <p className="font-body text-xs text-ink-charcoal/50 mt-0.5">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex-1 min-w-[140px]">
                  <p className="font-body text-sm text-ink-charcoal font-semibold">
                    {order.customer.fullName}
                  </p>
                  <p className="font-body text-xs text-ink-charcoal/50 mt-0.5">
                    {order.deliveryAddress.city}
                  </p>
                </div>

                <p className="font-mono text-sm text-ink-charcoal font-semibold min-w-[100px]">
                  {formatPKR(order.totalAmount)}
                </p>

                <span
                  className={
                    "px-3 py-1 rounded-full text-xs font-body font-semibold capitalize " +
                    (statusColors[order.status] || "")
                  }
                >
                  {order.status}
                </span>

                <span className="text-ink-charcoal/40 text-sm">
                  {expandedOrder === order._id ? "▲" : "▼"}
                </span>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-zari-gold/10 px-5 py-4 bg-fabric-cream/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

                    <div>
                      <h4 className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-2">
                        Customer
                      </h4>
                      <p className="font-body text-sm text-ink-charcoal">
                        {order.customer.fullName}
                      </p>
                      <p className="font-mono text-sm text-ink-charcoal/70">
                        {order.customer.phone}
                      </p>
                      {order.customer.email && (
                        <p className="font-body text-sm text-ink-charcoal/70">
                          {order.customer.email}
                        </p>
                      )}
                      
                      <a
                        href={
                          "https://wa.me/92" +
                          order.customer.phone.replace(/^0/, "").replace(/\s/g, "") +
                          "?text=" +
                          encodeURIComponent(
                            "Hi " + order.customer.fullName + "! Your order " + order.orderId + " update:"
                          )
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 px-3 py-1.5 rounded-lg text-xs font-body font-semibold text-white"
                        style={{ backgroundColor: "#25D366" }}
                      >
                        WhatsApp Customer
                      </a>
                    </div>

                    <div>
                      <h4 className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-2">
                        Delivery Address
                      </h4>
                      <p className="font-body text-sm text-ink-charcoal/80 leading-relaxed">
                        {order.deliveryAddress.address}
                        <br />
                        {order.deliveryAddress.city}, {order.deliveryAddress.province}
                        {order.deliveryAddress.postalCode && (
                          <> — {order.deliveryAddress.postalCode}</>
                        )}
                      </p>
                      <p className="font-body text-xs text-ink-charcoal/50 mt-2 capitalize">
                        Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-body text-xs text-ink-charcoal/50 uppercase tracking-wider mb-2">
                        Items
                      </h4>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between font-body text-sm text-ink-charcoal/80 mb-1">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-mono">{formatPKR(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-body text-sm font-semibold text-ink-charcoal border-t border-zari-gold/20 mt-2 pt-2">
                        <span>Total</span>
                        <span className="font-mono text-thread-maroon">{formatPKR(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Updater */}
                  <div className="flex items-center gap-3 pt-3 border-t border-zari-gold/10">
                    <label className="font-body text-sm text-ink-charcoal/70">
                      Update Status:
                    </label>
                    <select
                      value={order.status}
                      disabled={updating === order.orderId}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="px-4 py-2 rounded-xl border border-zari-gold/30 bg-white font-body text-sm text-ink-charcoal focus:outline-none focus:border-zari-gold capitalize"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                    {updating === order.orderId && (
                      <span className="font-body text-xs text-ink-charcoal/50">
                        Updating...
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders