import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { key } = req.query
  if (!key) return res.status(400).json({ valid: false })

  const { data, error } = await supabase
    .from('keys').select('*').eq('key', key).eq('used', false).single()

  if (error || !data) return res.status(200).json({ valid: false })

  await supabase.from('keys').update({ used: true }).eq('key', key)
  res.status(200).json({ valid: true })
}
