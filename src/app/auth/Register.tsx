// app/auth/register.tsx

'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/auth/signin")
    } else {
      alert("User already exists")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Register
          </button>
        </form>
        <div className="mt-4">
          <button onClick={() => signIn("google")} className="w-full bg-red-500 text-white p-2 rounded">
            Sign in with Google
          </button>
          <button onClick={() => signIn("github")} className="w-full bg-gray-800 text-white p-2 rounded mt-2">
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
