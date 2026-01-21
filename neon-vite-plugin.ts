import { postgres } from '@neondatabase/vite-plugin-postgres'

export default function () {
  return postgres({
    seedFile: 'db/init.sql',
    referrer: 'create-tanstack',
    envKey: 'VITE_DATABASE_URL',
  })
}
