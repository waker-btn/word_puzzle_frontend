import { useEffect } from 'react'
import './Keyboard.css'

interface GameState {
  game_id: string
  remaining_attempts: number
  game_status: 'ongoing' | 'won' | 'lost'
  attempts: Array<Array<string>>
  word: string
}

interface KeyboardProps {
  gameState: GameState
  currentGuess: string
  setCurrentGuess: (guess: string) => void
  onGuess: (guess: string) => void
  isLoading: boolean
}

function Keyboard({
  gameState,
  currentGuess,
  setCurrentGuess,
  onGuess,
  isLoading,
}: KeyboardProps) {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.game_status !== 'ongoing' || isLoading) return

      const key = event.key.toUpperCase()

      // Handle letter keys
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key)
      }
      // Handle Enter
      else if (key === 'ENTER' && currentGuess.length === 5) {
        onGuess(currentGuess)
        setCurrentGuess('')
      }
      // Handle Backspace
      else if (key === 'BACKSPACE' && currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, currentGuess, setCurrentGuess, onGuess, isLoading])

  const getKeyState = (
    letter: string
  ): 'correct' | 'present' | 'absent' | 'unused' => {
    if (!gameState?.attempts) return 'unused'

    let bestState = 0 // 0=unused, 1=absent, 2=present, 3=correct

    gameState.attempts.forEach((attempt: string[]) => {
      const [word, results] = attempt

      for (let i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() === letter.toUpperCase()) {
          const result = parseInt(results[i])

          if (result === 2) {
            bestState = 3 // correct - highest priority
          } else if (result === 1 && bestState < 3) {
            bestState = 2 // present
          } else if (result === 0 && bestState < 2) {
            bestState = 1 // absent
          }
        }
      }
    })

    // Convert numeric state back to string
    if (bestState === 3) return 'correct'
    if (bestState === 2) return 'present'
    if (bestState === 1) return 'absent'
    return 'unused'
  }

  const handleKeyClick = (key: string) => {
    if (gameState.game_status !== 'ongoing' || isLoading) return

    if (key === 'BACKSPACE' && currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === 'ENTER' && currentGuess.length === 5) {
      onGuess(currentGuess)
      setCurrentGuess('')
    } else if (
      key !== 'BACKSPACE' &&
      key !== 'ENTER' &&
      currentGuess.length < 5
    ) {
      setCurrentGuess(currentGuess + key)
    }
  }

  const isDisabled = gameState.game_status !== 'ongoing' || isLoading

  return (
    <div className="keyboard">
      <div className="keyboard__row">
        {topRow.map((key) => (
          <button
            key={key}
            className={`keyboard__key--${getKeyState(key)}`}
            onClick={() => handleKeyClick(key)}
            disabled={isDisabled}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard__row">
        {middleRow.map((key) => (
          <button
            key={key}
            className={`keyboard__key--${getKeyState(key)}`}
            onClick={() => handleKeyClick(key)}
            disabled={isDisabled}
          >
            {key}
          </button>
        ))}
        <button
          key="BACKSPACE"
          className="keyboard__key--backspace"
          onClick={() => handleKeyClick('BACKSPACE')}
          disabled={isDisabled}
        >
          ⌫
        </button>
      </div>
      <div className="keyboard__row">
        {bottomRow.map((key) => (
          <button
            key={key}
            className={`keyboard__key--${getKeyState(key)}`}
            onClick={() => handleKeyClick(key)}
            disabled={isDisabled}
          >
            {key}
          </button>
        ))}
        <button
          key="ENTER"
          className="keyboard__key--enter"
          onClick={() => handleKeyClick('ENTER')}
          disabled={currentGuess.length !== 5 || isDisabled}
        >
          ENTER
        </button>
      </div>
    </div>
  )
}

export default Keyboard
