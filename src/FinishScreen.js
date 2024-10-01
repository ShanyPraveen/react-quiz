import React from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function FinishScreen() {
  const {points, dispatch, maxPoints} = useQuizContext();

  const percentage = (points / maxPoints) * 100
  return (
    <div>
      <p className='result'>You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</p>
      <button onClick={() => dispatch({ type: 'restart' })} className='btn btn-ui'>Restart</button>
    </div>
  )
}
