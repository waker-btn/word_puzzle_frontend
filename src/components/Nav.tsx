import User from './User'

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
    <>
      <User
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    </>
  )
}

export default Nav
