import { useAuth } from '@workos-inc/authkit-react'

export function WorkOSUser() {
  const { user, isLoading, signIn, signOut } = useAuth()

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
  }

  if (!user) {
    return (
      <button
        onClick={() => signIn()}
        className="text-sm text-cyan-400 hover:text-cyan-300"
      >
        Sign In
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {user.profilePictureUrl && (
        <img
          src={user.profilePictureUrl}
          alt={user.firstName || 'User'}
          className="w-8 h-8 rounded-full"
        />
      )}
      <span className="text-sm text-gray-300">
        {user.firstName} {user.lastName}
      </span>
      <button
        onClick={() => signOut()}
        className="text-sm text-gray-400 hover:text-white"
      >
        Sign Out
      </button>
    </div>
  )
}
