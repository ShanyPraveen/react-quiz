import React from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function NextButton() {
  const {index, answer, dispatch, numQuestions} = useQuizContext();

  if (answer === null) return;

  return (
    <>
      {index < numQuestions - 1 &&
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
          Next
        </button>}
      {index === numQuestions - 1 &&
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>
          Finish
        </button>}
    </>
  )
}
