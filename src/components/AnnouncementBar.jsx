import { useState, useEffect } from "react"

const announcements = [
  "🚚 Free Delivery on Orders Above Rs. 5,000",
  "✨ 100% Handmade — Crafted by Master Artisans in Lahore",
  "💬 Custom Orders Available — WhatsApp Us Anytime",
]

function AnnouncementBar() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-thread-maroon text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center relative">
        {announcements.map((text, index) => (
          <p
            key={index}
            className={
              "absolute font-body text-xs font-medium tracking-wide transition-all duration-500 " +
              (index === current
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2")
            }
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar