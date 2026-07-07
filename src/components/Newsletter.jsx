import { useState } from "react"

function Newsletter() {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  function handleSubscribe() {
    const cleaned = phone.replace(/\s/g, "")
    if (!cleaned) {
      setError("Please enter your WhatsApp number")
      return
    }
    if (!/^(\+92|0)[0-9]{10}$/.test(cleaned)) {
      setError("Please enter a valid Pakistani number e.g. 03001234567")
      return
    }

    setError("")
    const message =
      "Hi! I want to subscribe to new collection updates and exclusive offers. My number: " + phone

    window.open(
      "https://wa.me/923440232857?text=" + encodeURIComponent(message),
      "_blank"
    )
    setPhone("")
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative bg-thread-maroon rounded-3xl overflow-hidden">

        {/* Decorative stitch border inside */}
        <div className="absolute inset-4 border-2 border-dashed border-zari-gold/40 rounded-2xl pointer-events-none" />

        <div className="relative px-6 py-12 md:py-16 text-center">
          <span className="text-3xl mb-4 block">🧵</span>
          <h2 className="font-display text-2xl md:text-3xl text-white font-semibold mb-3">
            Be First to See New Collections
          </h2>
          <p className="font-body text-white/80 text-sm md:text-base max-w-md mx-auto mb-8">
            Join our WhatsApp list for new arrivals, exclusive offers, and
            behind-the-scenes from our workshop — no spam, ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setError("")
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Your WhatsApp number e.g. 03001234567"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/50 border-2 border-white focus:outline-none focus:ring-2 focus:ring-zari-gold shadow-md"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3.5 rounded-xl font-body text-sm font-semibold text-ink-charcoal bg-zari-gold hover:bg-zari-gold/90 active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>

          {error && (
            <p className="font-body text-xs text-white bg-white/10 rounded-lg px-4 py-2 mt-4 inline-block">
              {error}
            </p>
          )}

          <p className="font-body text-xs text-white/50 mt-6">
            By subscribing you agree to receive updates on WhatsApp. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter