import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "../../services/api"

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password")
      return
    }

    try {
      setLoading(true)
      setError("")
      await adminLogin(email, password)
      navigate("/admin")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="min-h-screen bg-ink-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold mb-2">
            <span className="text-fabric-cream">Embroidery</span>{" "}
            <span className="text-zari-gold">Store</span>
          </h1>
          <p className="font-body text-fabric-cream/60 text-sm">
            Admin Panel — Authorized Access Only
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="font-display text-xl text-ink-charcoal font-semibold mb-6">
            Sign In
          </h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="admin@embroiderystore.com"
                className="w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold"
              />
            </div>

            <div>
              <label className="font-body text-sm text-ink-charcoal/70 mb-1 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 rounded-xl border border-zari-gold/30 bg-white font-body text-ink-charcoal placeholder:text-ink-charcoal/30 focus:outline-none focus:border-zari-gold"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl p-3 text-center">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={
                loading
                  ? "w-full py-3 bg-thread-maroon/60 text-white font-body font-semibold rounded-xl cursor-wait"
                  : "w-full py-3 bg-thread-maroon text-white font-body font-semibold rounded-xl hover:bg-thread-maroon/90 active:scale-95 transition-all duration-200"
              }
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>

        <p className="text-center font-body text-fabric-cream/40 text-xs mt-6">
          This area is restricted to store administrators
        </p>
      </div>
    </div>
  )
}

export default AdminLoginPage