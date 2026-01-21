import { neon } from '@neondatabase/serverless'

let client: ReturnType<typeof neon> | null = null

export function getClient() {
  if (!client) {
    const url = import.meta.env.VITE_DATABASE_URL
    if (!url) {
      throw new Error('VITE_DATABASE_URL is not set')
    }
    client = neon(url)
  }
  return client
}
