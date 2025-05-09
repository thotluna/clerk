'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function ConnectGitHubButton() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnectGitHub = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const currentPath = window.location.href

      const externalAccount = await user.createExternalAccount({
        strategy: 'oauth_github',
        redirectUrl: currentPath,
      })

      if (externalAccount?.verification?.externalVerificationRedirectURL) {
        window.location.href =
          externalAccount.verification.externalVerificationRedirectURL.toString()
      } else {
        throw new Error('No se pudo obtener la URL de redirección para GitHub.')
      }
    } catch (err) {
      console.error('Error al conectar cuenta de GitHub:', err)
      let errorMessage = 'Ocurrió un error al conectar con GitHub.'
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <p>Por favor, inicia sesión para conectar tu cuenta de GitHub.</p>
  }

  const hasGitHubConnection = user.externalAccounts.some(
    (acc) => acc.provider === 'github'
  )

  if (hasGitHubConnection) {
    return <p>Ya tienes una cuenta de GitHub conectada.</p>
  }

  return (
    <div>
      <Button onClick={handleConnectGitHub} disabled={isLoading}>
        {isLoading ? 'Conectando...' : 'Conectar cuenta de GitHub'}
      </Button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  )
}
