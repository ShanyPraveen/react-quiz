import React, { useEffect } from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function Timer() {
  const {remaining, dispatch} = useQuizContext();

  const mins = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [dispatch])
  return (
    <div className='timer'>{mins}:{seconds}</div>
  )
}
