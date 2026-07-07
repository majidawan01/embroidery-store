import { useState } from "react"
import StitchDivider from "../components/StitchDivider"

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  function handleSubmit() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.message.trim()) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // WhatsApp par message bhejta hai — backend ki zaroorat nahi
    const whatsappMessage =
      "New Inquiry from Website\n\n" +
      "Name: " + form.name + "\n" +
      (form.phone ? "Phone: " + form.phone + "\n" : "") +
      "Subject: " + form.subject + "\n\n" +
      "Message:\n" + form.message

    window.open(
      "https://wa.me/923440232857?text=" + encodeURIComponent(whatsappMessage),
      "_blank"
    )
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-zari-gold/30 bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold"

  const inputErrorClass =
    "w-full px-4 py-3 rounded-xl border border-red-400 bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none"

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-ink-charcoal py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-fabric-cream font-bold mb-4">
            We'd love to hear from you
          </h1>
          <p className="font-body text-fabric-cream/70 text-base max-w-xl mx-auto">
            Questions, custom orders, or wholesale inquiries — our team responds within a few hours
          </p>
        </div>
      </section>

      {/* ── Quick Contact Cards — hero par overlap ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <a
            href="https://wa.me/923440232857?text=Hi! I have a question."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 text-center shadow-md border border-zari-gold/10 hover:border-zari-gold/50 hover:-translate-y-1 transition-all duration-200"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#25D36620" }}
            >
              <svg className="w-6 h-6" style={{ fill: "#25D366" }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.48 4.905 1.481 5.423 0 9.834-4.358 9.837-9.714.002-2.594-1.01-5.032-2.852-6.876C16.635 2.199 14.21 1.185 11.793 1.185c-5.417 0-9.827 4.358-9.83 9.713a9.615 9.615 0 0 0 1.448 4.82l-1.024 3.733 3.843-.997zM16.82 14.1c-.266-.134-1.573-.767-1.817-.855-.245-.088-.423-.133-.6.134-.178.265-.689.855-.845 1.032-.155.177-.312.199-.579.066-.266-.132-1.123-.41-2.138-1.306-.792-.699-1.324-1.564-1.48-1.831-.155-.266-.016-.41.117-.542.12-.12.266-.31.4-.464.133-.156.178-.266.266-.442.089-.178.045-.332-.022-.464-.067-.132-.6-1.424-.822-1.956-.217-.517-.436-.445-.598-.454-.156-.008-.334-.01-.51-.01s-.468.066-.713.332c-.244.266-.934.905-.934 2.209s.957 2.56 1.09 2.737c.134.177 1.885 2.85 4.566 3.994.638.272 1.136.435 1.525.557.64.202 1.22.174 1.68.107.513-.077 1.574-.637 1.795-1.251.223-.614.223-1.14.156-1.251-.067-.111-.244-.177-.51-.31z" />
              </svg>
            </div>
            <h3 className="font-body font-semibold text-ink-charcoal text-sm mb-1">
              WhatsApp
            </h3>
            <p className="font-mono text-xs text-ink-charcoal/60">
              +92 344 0232857
            </p>
            <p className="font-body text-xs text-thread-sage mt-2 font-semibold">
              Fastest — usually within 1 hour
            </p>
          </a>

          <a
            href="mailto:info@embroiderystore.com"
            className="bg-white rounded-2xl p-6 text-center shadow-md border border-zari-gold/10 hover:border-zari-gold/50 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-zari-gold/15 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✉️</span>
            </div>
            <h3 className="font-body font-semibold text-ink-charcoal text-sm mb-1">
              Email
            </h3>
            <p className="font-body text-xs text-ink-charcoal/60">
              info@embroiderystore.com
            </p>
            <p className="font-body text-xs text-thread-sage mt-2 font-semibold">
              Response within 24 hours
            </p>
          </a>

          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-zari-gold/10">
            <div className="w-12 h-12 rounded-full bg-thread-maroon/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="font-body font-semibold text-ink-charcoal text-sm mb-1">
              Workshop
            </h3>
            <p className="font-body text-xs text-ink-charcoal/60">
              Lahore, Punjab, Pakistan
            </p>
            <p className="font-body text-xs text-thread-sage mt-2 font-semibold">
              Visits by appointment
            </p>
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Form — 3 columns */}
          <div className="md:col-span-3">
            <h2 className="font-display text-2xl text-ink-charcoal font-semibold mb-2">
              Send us a message
            </h2>
            <p className="font-body text-sm text-ink-charcoal/60 mb-6">
              Fill the form below and it will open in WhatsApp — ready to send.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Muhammad Ali"
                  className={errors.name ? inputErrorClass : inputClass}
                />
                {errors.name && (
                  <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03001234567"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>General Inquiry</option>
                  <option>Custom Order</option>
                  <option>Order Issue</option>
                  <option>Wholesale / Bulk Order</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div>
                <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className={errors.message ? inputErrorClass : inputClass}
                />
                {errors.message && (
                  <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl font-body font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-200"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.48 4.905 1.481 5.423 0 9.834-4.358 9.837-9.714.002-2.594-1.01-5.032-2.852-6.876C16.635 2.199 14.21 1.185 11.793 1.185c-5.417 0-9.827 4.358-9.83 9.713a9.615 9.615 0 0 0 1.448 4.82l-1.024 3.733 3.843-.997zM16.82 14.1c-.266-.134-1.573-.767-1.817-.855-.245-.088-.423-.133-.6.134-.178.265-.689.855-.845 1.032-.155.177-.312.199-.579.066-.266-.132-1.123-.41-2.138-1.306-.792-.699-1.324-1.564-1.48-1.831-.155-.266-.016-.41.117-.542.12-.12.266-.31.4-.464.133-.156.178-.266.266-.442.089-.178.045-.332-.022-.464-.067-.132-.6-1.424-.822-1.956-.217-.517-.436-.445-.598-.454-.156-.008-.334-.01-.51-.01s-.468.066-.713.332c-.244.266-.934.905-.934 2.209s.957 2.56 1.09 2.737c.134.177 1.885 2.85 4.566 3.994.638.272 1.136.435 1.525.557.64.202 1.22.174 1.68.107.513-.077 1.574-.637 1.795-1.251.223-.614.223-1.14.156-1.251-.067-.111-.244-.177-.51-.31z" />
                </svg>
                <span>Send via WhatsApp</span>
              </button>
              <p className="font-body text-xs text-ink-charcoal/50 text-center">
                Clicking the button opens WhatsApp with your message pre-filled
              </p>
            </div>
          </div>

          {/* Business Info — 2 columns */}
          <div className="md:col-span-2 flex flex-col gap-6">

            <div className="bg-white rounded-2xl p-6 border border-zari-gold/10 shadow-sm">
              <h3 className="font-display text-lg text-ink-charcoal font-semibold mb-4">
                Business Hours
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { day: "Monday - Saturday", time: "10:00 AM - 8:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span className="font-body text-sm text-ink-charcoal/70">{item.day}</span>
                    <span className="font-body text-sm text-ink-charcoal font-semibold">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-ink-charcoal/50 mt-4 pt-4 border-t border-zari-gold/10">
                WhatsApp messages are answered 7 days a week
              </p>
            </div>

            <div className="bg-ink-charcoal rounded-2xl p-6">
              <h3 className="font-display text-lg text-fabric-cream font-semibold mb-3">
                Custom Orders
              </h3>
              <p className="font-body text-sm text-fabric-cream/70 leading-relaxed mb-4">
                Have a design in mind? Share your idea, reference photos, and requirements — 
                our artisans will bring it to life. Bridal wear, formal pieces, home decor, and more.
              </p>
              
              <a
                href="https://wa.me/923440232857?text=Hi! I want to discuss a custom order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-xl font-body text-sm font-semibold border border-zari-gold text-zari-gold hover:bg-zari-gold hover:text-ink-charcoal transition-all duration-200"
              >
                Start Custom Order
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage