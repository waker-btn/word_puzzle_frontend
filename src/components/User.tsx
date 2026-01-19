import AuthButton from './AuthButton'
import './User.css'

interface UserProps {
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
  isLoggedIn: boolean
  userName: string | null
}

function User({
  onLoginClick,
  onRegisterClick,
  onLogout,
  isLoggedIn,
  userName,
}: UserProps) {
  return (
    <div className="user">
      {isLoggedIn ? (
        <>
          {userName && (
            <span className="user__welcome">Welcome, {userName}!</span>
          )}
          <button className="user__logout-btn" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <AuthButton type="login" onClick={onLoginClick} />
          <AuthButton type="register" onClick={onRegisterClick} />
        </>
      )}
    </div>
  )
}

export default User
