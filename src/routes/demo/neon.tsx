import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { getClient } from '~/neon'

const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
  const sql = getClient()
  const result = await sql`SELECT * FROM todos ORDER BY created_at DESC`
  return result
})

const addTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    const sql = getClient()
    await sql`INSERT INTO todos (title) VALUES (${data.title})`
    return { success: true }
  })

export const Route = createFileRoute('/demo/neon')({
  loader: () => getTodos(),
  component: NeonDemo,
})

function NeonDemo() {
  const todos = Route.useLoaderData()
  const [newTodo, setNewTodo] = useState('')

  const handleAdd = async () => {
    if (!newTodo.trim()) return
    await addTodo({ data: { title: newTodo } })
    setNewTodo('')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Neon Database Demo</h1>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Add a todo..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2"
            />
            <button
              onClick={handleAdd}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="text-gray-400">No todos yet</div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo: any) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-2 bg-gray-700 rounded p-2"
                >
                  <span
                    className={
                      todo.is_completed ? 'line-through text-gray-400' : ''
                    }
                  >
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
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
