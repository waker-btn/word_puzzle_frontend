import User from './User'
import './Nav.css'

interface NavProps {
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
  isLoggedIn: boolean
  userName: string | null
}

function Nav({
  onLoginClick,
  onRegisterClick,
  onLogout,
  isLoggedIn,
  userName,
}: NavProps) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <h1 className="nav__title">Word Puzzle</h1>
        <div className="nav__user">
          <User
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        </div>
      </div>
    </nav>
  )
}

export default Nav
