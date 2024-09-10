import React from 'react'
import Option from './Option'

export default function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h4>
        {question.question}
      </h4>
      <Option answer={answer} dispatch={dispatch} question={question} />
    </div>
  )
}
