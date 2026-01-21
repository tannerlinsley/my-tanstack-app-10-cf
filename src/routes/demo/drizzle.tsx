import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '~/db'
import { posts } from '~/db/schema'

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    return await db.select().from(posts)
  } catch (error) {
    // Return empty array if table doesn't exist yet
    return []
  }
})

export const Route = createFileRoute('/demo/drizzle')({
  loader: () => getPosts(),
  component: DrizzleDemo,
})

function DrizzleDemo() {
  const posts = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Drizzle ORM Demo</h1>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Posts from Database</h2>
          {posts.length === 0 ? (
            <p className="text-gray-400">
              No posts yet. Run migrations to create the table:
              <code className="block mt-2 bg-gray-900 p-2 rounded text-cyan-400">
                pnpm db:generate && pnpm db:migrate
              </code>
            </p>
          ) : (
            <pre className="text-sm overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          )}
        </div>

        <div className="mt-8">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
