import { Link } from "react-router-dom"
import StitchDivider from "../components/StitchDivider"

function ReturnPolicyPage() {
  return (
    <div className="min-h-screen">

      <section className="bg-ink-charcoal py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-3 block">
            Our Policies
          </span>
          <h1 className="font-display text-4xl text-fabric-cream font-bold mb-3">
            Return & Exchange Policy
          </h1>
          <p className="font-body text-fabric-cream/60 text-sm">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <StitchDivider />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "⏰", title: "48 Hours", desc: "Report issues within 48 hours of delivery" },
            { icon: "📸", title: "Photo Proof", desc: "Send photos of the issue on WhatsApp" },
            { icon: "🔄", title: "Quick Resolution", desc: "Replacement or refund within days" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-5 text-center border border-zari-gold/10 shadow-sm">
              <span className="text-3xl mb-2 block">{card.icon}</span>
              <h3 className="font-body font-semibold text-ink-charcoal text-sm mb-1">{card.title}</h3>
              <p className="font-body text-xs text-ink-charcoal/60">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Policy Sections */}
        {[
          {
            title: "Damaged or Defective Products",
            content: "If your order arrives damaged or has a manufacturing defect, contact us on WhatsApp within 48 hours of delivery with clear photos of the product and its packaging. After verification, we will send a free replacement or issue a full refund — your choice. Return shipping for damaged items is on us.",
          },
          {
            title: "Wrong Item Received",
            content: "If you received a different product than what you ordered, we sincerely apologize. Contact us within 48 hours with a photo of the received item and your order ID. We will arrange pickup of the wrong item and ship the correct one immediately at no extra cost.",
          },
          {
            title: "Change of Mind",
            content: "Because every piece is handmade with hours of skilled artisan work, we do not accept returns for change of mind. However, exchanges for a different product of equal or higher value may be possible if the item is unused, in original condition, and requested within 48 hours of delivery. Exchange shipping costs are borne by the customer.",
          },
          {
            title: "Custom Orders",
            content: "Custom-made products are created specifically for you based on your approved design, measurements, and requirements — therefore they cannot be returned or exchanged. We share progress photos during production and get your approval at each stage to make sure the final piece matches your expectations.",
          },
          {
            title: "Refund Process",
            content: "For Cash on Delivery orders, refunds are sent via JazzCash, Easypaisa, or bank transfer — whichever you prefer. For prepaid orders (JazzCash/Easypaisa), refunds go back to your mobile account. Refunds are processed within 3-5 working days after the return is approved and received.",
          },
          {
            title: "How to Start a Return",
            content: "Message us on WhatsApp with: (1) your order ID, (2) clear photos of the issue, and (3) a short description. Our team will review and respond within 24 hours with the next steps. Please do not ship anything back without our confirmation — unapproved returns cannot be processed.",
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
            Need to report an issue with your order?
          </p>
          
          <a
            href="https://wa.me/923440232857?text=Hi! I need help with a return/exchange. My order ID is: "
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl font-body text-sm font-semibold text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            Start Return on WhatsApp
          </a>
        </div>

      </section>
    </div>
  )
}

export default ReturnPolicyPage