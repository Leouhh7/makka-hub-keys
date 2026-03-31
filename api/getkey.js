import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const newKey = "HVH-" + crypto.randomBytes(6).toString("hex").toUpperCase()
  const { error } = await supabase.from('keys').insert({ key: newKey, used: false })
  if (error) return res.status(500).json({ error: "Failed" })
  res.status(200).json({ key: newKey })
}
