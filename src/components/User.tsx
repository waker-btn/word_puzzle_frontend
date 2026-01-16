import AuthButton from './AuthButton'

interface UserProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

function User({ onLoginClick, onRegisterClick }: UserProps) {
  return (
    <>
      <AuthButton type="login" onClick={onLoginClick} />
      <AuthButton type="register" onClick={onRegisterClick} />
    </>
  )
}

export default User
