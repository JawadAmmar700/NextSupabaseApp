import { useState } from "react"
import { supabase } from "../utils/db"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert("Check your email for the login link!")
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex flex-col space-y-4">
      <h1>Supabase + Next.js</h1>
      <p>Sign in via magic link with your email below</p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      </div>

      <div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => handleLogin(email)}
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Send magic link"}</span>
        </button>
      </div>
    </div>
  )
}
