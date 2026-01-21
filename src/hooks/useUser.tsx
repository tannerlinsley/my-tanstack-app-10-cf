import { useAuth } from '@workos-inc/authkit-react'
import { useEffect } from 'react'

export function useUser() {
  const { user, isLoading, signIn } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      signIn()
    }
  }, [isLoading, user, signIn])

  return user
}
