import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { createOrder } from "../services/api"
import StitchDivider from "../components/StitchDivider"

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
]

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    payment: "cod",
  })

  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState("")

  const formatPKR = (amount) => "Rs. " + amount.toLocaleString("en-PK")

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!form.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^(\+92|0)[0-9]{10}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid Pakistani phone number"
    if (!form.address.trim()) newErrors.address = "Address is required"
    if (!form.city) newErrors.city = "Please select a city"
    if (!form.province.trim()) newErrors.province = "Province is required"
    return newErrors
  }

  async function handleSubmit() {
    if (cartItems.length === 0) return
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setPlacing(true)
      setOrderError("")

      const orderData = {
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
        },
        deliveryAddress: {
          address: form.address,
          city: form.city,
          province: form.province,
          postalCode: form.postalCode,
        },
        items: cartItems.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod: form.payment,
        totalAmount: cartTotal,
      }

      const order = await createOrder(orderData)

      clearCart()
      navigate("/order-confirmation", {
        state: { orderId: order.orderId, form, cartItems, cartTotal },
      })
    } catch (error) {
      setOrderError(error.message)
    } finally {
      setPlacing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="font-display text-3xl text-ink-charcoal mb-3">
          Your Cart is Empty
        </h2>
        <p className="font-body text-ink-charcoal/60 mb-6">
          Add some products before checking out.
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
            Almost There
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold">
            Checkout
          </h1>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 flex flex-col gap-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10">
              <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
                Customer Information
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Muhammad Ali"
                    className={
                      errors.fullName
                        ? "w-full px-4 py-2.5 rounded-xl border border-red-400 bg-white font-body text-ink-charcoal focus:outline-none"
                        : "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
                    }
                  />
                  {errors.fullName && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                    Phone Number * (+92)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03440232857"
                    className={
                      errors.phone
                        ? "w-full px-4 py-2.5 rounded-xl border border-red-400 bg-white font-mono text-ink-charcoal focus:outline-none"
                        : "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-mono text-ink-charcoal focus:outline-none focus:border-zari-gold"
                    }
                  />
                  {errors.phone && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@gamil.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10">
              <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
                Delivery Address
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House 12, Street 5, Model Town"
                    className={
                      errors.address
                        ? "w-full px-4 py-2.5 rounded-xl border border-red-400 bg-white font-body text-ink-charcoal focus:outline-none"
                        : "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
                    }
                  />
                  {errors.address && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                      City *
                    </label>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={
                        errors.city
                          ? "w-full px-4 py-2.5 rounded-xl border border-red-400 bg-white font-body text-ink-charcoal focus:outline-none"
                          : "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
                      }
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                      Province *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      placeholder="Punjab"
                      className={
                        errors.province
                          ? "w-full px-4 py-2.5 rounded-xl border border-red-400 bg-white font-body text-ink-charcoal focus:outline-none"
                          : "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal focus:outline-none focus:border-zari-gold"
                      }
                    />
                    {errors.province && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.province}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="54000"
                    className="w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-mono text-ink-charcoal focus:outline-none focus:border-zari-gold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10">
              <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: "💵" },
                  { value: "jazzcash", label: "JazzCash", desc: "Pay via JazzCash mobile account", icon: "📱" },
                  { value: "easypaisa", label: "Easypaisa", desc: "Pay via Easypaisa mobile account", icon: "📲" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={
                      form.payment === method.value
                        ? "flex items-center gap-4 p-4 rounded-xl border-2 border-thread-maroon bg-thread-maroon/5 cursor-pointer"
                        : "flex items-center gap-4 p-4 rounded-xl border border-zari-gold/20 bg-white cursor-pointer hover:border-zari-gold/50 transition-colors"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.payment === method.value}
                      onChange={handleChange}
                      className="accent-thread-maroon w-4 h-4"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-body font-semibold text-ink-charcoal text-sm">
                        {method.label}
                      </p>
                      <p className="font-body text-xs text-ink-charcoal/60">
                        {method.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zari-gold/10 sticky top-24">
              <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <span className="font-body text-sm text-ink-charcoal/70 flex-1">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-mono text-sm text-ink-charcoal font-semibold whitespace-nowrap">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zari-gold/20 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm text-ink-charcoal/70">Subtotal</span>
                  <span className="font-mono text-sm text-ink-charcoal">{formatPKR(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-sm text-ink-charcoal/70">Delivery</span>
                  <span className="font-body text-sm text-thread-sage font-semibold">Calculated later</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-ink-charcoal">Total</span>
                  <span className="font-mono text-xl text-thread-maroon font-semibold">
                    {formatPKR(cartTotal)}
                  </span>
                </div>
              </div>
              {orderError && (
                <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl p-3 mb-3 text-center">
                  {orderError}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={placing}
                className={
                  placing
                    ? "w-full py-3.5 bg-thread-maroon/60 text-white font-body font-semibold rounded-xl cursor-wait"
                    : "w-full py-3.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
                }
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>
              <p className="font-body text-xs text-ink-charcoal/50 text-center mt-3">
                By placing your order you agree to our terms and conditions
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default CheckoutPage