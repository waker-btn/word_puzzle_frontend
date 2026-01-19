import './Guesses.css'

interface GameState {
  game_id: string
  remaining_attempts: number
  game_status: 'ongoing' | 'won' | 'lost'
  attempts: Array<Array<string>>
  word: string
}

interface GuessesProps {
  gameState: GameState
  currentGuess: string
}

function Guesses({ gameState, currentGuess }: GuessesProps) {
  const getCellState = (result: string): 'correct' | 'present' | 'absent' => {
    if (result === '2') return 'correct'
    if (result === '1') return 'present'
    return 'absent'
  }

  const currentRowIndex = gameState?.attempts?.length || 0

  return (
    <div className="guesses">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const attempt = gameState?.attempts?.[rowIndex]
        const isCurrentRow = rowIndex === currentRowIndex

        // Use attempt if exists, otherwise use currentGuess if this is the active row
        const word = attempt?.[0] || (isCurrentRow ? currentGuess : '')
        const results = attempt?.[1] || ''

        return (
          <div key={rowIndex} className="guesses__row">
            {Array.from({ length: 5 }).map((_, cellIndex) => {
              const letter = word[cellIndex] || ''
              const result = results[cellIndex]
              const cellClass =
                letter && result
                  ? `guesses__cell--${getCellState(result)}`
                  : 'guesses__cell'

              return (
                <div key={cellIndex} className={cellClass}>
                  {letter}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Guesses
