import { Link } from "react-router-dom"
import StitchDivider from "../components/StitchDivider"

function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-ink-charcoal overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-4 block">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-fabric-cream font-bold leading-tight mb-6">
            Three Generations of Thread, Tradition & Craft
          </h1>
          <p className="font-body text-fabric-cream/80 text-lg max-w-xl mx-auto">
            From a small workshop in Lahore to homes across Pakistan and beyond
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose-custom">
          <h2 className="font-display text-2xl text-ink-charcoal font-semibold mb-4">
            Where it all began
          </h2>
          <p className="font-body text-base text-ink-charcoal/70 leading-relaxed mb-6">
            Over 30 years ago, in the heart of Lahore, our family started with a single
            embryology frame and a passion for the craft passed down through generations.
            What began as a small workshop serving local tailors has grown into a full
            embroidery factory — but our commitment to handmade quality has never changed.
          </p>
          <p className="font-body text-base text-ink-charcoal/70 leading-relaxed mb-6">
            Every piece that leaves our workshop carries hours of patient handwork — from
            the shimmer of pure zari thread to the precision of hand-set mirrors, from
            delicate cutwork lace to vibrant Kashmiri-inspired thread embroidery. Our
            artisans, many of whom have been with us for decades, treat each order as a
            work of art.
          </p>
          <p className="font-body text-base text-ink-charcoal/70 leading-relaxed">
            Today, we bring this same craftsmanship directly to your doorstep — no
            middlemen, no mass production. Just authentic, handmade embroidery from our
            family to yours.
          </p>
        </div>
      </section>

      <StitchDivider />

      {/* ── Stats ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: "30+", label: "Years of Craft" },
            { number: "15+", label: "Master Artisans" },
            { number: "500+", label: "Unique Products Made" },
            { number: "100%", label: "Handmade" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center border border-zari-gold/10 shadow-sm"
            >
              <div className="font-display text-3xl text-thread-maroon font-bold mb-1">
                {stat.number}
              </div>
              <div className="font-body text-xs text-ink-charcoal/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <StitchDivider />

      {/* ── Craft Sections ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl text-ink-charcoal font-semibold text-center mb-10">
          The Crafts We Preserve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "✨",
              title: "Zari Work",
              desc: "Metallic gold and silver thread embroidery — the craft of Mughal courts. Our zari pieces take 15 to 40+ hours each, worked entirely by hand on silk, velvet, and brocade.",
            },
            {
              icon: "🧵",
              title: "Thread Embroidery",
              desc: "Colorful silk threads stitched into traditional motifs — from Kashmiri florals to Punjabi phulkari-inspired patterns. Every stitch placed by practiced hands.",
            },
            {
              icon: "🪞",
              title: "Mirror Work",
              desc: "The sparkle of Sindhi and Rajasthani tradition. Each tiny mirror is individually hand-set and secured with decorative stitching — a craft that machines cannot replicate.",
            },
            {
              icon: "🌸",
              title: "Cutwork & Lace",
              desc: "Delicate openwork embroidery where fabric is cut and edged by hand to create lace-like patterns. Elegant, timeless, and increasingly rare.",
            },
          ].map((craft) => (
            <div
              key={craft.title}
              className="bg-white rounded-2xl p-6 border border-zari-gold/10 shadow-sm hover:shadow-md hover:border-zari-gold/40 transition-all duration-200"
            >
              <span className="text-3xl mb-3 block">{craft.icon}</span>
              <h3 className="font-display text-lg text-ink-charcoal font-semibold mb-2">
                {craft.title}
              </h3>
              <p className="font-body text-sm text-ink-charcoal/70 leading-relaxed">
                {craft.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <StitchDivider />

      {/* ── Values ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl text-ink-charcoal font-semibold text-center mb-10">
          What We Stand For
        </h2>

        <div className="flex flex-col gap-6">
          {[
            {
              title: "Authenticity",
              desc: "No machine embroidery sold as handmade. No shortcuts. What we say is handcrafted, is handcrafted — and we welcome you to visit our workshop to see it yourself.",
            },
            {
              title: "Fair Craft",
              desc: "Our artisans are paid fairly for their skill and time. When you buy from us, you directly support the families keeping these traditional crafts alive.",
            },
            {
              title: "Honest Service",
              desc: "Clear prices, honest timelines, and real communication on WhatsApp. If something goes wrong, we make it right — that is how we have earned trust for three decades.",
            },
          ].map((value, index) => (
            <div key={value.title} className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full bg-thread-maroon text-white font-display font-bold flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="font-display text-lg text-ink-charcoal font-semibold mb-1">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-ink-charcoal/70 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-ink-charcoal rounded-3xl p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-fabric-cream font-semibold mb-3">
            Experience the craft yourself
          </h2>
          <p className="font-body text-sm text-fabric-cream/60 mb-8 max-w-md mx-auto">
            Browse our collection or talk to us about a custom piece made just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200"
            >
              Shop the Collection
            </Link>
            
            <a
              href="https://wa.me/923440232857?text=Hi! I want to discuss a custom order."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-zari-gold text-zari-gold font-body font-semibold rounded-xl hover:bg-zari-gold hover:text-ink-charcoal transition-all duration-200"
            >
              Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage