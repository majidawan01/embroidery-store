import { useState } from "react"
import { createProductAdmin, updateProductAdmin } from "../../services/api"

const categoryOptions = ["Zari Work", "Thread Embroidery", "Mirror Work", "Cutwork & Lace"]

function ProductFormModal({ product, onClose, onSaved }) {
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "Zari Work",
    price: product?.price || "",
    comparePrice: product?.comparePrice || "",
    sku: product?.sku || "",
    stock: product?.stock ?? "",
    isNew: product?.isNew || false,
    isSale: product?.isSale || false,
    description: product?.description || "",
    fabric: product?.fabric || "",
    stitchTime: product?.stitchTime || "",
    color: product?.color || "",
    care: product?.care || "",
    image1: product?.images?.[0] || "",
    image2: product?.images?.[1] || "",
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.price || !form.sku.trim() || !form.description.trim()) {
      setError("Name, price, SKU and description are required")
      return
    }

    const productData = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
      sku: form.sku,
      stock: Number(form.stock) || 0,
      isNew: form.isNew,
      isSale: form.isSale,
      description: form.description,
      fabric: form.fabric,
      stitchTime: form.stitchTime,
      color: form.color,
      care: form.care,
      images: [form.image1, form.image2].filter(Boolean),
    }

    try {
      setSaving(true)
      setError("")
      if (isEdit) {
        await updateProductAdmin(product.id, productData)
      } else {
        await createProductAdmin(productData)
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-zari-gold/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink-charcoal font-semibold">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-ink-charcoal/40 hover:text-ink-charcoal"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">

          <div>
            <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Product Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Royal Zari Bridal Dupatta" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">SKU *</label>
              <input type="text" name="sku" value={form.sku} onChange={handleChange} placeholder="ZW-004" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Price (Rs.) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="5000" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Compare Price</label>
              <input type="number" name="comparePrice" value={form.comparePrice} onChange={handleChange} placeholder="7000" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Stock *</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="10" className={inputClass} />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 font-body text-sm text-ink-charcoal cursor-pointer">
              <input type="checkbox" name="isSale" checked={form.isSale} onChange={handleChange} className="accent-thread-maroon w-4 h-4" />
              On Sale
            </label>
            <label className="flex items-center gap-2 font-body text-sm text-ink-charcoal cursor-pointer">
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="accent-thread-maroon w-4 h-4" />
              New Arrival
            </label>
          </div>

          <div>
            <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Handcrafted with..." className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Fabric</label>
              <input type="text" name="fabric" value={form.fabric} onChange={handleChange} placeholder="Pure Silk" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Stitch Time</label>
              <input type="text" name="stitchTime" value={form.stitchTime} onChange={handleChange} placeholder="40+ hours" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Color</label>
              <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Ivory & Gold" className={inputClass} />
            </div>
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Care Instructions</label>
              <input type="text" name="care" value={form.care} onChange={handleChange} placeholder="Dry clean only" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Image URL 1</label>
            <input type="text" name="image1" value={form.image1} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">Image URL 2</label>
            <input type="text" name="image2" value={form.image2} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>

          {error && (
            <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl p-3 text-center">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-body text-sm font-semibold border border-zari-gold/30 text-ink-charcoal hover:bg-fabric-cream transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={
                saving
                  ? "flex-1 py-3 bg-thread-maroon/60 text-white font-body text-sm font-semibold rounded-xl cursor-wait"
                  : "flex-1 py-3 bg-thread-maroon text-white font-body text-sm font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
              }
            >
              {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFormModal