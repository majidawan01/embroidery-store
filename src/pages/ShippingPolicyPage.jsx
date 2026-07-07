import { Link } from "react-router-dom"
import StitchDivider from "../components/StitchDivider"

function ShippingPolicyPage() {
  return (
    <div className="min-h-screen">

      <section className="bg-ink-charcoal py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Our Policies
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold mb-3">
            Shipping & Delivery Policy
          </h1>
          <p className="font-body text-fabric-cream/60 text-sm">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Delivery Timeline Table */}
        <div className="bg-white rounded-2xl border border-zari-gold/10 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-zari-gold/10 bg-fabric-cream/50">
            <h2 className="font-display text-lg text-ink-charcoal font-semibold">
              Delivery Timelines
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zari-gold/10">
                  <th className="text-left px-6 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Location</th>
                  <th className="text-left px-6 py-3 font-body text-xs text-ink-charcoal/50 uppercase tracking-wider">Estimated Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { location: "Lahore", time: "2-3 working days" },
                  { location: "Karachi, Islamabad, Rawalpindi", time: "3-5 working days" },
                  { location: "Other major cities", time: "3-5 working days" },
                  { location: "Remote areas", time: "5-7 working days" },
                  { location: "Custom orders", time: "Confirmed via WhatsApp" },
                ].map((row) => (
                  <tr key={row.location} className="border-b border-zari-gold/5">
                    <td className="px-6 py-3.5 font-body text-sm text-ink-charcoal font-semibold">{row.location}</td>
                    <td className="px-6 py-3.5 font-body text-sm text-ink-charcoal/70">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policy Sections */}
        {[
          {
            title: "Order Processing",
            content: "Orders are processed within 1-2 working days after confirmation. Since every piece is handmade, some products may require additional preparation time — this is always mentioned on the product page or communicated via WhatsApp. Orders placed on Sundays or public holidays are processed the next working day.",
          },
          {
            title: "Delivery Charges",
            content: "Delivery charges depend on your city, order weight, and size. Exact charges are confirmed via WhatsApp after you place your order. We regularly run free delivery promotions on larger orders — follow our announcements to stay updated.",
          },
          {
            title: "Order Confirmation",
            content: "After placing your order, our team will contact you on WhatsApp to confirm your order details, delivery address, and delivery charges. Please keep your phone available. Orders that cannot be confirmed within 3 days may be cancelled.",
          },
          {
            title: "Courier Partners",
            content: "We ship through trusted courier services across Pakistan including TCS, Leopards, and M&P. Once shipped, you will receive a tracking update on WhatsApp, and you can always check your order status on our Track Order page.",
          },
          {
            title: "International Shipping",
            content: "We currently deliver across Pakistan. For international orders (UK, USA, UAE, and other countries), contact us on WhatsApp — we arrange international shipping for our overseas customers on a case-by-case basis. International delivery charges and timelines vary by destination.",
          },
          {
            title: "Delayed or Lost Shipments",
            content: "While we work with reliable couriers, occasional delays can happen due to weather, holidays, or courier issues. If your order is significantly delayed, contact us on WhatsApp with your order ID — we will track it down and keep you updated until it reaches you.",
          },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-3 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-thread-maroon rounded-full inline-block" />
              {section.title}
            </h2>
            <p className="font-body text-sm text-ink-charcoal/70 leading-relaxed pl-5">
              {section.content}
            </p>
          </div>
        ))}

        <StitchDivider />

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="font-body text-sm text-ink-charcoal/60 mb-4">
            Questions about your delivery?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/track-order"
              className="px-6 py-3 rounded-xl font-body text-sm font-semibold bg-thread-maroon text-white hover:bg-thread-maroon/90 transition-colors duration-200"
            >
              Track Your Order
            </Link>
            <a
              href="https://wa.me/923440232857?text=Hi! I have a question about delivery."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-body text-sm font-semibold text-white"
              style={{ backgroundColor: "#25D366" }}
            >
              WhatsApp Support
            </a>
          </div>
        </div>

      </section>
    </div>
  )
}

export default ShippingPolicyPage