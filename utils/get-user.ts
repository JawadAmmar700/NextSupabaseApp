import type { NextRequest } from "next/server"
import { User } from "@supabase/supabase-js"

type ReturnValue = {
  user: User | null
  error: string | null
}

const getUser = async (req: NextRequest): Promise<ReturnValue> => {
  let token = req.cookies["sb:token"]
  if (!token) {
    return {
      user: null,
      error: "No token found",
    }
  }
  try {
    const authRequestResult = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
      }
    )

    if (authRequestResult.status !== 200) {
      return {
        user: null,
        error: "Invalid token",
      }
    }

    const authRequestResultJson = await authRequestResult.json()
    return {
      user: authRequestResultJson,
      error: null,
    }
  } catch (err: any) {
    return {
      user: null,
      error: err.message,
    }
  }
}

export { getUser }
