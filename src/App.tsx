import { useState } from 'react'
import Nav from './components/Nav'
import Word from './components/Word'
import Overlay from './components/Overlay'
import './App.css'

function App() {
  const [overlayType, setOverlayType] = useState<'login' | 'register' | null>(
    null
  )

  return (
    <>
      <Nav
        onLoginClick={() => setOverlayType('login')}
        onRegisterClick={() => setOverlayType('register')}
      />
      <Word />
      {overlayType && <Overlay type={overlayType} />}
    </>
  )
}

export default App
