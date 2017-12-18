import React from 'react'

export default function ScoreMechanism({ score, onDecrement, onIncrement }) {
  return (
    <div className="vote-score-container">
      <p className="vote-score-number">Score: {score}</p>

      <div className="vote-score-controls">
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  )
}
