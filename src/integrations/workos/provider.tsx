import { AuthKitProvider } from '@workos-inc/authkit-react'
import { useNavigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface WorkOSProviderProps {
  children: ReactNode
}

export function WorkOSProvider({ children }: WorkOSProviderProps) {
  const navigate = useNavigate()

  return (
    <AuthKitProvider
      clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
      apiHostname={import.meta.env.VITE_WORKOS_API_HOSTNAME || 'api.workos.com'}
      onRedirectCallback={({ state }) => {
        navigate({ to: state?.returnTo || '/' })
      }}
    >
      {children}
    </AuthKitProvider>
  )
}
