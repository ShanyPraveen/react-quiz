import React from 'react'
import { useQuizContext } from './contexts/QuizContext';

export default function Option({ question }) {
  const {answer, dispatch} = useQuizContext();

  const answered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, index) => <button
        onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        key={option} disabled={answered} className={`btn btn-option ${answer === index ? 'answer' : ""} ${index === question.correctOption ? answered && 'correct' : answered && 'wrong'}`}>
        {option}</button>)}
    </div>
  )
}
