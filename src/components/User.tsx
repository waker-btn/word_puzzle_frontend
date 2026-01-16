import AuthButton from './AuthButton'

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
    <>
      {isLoggedIn ? (
        <>
          {userName && <span>Welcome, {userName}!</span>}
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <AuthButton type="login" onClick={onLoginClick} />
          <AuthButton type="register" onClick={onRegisterClick} />
        </>
      )}
    </>
  )
}

export default User
