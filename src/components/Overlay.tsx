import { useState } from 'react'
import authService from '../services/authService'
import './Overlay.css'

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

    if (type === 'register') {
      if (username.length < 3) {
        setError('Username must be at least 3 characters')
        setIsLoading(false)
        return
      }
      if (username.length > 30) {
        setError('Username must not exceed 30 characters')
        setIsLoading(false)
        return
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters')
        setIsLoading(false)
        return
      }
      if (password.length > 72) {
        setError('Password must not exceed 72 characters')
        setIsLoading(false)
        return
      }
    }

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
          <h2 className="overlay__title">
            {type === 'login' ? 'Login' : 'Register'}
          </h2>
          {type === 'register' && (
            <p className="overlay__disclaimer">
              Note: This is a demo project. Please use a unique password that
              you don't use elsewhere.
            </p>
          )}
          <form className="overlay__form" onSubmit={submitForm}>
            <input
              className="overlay__input"
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={defaultUsername}
              minLength={type === 'register' ? 3 : undefined}
              maxLength={30}
              required
            />
            <input
              className="overlay__input"
              type="password"
              name="password"
              placeholder="Password"
              minLength={type === 'register' ? 8 : undefined}
              maxLength={72}
              required
            />
            <button
              className="overlay__submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : type === 'login'
                  ? 'Login'
                  : 'Register'}
            </button>
            {error && <div className="overlay__error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Overlay
