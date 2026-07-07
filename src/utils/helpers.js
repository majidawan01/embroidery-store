export function formatPKR(amount) {
  return "Rs. " + amount.toLocaleString("en-PK")
}

export function generateOrderId() {
  return "EMB-" + Date.now().toString().slice(-6)
}

export function encodeWhatsApp(message) {
  return encodeURIComponent(message)
}

export function truncateText(text, maxLength = 80) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}