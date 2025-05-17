import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        navigate("/")
      } catch (err: any) {
        setError(err.message)
      }
    }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#282828]">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Register</h2>
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
            Register
          </button>
          <p className="text-sm mt-4">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
    )
  }
  
  export default RegisterPage