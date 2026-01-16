interface OverlayProps {
  type: 'login' | 'register'
  onClose?: () => void
  email?: string
  password?: string
}

function Overlay({ type, onClose }: OverlayProps) {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const url = 'https://word-puzzle.up.railway.app'
    const endpoint =
      type === 'login' ? url + '/api/login' : url + '/api/register'

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        onClose?.()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="overlay">
      <div className="overlay__backdrop" onClick={onClose}>
        <div className="overlay__content" onClick={(e) => e.stopPropagation()}>
          <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={submitForm}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            {type === 'register' && (
              <input type="password" placeholder="Confirm Password" />
            )}
            <button type="submit">
              {type === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Overlay
