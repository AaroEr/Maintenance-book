import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (err: any) {
          setError(err.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#282828]">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded">
              Login
            </button>
            <p className="text-sm mt-4">
                Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </p>
          </form>
        </div>
      )
}

export default LoginPage