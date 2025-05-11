'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { GithubIcon } from 'lucide-react'
import { useState } from 'react'

export default function ConnectGitHubButton() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnectGitHub = async () => {
    if (!user) {
      console.log('no hay usuario')

      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const currentPath = window.location.href
      console.log({ currentPath })

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

  return (
    <div>
      <Button
        variant={'outline'}
        type="button"
        onClick={handleConnectGitHub}
        disabled={isLoading}
      >
        {isLoading ? (
          <p>&apos;Conectando...&apos;</p>
        ) : (
          <div className="flex items-center gap-1">
            <GithubIcon /> Conectar cuenta de GitHub
          </div>
        )}
      </Button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  )
}
