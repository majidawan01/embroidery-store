import { useState, useEffect } from "react"
import { fetchProducts, deleteProductAdmin } from "../../services/api"
import LoadingSpinner from "../../components/LoadingSpinner"
import ProductFormModal from "./ProductFormModal"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error("Failed to load products:", error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      'Delete "' + product.name + '"? This cannot be undone.'
    )
    if (!confirmed) return

    try {
      setDeleting(product.id)
      await deleteProductAdmin(product.id)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } catch (error) {
      alert("Delete failed: " + error.message)
    } finally {
      setDeleting(null)
    }
  }

  function openAddModal() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function openEditModal(product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  function handleSaved() {
    setModalOpen(false)
    loadProducts()
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl text-ink-charcoal font-semibold">
          Products
        </h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-thread-maroon text-white font-body text-sm font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
        >
          + Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/40 focus:outline-none focus:border-zari-gold mb-6"
      />

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-zari-gold/10">
          <span className="text-4xl mb-3 block">🧵</span>
          <p className="font-body text-ink-charcoal/60">No products found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-zari-gold/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zari-gold/10 bg-fabric-cream/50">
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">SKU</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Stock</th>
                  <th className="text-right px-5 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-zari-gold/5 hover:bg-fabric-cream/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="font-body text-sm text-ink-charcoal font-semibold">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-ink-charcoal/60">{product.sku}</td>
                    <td className="px-5 py-3 font-body text-sm text-ink-charcoal/70">{product.category}</td>
                    <td className="px-5 py-3 font-mono text-sm text-thread-maroon font-semibold">{formatPKR(product.price)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          product.stock === 0
                            ? "font-mono text-sm text-red-600 font-semibold"
                            : product.stock <= 3
                            ? "font-mono text-sm text-yellow-600 font-semibold"
                            : "font-mono text-sm text-ink-charcoal"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1.5 rounded-lg font-body text-xs font-semibold text-thread-maroon border border-thread-maroon/30 hover:bg-thread-maroon hover:text-white transition-colors mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deleting === product.id}
                        className="px-3 py-1.5 rounded-lg font-body text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                      >
                        {deleting === product.id ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}

export default AdminProducts