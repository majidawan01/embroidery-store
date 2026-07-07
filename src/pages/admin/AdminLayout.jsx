import { useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { adminLogout } from "../../services/api"

function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const adminName = localStorage.getItem("adminName") || "Admin"

  function handleLogout() {
    adminLogout()
    navigate("/admin/login")
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Products", path: "/admin/products", icon: "🧵" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Reviews", path: "/admin/reviews", icon: "⭐" },
  ]
  return (
    <div className="min-h-screen bg-fabric-cream flex">

      {/* Sidebar */}
      <aside
        className={
          (sidebarOpen ? "translate-x-0" : "-translate-x-full") +
          " md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-ink-charcoal flex flex-col transition-transform duration-300"
        }
      >
        <div className="p-6 border-b border-fabric-cream/10">
          <h1 className="font-display text-xl font-semibold">
            <span className="text-fabric-cream">Embroidery</span>{" "}
            <span className="text-zari-gold">Store</span>
          </h1>
          <p className="font-body text-fabric-cream/50 text-xs mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-thread-maroon text-white font-body text-sm font-semibold"
                  : "flex items-center gap-3 px-4 py-3 rounded-xl text-fabric-cream/70 hover:text-fabric-cream hover:bg-white/5 font-body text-sm transition-colors"
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-fabric-cream/10">
          <Link
            to="/"
            className="block text-center font-body text-xs text-fabric-cream/50 hover:text-zari-gold mb-3 transition-colors"
          >
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl border border-fabric-cream/20 text-fabric-cream/70 hover:text-white hover:border-thread-maroon hover:bg-thread-maroon font-body text-sm transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-zari-gold/20 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button
            className="md:hidden text-2xl text-ink-charcoal"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="hidden md:block" />
          <p className="font-body text-sm text-ink-charcoal">
            Welcome, <span className="font-semibold">{adminName}</span>
          </p>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout