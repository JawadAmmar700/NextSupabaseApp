import { createClient, SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`
const SUPABASE_API_KEY: string = `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`

const supabase:SupabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export { supabase }
