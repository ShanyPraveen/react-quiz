import React, { useEffect } from 'react'

export default function Timer({ remaining, dispatch }) {
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
