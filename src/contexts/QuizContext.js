import { useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const quizContext = createContext();

const initialState = {
  questions: [],
  /** Loading | error | ready | active | finished */
  status: "",
  index: 0,
  answer: null,
  points: 0,
  remaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: 'error' }
    case "dataLoading":
      return { ...state, status: 'loading' }
    case "start":
      return { ...state, status: 'active', remaining: state.questions.length * 30 }
    case "newAnswer":
      const question = state.questions[state.index];
      const points = question.correctOption === action.payload ? question.points : 0
      return { ...state, answer: action.payload, points: state.points + points }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return { ...state, status: 'finished' }
    case "restart":
      return {
        ...initialState, questions: state.questions, status: 'ready'
      }
    case "tick":
      return { ...state, remaining: state.remaining - 1, status: state.remaining === 0 ? 'finished' : state.status }
  }
}

function QuizProvider ({children}) {
  const [{ questions, status, index, answer, points, remaining }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "dataLoading" });

    fetch('http://localhost:8080/questions').then((res) => res.json()).then((data) => {
      dispatch({ type: "dataReceived", payload: data })
    }).catch(err => dispatch({ type: "dataFailed" }))
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  return <quizContext.Provider value={{
    questions,
    status,
    index, answer, points, remaining, numQuestions, maxPoints, dispatch
  }}>{children}</quizContext.Provider>
}

function useQuizContext () {
  const context = useContext(quizContext);

  return context
}

export {QuizProvider, useQuizContext}