import './AuthButton.css'

interface AuthButtonProps {
  type: 'login' | 'register'
  onClick: () => void
}

function AuthButton({ type, onClick }: AuthButtonProps) {
  return (
    <button className={`auth-button auth-button--${type}`} onClick={onClick}>
      {type === 'login' ? 'Login' : 'Register'}
    </button>
  )
}

export default AuthButton
