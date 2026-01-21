import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '@workos-inc/authkit-react'

export const Route = createFileRoute('/demo/workos')({
  ssr: false,
  component: WorkOSDemo,
})

function WorkOSDemo() {
  const { user, isLoading, signIn, signOut } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">WorkOS Auth Demo</h1>

        {user ? (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              {user.profilePictureUrl && (
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p>User ID: {user.id}</p>
            </div>

            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">Not signed in</p>
            <button
              onClick={() => signIn()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-6 rounded"
            >
              Sign In with WorkOS
            </button>
          </div>
        )}

        <div className="mt-8">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
