import React from 'react'

export default function FinishScreen({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100
  return (
    <div>
      <p className='result'>You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</p>
      <button onClick={() => dispatch({ type: 'restart' })} className='btn btn-ui'>Restart</button>
    </div>
  )
}
