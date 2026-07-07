function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-12 h-12 border-4 border-zari-gold/30 border-t-thread-maroon rounded-full animate-spin" />
      <p className="font-body text-sm text-ink-charcoal/60">Loading...</p>
    </div>
  )
}

export default LoadingSpinner