import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

const slides = [
  {
    tagline: "Handcrafted in Lahore, Pakistan",
    title: "Where Every Stitch Tells a Story",
    description:
      "Discover handmade Zari Work, Thread Embroidery, Mirror Work, and Cutwork Lace — crafted by skilled artisans with decades of tradition.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=80",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    tagline: "The Royal Collection",
    title: "Pure Zari — Woven in Gold",
    description:
      "Bridal dupattas, formal waistcoats, and statement pieces with real gold zari thread. Each piece takes 40+ hours of masterful handwork.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80",
    buttonText: "Explore Zari Work",
    buttonLink: "/products?category=Zari%20Work",
  },
  {
    tagline: "Made Just For You",
    title: "Custom Orders, Crafted to Perfection",
    description:
      "Have a design in mind? Our artisans bring your vision to life — bridal wear, home decor, and everything in between.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    buttonText: "Start Custom Order",
    buttonLink: "whatsapp",
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-play — har 6 second
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative bg-ink-charcoal overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={
            "transition-opacity duration-700 " +
            (index === current
              ? "opacity-100 relative"
              : "opacity-0 absolute inset-0 pointer-events-none")
          }
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url(" + slide.image + ")" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 flex flex-col items-center text-center">
            <span className="font-body text-zari-gold text-sm uppercase tracking-widest mb-4">
              {slide.tagline}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-fabric-cream font-bold leading-tight max-w-3xl mb-6">
              {slide.title}
            </h1>
            <p className="font-body text-fabric-cream/80 text-lg max-w-xl mb-10">
              {slide.description}
            </p>
            
            {/* Fixed WhatsApp Ternary Tag Check */}
            {slide.buttonLink === "whatsapp" ? (
              <a
                href={"https://wa.me/923440232857?text=" + encodeURIComponent("Hi! I want to discuss a custom order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200 inline-block"
              >
                {slide.buttonText}
              </a>
            ) : (
              <Link
                to={slide.buttonLink}
                className="px-8 py-3.5 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 transition-colors duration-200 inline-block"
              >
                {slide.buttonText}
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Arrows (z-10 added for absolute layer handling) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-fabric-cream flex items-center justify-center text-2xl transition-colors duration-200 backdrop-blur-sm z-10"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-fabric-cream flex items-center justify-center text-2xl transition-colors duration-200 backdrop-blur-sm z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={"Go to slide " + (index + 1)}
            className={
              "h-2 rounded-full transition-all duration-300 " +
              (index === current
                ? "w-8 bg-zari-gold"
                : "w-2 bg-fabric-cream/40 hover:bg-fabric-cream/70")
            }
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider