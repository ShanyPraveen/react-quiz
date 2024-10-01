import React from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function Progress() {
  const {index, answer, points, numQuestions, maxPoints} = useQuizContext();

  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
      <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {maxPoints} </p>
    </header>
  )
}
