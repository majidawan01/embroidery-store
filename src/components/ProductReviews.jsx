import { useState, useEffect, useCallback } from "react"
import { fetchProductReviews, submitReview } from "../services/api"

function Stars({ rating, size = "text-base" }) {
  return (
    <div className={"flex gap-0.5 " + size}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "text-zari-gold" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  )
}

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [count, setCount] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", city: "", rating: 5, comment: "" })
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [error, setError] = useState("")

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })

  const loadReviews = useCallback(async () => {
    try {
      const data = await fetchProductReviews(productId)
      setReviews(data.reviews)
      setAvgRating(data.avgRating)
      setCount(data.count)
    } catch {
      setReviews([])
    }
  }, [productId])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  async function handleSubmit() {
    if (!form.name.trim() || !form.comment.trim()) {
      setError("Please enter your name and review")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      const result = await submitReview({
        product: productId,
        name: form.name,
        city: form.city,
        rating: Number(form.rating),
        comment: form.comment,
      })
      setSuccessMsg(result.message)
      setForm({ name: "", city: "", rating: 5, comment: "" })
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-sm text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold"

  return (
    <section className="py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl text-ink-charcoal font-semibold mb-1">
            Customer Reviews
          </h2>
          {count > 0 ? (
            <div className="flex items-center gap-2">
              <Stars rating={avgRating} />
              <span className="font-body text-sm text-ink-charcoal/60">
                {avgRating} out of 5 — {count} {count === 1 ? "review" : "reviews"}
              </span>
            </div>
          ) : (
            <p className="font-body text-sm text-ink-charcoal/60">
              No reviews yet — be the first to review this product
            </p>
          )}
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSuccessMsg("") }}
          className="px-5 py-2.5 rounded-xl font-body text-sm font-semibold border-2 border-thread-maroon text-thread-maroon hover:bg-thread-maroon hover:text-white transition-all duration-200"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-center">
          <p className="font-body text-sm text-green-700">✓ {successMsg}</p>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-zari-gold/10 shadow-sm mb-8">
          <h3 className="font-display text-lg text-ink-charcoal font-semibold mb-4">
            Share Your Experience
          </h3>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Your city (optional)"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-2 block">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setForm((p) => ({ ...p, rating: star }))}
                    className={
                      "text-3xl transition-transform hover:scale-110 " +
                      (star <= form.rating ? "text-zari-gold" : "text-gray-300")
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Tell others about the quality, delivery, and your overall experience... *"
              value={form.comment}
              onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
              rows={4}
              maxLength={500}
              className={inputClass}
            />

            {error && (
              <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl p-3 text-center">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={
                submitting
                  ? "py-3 bg-thread-maroon/60 text-white font-body font-semibold rounded-xl cursor-wait"
                  : "py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
              }
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl p-5 border border-zari-gold/10 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-thread-maroon/10 flex items-center justify-center font-display font-bold text-thread-maroon">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink-charcoal">
                      {review.name}
                    </p>
                    <p className="font-body text-xs text-ink-charcoal/50">
                      {review.city && review.city + " — "}{formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <Stars rating={review.rating} size="text-sm" />
              </div>
              <p className="font-body text-sm text-ink-charcoal/70 leading-relaxed pl-13">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductReviews