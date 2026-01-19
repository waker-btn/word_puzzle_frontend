import { useState, useEffect } from 'react'
import makeApiRequest from '../services/apiService'
import Guesses from './Guesses'
import Keyboard from './Keyboard'
import './Word.css'

interface GameState {
  game_id: string
  remaining_attempts: number
  game_status: 'ongoing' | 'won' | 'lost'
  attempts: Array<Array<string>>
  word: string
}

function Word() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [currentGuess, setCurrentGuess] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGameState = async () => {
      setIsLoading(true)
      try {
        const response = await makeApiRequest('games/words', { method: 'GET' })
        console.log('Game state response:', response)
        setGameState(response)
      } catch (error) {
        console.error('Failed to fetch game state:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameState()
  }, [])

  const handleGuessChange = (newGuess: string) => {
    setCurrentGuess(newGuess)
    if (error) {
      setError(null)
    }
  }

  const handleGuess = async (guess: string) => {
    setIsLoading(true)
    try {
      const response = await makeApiRequest('games/words', {
        method: 'POST',
        body: JSON.stringify({ guess }),
      })
      console.log('Guess response:', response)
      setGameState(response)
      setCurrentGuess('')
      setError(null)
    } catch (error: unknown) {
      console.error('Failed to submit guess:', error)
      // Display the error message from the API
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid guess'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!gameState) {
    return <div className="game">Loading...</div>
  }

  const renderGameStatus = () => {
    if (gameState.game_status === 'won') {
      return (
        <div className="game__status game__status--won">
          <h2 className="game__status-title">You Won!</h2>
          <p className="game__status-text">
            Come back tomorrow for a new puzzle!
          </p>
        </div>
      )
    }
    if (gameState.game_status === 'lost') {
      return (
        <div className="game__status game__status--lost">
          <h2 className="game__status-title">Game Over</h2>
          <p className="game__status-text">
            The word was: <strong>{gameState.word.toUpperCase()}</strong>
          </p>
          <p className="game__status-text">
            Come back tomorrow for a new puzzle!
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="game">
      {error && <div className="game__error">{error}</div>}
      {gameState.game_status === 'ongoing' && (
        <div className="game__attempts">
          {gameState.remaining_attempts}{' '}
          {gameState.remaining_attempts === 1 ? 'attempt' : 'attempts'}{' '}
          remaining
        </div>
      )}
      {renderGameStatus()}
      <Guesses gameState={gameState} currentGuess={currentGuess} />
      <Keyboard
        gameState={gameState}
        currentGuess={currentGuess}
        setCurrentGuess={handleGuessChange}
        onGuess={handleGuess}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Word
