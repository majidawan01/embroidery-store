import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Ayesha Khan",
    city: "Lahore",
    rating: 5,
    text: "Ordered a zari dupatta for my sister's wedding — the quality exceeded my expectations! You can tell it's genuinely handmade. The WhatsApp updates throughout were so reassuring.",
    product: "Royal Zari Bridal Dupatta",
  },
  {
    name: "Fatima Malik",
    city: "Karachi",
    rating: 5,
    text: "The mirror work clutch arrived beautifully packed. Every mirror is perfectly set — my friends kept asking where I got it from. Already placed my second order!",
    product: "Mirror Work Bridal Clutch",
  },
  {
    name: "Sarah Ahmed",
    city: "Islamabad",
    rating: 5,
    text: "I ordered a custom design and the team was amazing — they shared progress photos at every step. The final piece was exactly what I imagined. True artisans!",
    product: "Custom Order",
  },
  {
    name: "Zainab Tariq",
    city: "Faisalabad",
    rating: 4,
    text: "Beautiful cushion covers, exactly as shown in pictures. Delivery took a day longer than expected but the quality made up for it completely. Highly recommend.",
    product: "Zari Embroidered Cushion Cover Set",
  },
  {
    name: "Hina Raza",
    city: "Rawalpindi",
    rating: 5,
    text: "Bought the Kashmiri shawl as a gift for my mother — she absolutely loves it. The thread work is so fine and detailed. COD made it super easy to order.",
    product: "Kashmiri Thread Embroidery Shawl",
  },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-zari-gold" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-ink-charcoal py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="font-body text-zari-gold text-xs uppercase tracking-widest mb-2 block">
            Customer Love
          </span>
          <h2 className="font-display text-3xl text-fabric-cream font-semibold">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative min-h-[260px] md:min-h-[220px]">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={
                "transition-all duration-500 " +
                (index === current
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none")
              }
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 text-center backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <Stars rating={item.rating} />
                </div>
                <p className="font-body text-fabric-cream/90 text-base md:text-lg leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
                <div>
                  <p className="font-body font-semibold text-fabric-cream text-sm">
                    {item.name}
                  </p>
                  <p className="font-body text-xs text-fabric-cream/50 mt-0.5">
                    {item.city} — purchased {item.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={"Testimonial " + (index + 1)}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (index === current
                  ? "w-8 bg-zari-gold"
                  : "w-2 bg-fabric-cream/30 hover:bg-fabric-cream/60")
              }
            />
          ))}
        </div>

        {/* Trust Numbers */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-white/10">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "4.8★", label: "Average Rating" },
            { number: "30+", label: "Years of Craft" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl text-zari-gold font-bold">
                {stat.number}
              </p>
              <p className="font-body text-xs text-fabric-cream/50 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials