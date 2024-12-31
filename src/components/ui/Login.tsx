'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent auto-redirect
    });

    if (res?.error) {
      alert(res.error); // Display error message
    } else {
      router.push("/dashboard"); // Redirect to dashboard on successful login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign In
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
  );
}
