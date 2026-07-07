import { useState } from "react"
import { Link } from "react-router-dom"

const faqData = [
  {
    category: "Orders & Payment",
    icon: "💳",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add your favorites to the cart, and proceed to checkout. Fill in your delivery details, choose a payment method, and place your order. You will receive an order ID to track your order anytime.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash on Delivery (COD), JazzCash, and Easypaisa. Cash on Delivery is available in all major cities of Pakistan — you pay only when your order arrives at your doorstep.",
      },
      {
        q: "Is Cash on Delivery available in my city?",
        a: "COD is available in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala and most other cities across Pakistan. If your city is not listed at checkout, contact us on WhatsApp.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Yes — as long as your order has not been shipped. Contact us on WhatsApp with your order ID as soon as possible and we will help you modify or cancel it.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Orders within Lahore are typically delivered in 2-3 working days. Other major cities take 3-5 working days. Remote areas may take 5-7 working days. Since each piece is handmade, custom orders may require additional preparation time which we will confirm on WhatsApp.",
      },
      {
        q: "What are the delivery charges?",
        a: "Delivery charges depend on your city and order size, and are confirmed via WhatsApp after you place your order. We regularly offer free delivery promotions on larger orders — keep an eye on our announcements!",
      },
      {
        q: "How can I track my order?",
        a: "Use our Track Order page — just enter your order ID (starts with EMB-) and you will see the live status of your order. You can also message us on WhatsApp anytime for updates.",
      },
      {
        q: "Do you deliver internationally?",
        a: "Currently we deliver across Pakistan. For international orders (UK, USA, UAE), please contact us on WhatsApp — we arrange international shipping on a case-by-case basis for our overseas customers.",
      },
    ],
  },
  {
    category: "Products & Quality",
    icon: "🧵",
    questions: [
      {
        q: "Are your products really handmade?",
        a: "Yes — 100%. Every piece is handcrafted by our skilled artisans in Lahore, many of whom have been perfecting their craft for decades. The stitch time for each product is mentioned on its page, ranging from 8 to 40+ hours of work.",
      },
      {
        q: "Will the product look exactly like the photos?",
        a: "Handmade products have slight natural variations — that is what makes each piece unique and authentic. Colors may vary slightly due to screen settings and photography lighting. Any significant differences are always communicated before shipping.",
      },
      {
        q: "How should I care for my embroidery products?",
        a: "Care instructions are listed on every product page. Generally, zari and delicate embroidery items should be dry cleaned only, while thread embroidery on cotton can often be gently hand washed. Always store embroidered items folded with tissue paper to protect the work.",
      },
      {
        q: "Can I order a custom design?",
        a: "Absolutely! Custom orders are our specialty. Contact us on WhatsApp with your design idea, reference pictures, and requirements. Our team will discuss fabric options, timeline, and pricing with you directly.",
      },
    ],
  },
  {
    category: "Returns & Exchange",
    icon: "🔄",
    questions: [
      {
        q: "What is your return policy?",
        a: "If you receive a damaged or incorrect product, contact us within 48 hours of delivery with photos, and we will arrange a replacement or refund. Due to the handmade nature of our products, we do not accept returns for change of mind, but exchanges may be possible.",
      },
      {
        q: "What if my product arrives damaged?",
        a: "We pack every order with great care, but if something goes wrong in transit, send us photos of the damaged item and packaging on WhatsApp within 48 hours. We will send a replacement or issue a full refund — no questions asked.",
      },
      {
        q: "How do refunds work for prepaid orders?",
        a: "For JazzCash and Easypaisa payments, refunds are processed back to your mobile account within 3-5 working days after the return is approved.",
      },
    ],
  },
]

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [openItem, setOpenItem] = useState(null)

  // Filter logic — search + category
  const filteredData = faqData
    .filter((section) => activeCategory === "All" || section.category === activeCategory)
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0)

  const totalResults = filteredData.reduce((sum, s) => sum + s.questions.length, 0)

  return (
    <div className="min-h-screen">

      {/* ── Hero with Search ── */}
      <section className="bg-ink-charcoal py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Help Center
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-fabric-cream font-bold mb-8">
            How can we help you?
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-charcoal/40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setOpenItem(null)
              }}
              placeholder="Search for answers... e.g. delivery, refund, custom order"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white font-body text-ink-charcoal placeholder:text-ink-charcoal/40 focus:outline-none focus:ring-2 focus:ring-zari-gold shadow-lg"
            />
          </div>
          {searchQuery && (
            <p className="font-body text-sm text-fabric-cream/60 mt-4">
              {totalResults} {totalResults === 1 ? "result" : "results"} found
            </p>
          )}
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => { setActiveCategory("All"); setOpenItem(null) }}
            className={
              activeCategory === "All"
                ? "flex flex-col items-center gap-1 py-4 px-2 rounded-2xl bg-thread-maroon text-white shadow-md"
                : "flex flex-col items-center gap-1 py-4 px-2 rounded-2xl bg-white text-ink-charcoal border border-zari-gold/20 hover:border-zari-gold/60 shadow-sm transition-all duration-200"
            }
          >
            <span className="text-xl">📋</span>
            <span className="font-body text-xs font-semibold">All Topics</span>
          </button>
          {faqData.map((section) => (
            <button
              key={section.category}
              onClick={() => { setActiveCategory(section.category); setOpenItem(null) }}
              className={
                activeCategory === section.category
                  ? "flex flex-col items-center gap-1 py-4 px-2 rounded-2xl bg-thread-maroon text-white shadow-md"
                  : "flex flex-col items-center gap-1 py-4 px-2 rounded-2xl bg-white text-ink-charcoal border border-zari-gold/20 hover:border-zari-gold/60 shadow-sm transition-all duration-200"
              }
            >
              <span className="text-xl">{section.icon}</span>
              <span className="font-body text-xs font-semibold text-center leading-tight">
                {section.category}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ Accordions ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="font-display text-2xl text-ink-charcoal mb-2">
              No results found
            </h3>
            <p className="font-body text-ink-charcoal/60 mb-6">
              Try different keywords or ask us directly on WhatsApp
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
              className="px-6 py-2.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredData.map((section) => (
            <div key={section.category} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{section.icon}</span>
                <h2 className="font-display text-xl text-ink-charcoal font-semibold">
                  {section.category}
                </h2>
                <div className="flex-1 border-t border-dashed border-zari-gold/40 ml-2" />
              </div>

              <div className="flex flex-col gap-2">
                {section.questions.map((item) => {
                  const key = section.category + "-" + item.q
                  const isOpen = openItem === key
                  return (
                    <div
                      key={key}
                      className={
                        isOpen
                          ? "bg-white rounded-2xl border-l-4 border-thread-maroon shadow-md overflow-hidden transition-all duration-200"
                          : "bg-white rounded-2xl border-l-4 border-transparent shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
                      }
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                      >
                        <span
                          className={
                            isOpen
                              ? "font-body text-sm font-semibold text-thread-maroon"
                              : "font-body text-sm font-semibold text-ink-charcoal"
                          }
                        >
                          {item.q}
                        </span>
                        <span
                          className={
                            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 " +
                            (isOpen
                              ? "bg-thread-maroon text-white rotate-180"
                              : "bg-fabric-cream text-thread-maroon")
                          }
                        >
                          ▾
                        </span>
                      </button>

                      <div
                        className={
                          "grid transition-all duration-300 ease-in-out " +
                          (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                        }
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 font-body text-sm text-ink-charcoal/70 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}

        {/* ── Contact Escalation ── */}
        <div className="mt-12 bg-ink-charcoal rounded-3xl p-8 md:p-10 text-center">
          <h3 className="font-display text-2xl text-fabric-cream font-semibold mb-2">
            Can't find what you're looking for?
          </h3>
          <p className="font-body text-sm text-fabric-cream/60 mb-8 max-w-md mx-auto">
            Our support team is available 7 days a week and usually responds within a few hours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href="https://wa.me/923440232857?text=Hi! I have a question."
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-zari-gold/50 transition-colors duration-200"
            >
              <span className="text-2xl">💬</span>
              <span className="font-body text-sm text-fabric-cream font-semibold">WhatsApp</span>
              <span className="font-body text-xs text-fabric-cream/50">Fastest response</span>
            </a>
            <Link
              to="/track-order"
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-zari-gold/50 transition-colors duration-200"
            >
              <span className="text-2xl">📦</span>
              <span className="font-body text-sm text-fabric-cream font-semibold">Track Order</span>
              <span className="font-body text-xs text-fabric-cream/50">Check order status</span>
            </Link>
            <a
              href="mailto:info@embroiderystore.com"
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-zari-gold/50 transition-colors duration-200"
            >
              <span className="text-2xl">✉️</span>
              <span className="font-body text-sm text-fabric-cream font-semibold">Email Us</span>
              <span className="font-body text-xs text-fabric-cream/50">For detailed queries</span>
            </a>
          </div>
        </div>

      </section>
    </div>
  )
}

export default FAQPage