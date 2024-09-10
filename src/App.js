import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from './Error';
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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

export default function App() {
  const [{ questions, status, index, answer, points, remaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    dispatch({ type: "dataLoading" });

    fetch('http://localhost:8080/questions').then((res) => res.json()).then((data) => {
      dispatch({ type: "dataReceived", payload: data })
    }).catch(err => dispatch({ type: "dataFailed" }))
  }, []);

  return <div className="app">
    <Header />

    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <Start dispatch={dispatch} numQuestions={numQuestions} />}
      {status === 'active' && <>
        <Progress index={index} answer={answer} points={points} maxPoints={maxPoints} numQuestions={numQuestions} />
        <Question dispatch={dispatch} answer={answer} question={questions[index]} />
        <Footer>
          <Timer remaining={remaining} dispatch={dispatch} />
          <NextButton index={index} numQuestions={numQuestions} answer={answer} dispatch={dispatch} />
        </Footer>
      </>}
      {status === 'finished' && <FinishScreen dispatch={dispatch} points={points} maxPoints={maxPoints} />}
    </Main>
  </div>
}