import { useState, useEffect, useContext } from "react"
import { supabase } from "../../utils/db"
import { User } from "@supabase/supabase-js"
import { userContext } from "../../context"
import { useRouter } from "next/router"

type updateUser = {
  username: string
  website: string
}

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string>("")
  const [website, setWebsite] = useState<string>("")
  const session = useContext<User>(userContext)
  const router = useRouter()

  useEffect(() => {
    getProfile().then(() => setLoading(false))
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      const user: User | null = supabase.auth.user()

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website`)
        .eq("id", user?.id)
        .single()

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website }: updateUser) {
    try {
      setLoading(true)
      const user: User | null = supabase.auth.user()

      const updates = {
        id: user?.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      })

    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/removeCookie", {
      method: "GET",
      credentials: "same-origin",
    })
    await supabase.auth.signOut()
    await router.push("/login")
  }

  return (
    <div className="form-widget flex flex-col mt-8 space-y-4 text-white">
      <div className="flex items-center space-x-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={session?.email}
          disabled
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="username">Name</label>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="username"
          type="text"
          value={username || ""}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="website">Website</label>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="website"
          type="website"
          value={website || ""}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updateProfile({ username, website })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLogout()}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
