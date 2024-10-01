import React from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function Start() {
  const {dispatch, numQuestions} = useQuizContext();

  return (
    <div>
      <h2>
        Welcome to the React Quiz!
      </h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button onClick={() => dispatch({ type: 'start' })} className='btn btn-ui'>Let's Start</button>
    </div>
  )
}
