import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from project root (parent of scripts folder)
dotenv.config({ path: resolve(__dirname, '..', '.env') })
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function keepAlive() {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] Running keep-alive queries...\n`)

  // Query 1: Count total quotes
  const { count, error: countError } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    console.error('Query 1 failed:', countError.message)
  } else {
    console.log(`✓ Query 1: Total quotes = ${count}`)
  }

  // Query 2: Get quotes by status
  const { data: statusData, error: statusError } = await supabase
    .from('quotes')
    .select('status')

  if (statusError) {
    console.error('Query 2 failed:', statusError.message)
  } else {
    const statusCounts = statusData.reduce((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1
      return acc
    }, {})
    console.log(`✓ Query 2: Status breakdown =`, statusCounts)
  }

  // Query 3: Get most recent quote
  const { data: recentData, error: recentError } = await supabase
    .from('quotes')
    .select('quote_number, customer_name, created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (recentError) {
    console.error('Query 3 failed:', recentError.message)
  } else {
    console.log(`✓ Query 3: Most recent = ${recentData.quote_number} (${recentData.customer_name})`)
  }

  console.log(`\n[${timestamp}] Keep-alive complete!`)
}

keepAlive()
