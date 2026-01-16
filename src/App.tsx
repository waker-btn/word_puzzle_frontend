import { useState } from 'react'
import Nav from './components/Nav'
import Word from './components/Word'
import Overlay from './components/Overlay'
import authService from './services/authService'
import './App.css'

function App() {
  const [overlayType, setOverlayType] = useState<'login' | 'register' | null>(
    null
  )
  const [isLoggedIn, setIsLoggedIn] = useState(() => authService.isLoggedIn())
  const [userName, setUserName] = useState<string | null>(() =>
    authService.getUsername()
  )
  const [registeredUsername, setRegisteredUsername] = useState<
    string | undefined
  >(undefined)

  const handleLoginSuccess = (user: { username: string }) => {
    setIsLoggedIn(true)
    setUserName(user.username)
    setOverlayType(null)
    setRegisteredUsername(undefined)
  }

  const handleRegisterSuccess = (username: string) => {
    // After successful registration, switch to login with username pre-filled
    setRegisteredUsername(username)
    setOverlayType('login')
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsLoggedIn(false)
      setUserName(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <Nav
        onLoginClick={() => setOverlayType('login')}
        onRegisterClick={() => setOverlayType('register')}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
      <Word />
      {overlayType && (
        <Overlay
          type={overlayType}
          onClose={() => {
            setOverlayType(null)
            setRegisteredUsername(undefined)
          }}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          defaultUsername={registeredUsername}
        />
      )}
    </>
  )
}

export default App
