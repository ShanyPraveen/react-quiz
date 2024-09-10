import React from 'react'

export default function Option({ question, dispatch, answer }) {
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
