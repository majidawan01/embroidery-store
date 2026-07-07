import { useState, useEffect } from "react"
import { fetchAllReviews, toggleApproveReview, deleteReviewAdmin } from "../../services/api"
import LoadingSpinner from "../../components/LoadingSpinner"

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "text-zari-gold" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  )
}

function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("pending")
  const [working, setWorking] = useState(null)

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    try {
      setLoading(true)
      const data = await fetchAllReviews()
      setReviews(data)
    } catch (error) {
      console.error("Failed to load reviews:", error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleApprove(id) {
    try {
      setWorking(id)
      const updated = await toggleApproveReview(id)
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isApproved: updated.isApproved } : r))
      )
    } catch (error) {
      alert("Failed: " + error.message)
    } finally {
      setWorking(null)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this review permanently?")) return
    try {
      setWorking(id)
      await deleteReviewAdmin(id)
      setReviews((prev) => prev.filter((r) => r._id !== id))
    } catch (error) {
      alert("Failed: " + error.message)
    } finally {
      setWorking(null)
    }
  }

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.isApproved
    if (filter === "approved") return r.isApproved
    return true
  })

  const pendingCount = reviews.filter((r) => !r.isApproved).length

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl text-ink-charcoal font-semibold">
          Reviews
          {pendingCount > 0 && (
            <span className="ml-3 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 font-body text-xs font-semibold align-middle">
              {pendingCount} pending
            </span>
          )}
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "all", label: "All" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={
              filter === tab.value
                ? "px-4 py-2 rounded-full font-body text-sm font-semibold bg-thread-maroon text-white"
                : "px-4 py-2 rounded-full font-body text-sm bg-white text-ink-charcoal border border-zari-gold/30 hover:border-thread-maroon transition-colors"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-zari-gold/10">
          <span className="text-4xl mb-3 block">⭐</span>
          <p className="font-body text-ink-charcoal/60">
            {filter === "pending" ? "No pending reviews — all caught up!" : "No reviews found"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((review) => (
            <div
              key={review._id}
              className={
                "bg-white rounded-2xl p-5 shadow-sm border " +
                (review.isApproved ? "border-green-200" : "border-yellow-200")
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {review.product?.images?.[0] && (
                    <img
                      src={review.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="font-body text-sm font-semibold text-ink-charcoal">
                      {review.product?.name || "Deleted product"}
                    </p>
                    <p className="font-body text-xs text-ink-charcoal/50">
                      by {review.name}
                      {review.city && " — " + review.city} · {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Stars rating={review.rating} />
                  <span
                    className={
                      "px-2.5 py-1 rounded-full text-xs font-body font-semibold " +
                      (review.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700")
                    }
                  >
                    {review.isApproved ? "Live" : "Pending"}
                  </span>
                </div>
              </div>

              <p className="font-body text-sm text-ink-charcoal/70 leading-relaxed mb-4">
                "{review.comment}"
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleApprove(review._id)}
                  disabled={working === review._id}
                  className={
                    review.isApproved
                      ? "px-4 py-2 rounded-lg font-body text-xs font-semibold text-yellow-700 border border-yellow-300 hover:bg-yellow-50 transition-colors disabled:opacity-50"
                      : "px-4 py-2 rounded-lg font-body text-xs font-semibold text-white bg-thread-sage hover:bg-thread-sage/90 transition-colors disabled:opacity-50"
                  }
                >
                  {working === review._id
                    ? "..."
                    : review.isApproved
                    ? "Unpublish"
                    : "✓ Approve & Publish"}
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={working === review._id}
                  className="px-4 py-2 rounded-lg font-body text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminReviews