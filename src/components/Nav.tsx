import User from './User'

interface NavProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

function Nav({ onLoginClick, onRegisterClick }: NavProps) {
  return (
    <>
      <User onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
    </>
  )
}

export default Nav
