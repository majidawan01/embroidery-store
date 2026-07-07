const API_BASE = import.meta.env.PROD
  ? "https://embroidery-backend-production.up.railway.app/api"
  : "http://localhost:5000/api"
// Backend ka product frontend ke format mein convert karo
// (MongoDB _id deta hai, frontend id use karta hai)
function normalizeProduct(product) {
  return { ...product, id: product._id }
}

export async function fetchProducts() {
  const res = await fetch(API_BASE + "/products")
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  const data = await res.json()
  return data.map(normalizeProduct)
}

export async function fetchProductById(id) {
  const res = await fetch(API_BASE + "/products/" + id)
  if (!res.ok) {
    throw new Error("Product not found")
  }
  const data = await res.json()
  return normalizeProduct(data)
}

export async function createOrder(orderData) {
  const res = await fetch(API_BASE + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to place order")
  }
  return data
}

// ───────── Admin APIs ─────────

function getToken() {
  return localStorage.getItem("adminToken")
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  }
}

export async function adminLogin(email, password) {
  const res = await fetch(API_BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Login failed")
  }
  localStorage.setItem("adminToken", data.token)
  localStorage.setItem("adminName", data.admin.name)
  return data
}

export function adminLogout() {
  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminName")
}

export function isAdminLoggedIn() {
  return !!getToken()
}

export async function fetchAllOrders() {
  const res = await fetch(API_BASE + "/orders", {
    headers: authHeaders(),
  })
  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }
  return res.json()
}

export async function updateOrderStatus(orderId, status) {
  const res = await fetch(API_BASE + "/orders/" + orderId + "/status", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to update status")
  }
  return data
}

export async function createProductAdmin(productData) {
  const res = await fetch(API_BASE + "/products", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to create product")
  }
  return data
}

export async function updateProductAdmin(id, productData) {
  const res = await fetch(API_BASE + "/products/" + id, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to update product")
  }
  return data
}

export async function deleteProductAdmin(id) {
  const res = await fetch(API_BASE + "/products/" + id, {
    method: "DELETE",
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete product")
  }
  return data
}

export async function trackOrder(orderId) {
  const res = await fetch(API_BASE + "/orders/" + orderId.trim().toUpperCase())
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Order not found")
  }
  return data
}

// ───────── Reviews APIs ─────────

export async function fetchProductReviews(productId) {
  const res = await fetch(API_BASE + "/reviews/product/" + productId)
  if (!res.ok) {
    throw new Error("Failed to fetch reviews")
  }
  return res.json()
}

export async function submitReview(reviewData) {
  const res = await fetch(API_BASE + "/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to submit review")
  }
  return data
}

export async function fetchAllReviews() {
  const res = await fetch(API_BASE + "/reviews", {
    headers: authHeaders(),
  })
  if (!res.ok) {
    throw new Error("Failed to fetch reviews")
  }
  return res.json()
}

export async function toggleApproveReview(id) {
  const res = await fetch(API_BASE + "/reviews/" + id + "/approve", {
    method: "PUT",
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to update review")
  }
  return data
}

export async function deleteReviewAdmin(id) {
  const res = await fetch(API_BASE + "/reviews/" + id, {
    method: "DELETE",
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete review")
  }
  return data
}