import {createContext, useEffect, useState} from "react"
import { supabase } from "../utils/db"
import {useRouter} from "next/router";
import {User} from "@supabase/supabase-js";

export const userContext = createContext<User>({} as User);

const UserContext = ({ children }: any) => {
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      let newUser = supabase.auth.user()
      if (newUser) {
        setUser(newUser)
        await fetch("/api/auth/setCookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        })
        if(router.pathname === "/login") {
          await router.push("/")
        }
      }

    })
  }, [])
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  )
}

export default UserContext
