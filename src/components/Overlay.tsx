import { useState } from 'react'
import authService from '../services/authService'

interface OverlayProps {
  type: 'login' | 'register'
  onClose?: () => void
  onLoginSuccess?: (user: { username: string }) => void
  onRegisterSuccess?: (username: string) => void
  defaultUsername?: string
}

function Overlay({
  type,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  defaultUsername,
}: OverlayProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      if (type === 'login') {
        const user = await authService.login(username, password)
        onLoginSuccess?.(user)
      } else {
        const result = await authService.register(username, password)
        onRegisterSuccess?.(result.username)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="overlay">
      <div className="overlay__backdrop" onClick={onClose}>
        <div className="overlay__content" onClick={(e) => e.stopPropagation()}>
          <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={submitForm}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={defaultUsername}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Loading...'
                : type === 'login'
                  ? 'Login'
                  : 'Register'}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Overlay
