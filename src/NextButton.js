import React from 'react'

export default function NextButton({ dispatch, answer, numQuestions, index }) {
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
