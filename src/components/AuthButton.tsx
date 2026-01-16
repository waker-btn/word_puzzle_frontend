interface AuthButtonProps {
  type: 'login' | 'register'
  onClick: () => void
}

function AuthButton({ type, onClick }: AuthButtonProps) {
  return (
    <button onClick={onClick}>{type === 'login' ? 'Login' : 'Register'}</button>
  )
}

export default AuthButton
