import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../../utils/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    supabase.auth.api.setAuthCookie(req, res)
  }
}
