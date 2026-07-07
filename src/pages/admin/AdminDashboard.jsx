import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchAllOrders, fetchProducts } from "../../services/api"
import LoadingSpinner from "../../components/LoadingSpinner"

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  useEffect(() => {
    async function loadData() {
      try {
        const [orders, products] = await Promise.all([
          fetchAllOrders(),
          fetchProducts(),
        ])

        const pendingOrders = orders.filter((o) => o.status === "pending")
        const totalRevenue = orders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.totalAmount, 0)
        const lowStock = products.filter((p) => p.stock <= 3)

        setStats({
          totalOrders: orders.length,
          pendingOrders: pendingOrders.length,
          totalProducts: products.length,
          totalRevenue,
          lowStockCount: lowStock.length,
        })
        setRecentOrders(orders.slice(0, 5))
      } catch (error) {
        console.error("Dashboard load failed:", error.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (!stats) return <p className="font-body text-ink-charcoal/60">Failed to load dashboard.</p>

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, icon: "📦" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: "⏳" },
    { label: "Total Products", value: stats.totalProducts, icon: "🧵" },
    { label: "Total Revenue", value: formatPKR(stats.totalRevenue), icon: "💰" },
  ]

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink-charcoal font-semibold mb-6">
        Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-zari-gold/10"
          >
            <span className="text-2xl">{card.icon}</span>
            <p className="font-mono text-xl text-thread-maroon font-semibold mt-3">
              {card.value}
            </p>
            <p className="font-body text-xs text-ink-charcoal/60 mt-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
          <p className="font-body text-sm text-yellow-800">
            ⚠️ {stats.lowStockCount} {stats.lowStockCount === 1 ? "product has" : "products have"} low stock (3 or less)
          </p>
          <Link
            to="/admin/products"
            className="font-body text-sm text-yellow-800 font-semibold hover:underline"
          >
            View Products
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-zari-gold/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-zari-gold/10 flex items-center justify-between">
          <h2 className="font-display text-lg text-ink-charcoal font-semibold">
            Recent Orders
          </h2>
          <Link
            to="/admin/orders"
            className="font-body text-sm text-thread-maroon font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="p-5 font-body text-sm text-ink-charcoal/60">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zari-gold/10">
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Total</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-zari-gold/5 hover:bg-fabric-cream/50">
                    <td className="px-5 py-3 font-mono text-sm text-thread-maroon">{order.orderId}</td>
                    <td className="px-5 py-3 font-body text-sm text-ink-charcoal">{order.customer.fullName}</td>
                    <td className="px-5 py-3 font-mono text-sm text-ink-charcoal">{formatPKR(order.totalAmount)}</td>
                    <td className="px-5 py-3">
                      <span className={"px-2.5 py-1 rounded-full text-xs font-body font-semibold " + (statusColors[order.status] || "")}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard