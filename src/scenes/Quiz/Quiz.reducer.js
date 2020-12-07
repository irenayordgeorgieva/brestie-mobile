import {
  FETCH_QUESTIONS,
  NEXT_QUESTION,
  PREVIOUS_QUESTION,
  QUESTION_ANSWER_CHANGE,
  QUESTION_WEIGHTS
} from '../../types'
import { combineReducers } from 'redux'
import resultReducer from './Result.reducer'

const questionsStateDefault = {}

const flowStateDefault = {
  flow: {},
  version: null
}

const infoStateDefault = {
  answers: {},
  currentAnswer: null,
  currentQuestion: {},
  passed: []
}

function questionsReducer(state = questionsStateDefault, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_QUESTIONS:
      return payload.questions
    default:
      return state
  }
}

function flowReducer(state = flowStateDefault, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_QUESTIONS:
      return payload.flow
    default:
      return state
  }
}

function infoReducer(state = infoStateDefault, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_QUESTIONS:
      return {
        ...infoStateDefault,
        answers: state.answers,
        currentAnswer: state.answers[payload.flow.id]
          ? state.answers[payload.flow.id].id
          : state.answers[payload.flow.id],
        currentQuestion: payload.flow.id
      }
    case NEXT_QUESTION:
      return {
        answers: {
          ...state.answers,
          [state.currentQuestion]: {
            ...state.answers[state.currentQuestion],
            id: state.currentAnswer
          }
        },
        currentAnswer: state.answers[payload.next] ? state.answers[payload.next].id : state.answers[payload.next],
        currentQuestion: payload.next,
        passed: [
          ...state.passed,
          state.currentQuestion
        ]
      }
    case PREVIOUS_QUESTION:
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestion]: {
            ...state.answers[state.currentQuestion],
            id: state.currentAnswer
          }
        },
        currentAnswer: state.answers[state.passed[state.passed.length - 1]].id,
        currentQuestion: state.passed[state.passed.length - 1],
        passed: state.passed.slice(0, state.passed.length - 1)
      }
    case QUESTION_ANSWER_CHANGE:
      return {
        ...state,
        currentAnswer: action.payload
      }
    case QUESTION_WEIGHTS:
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestion]: {
            ...state.answers[state.currentQuestion],
            weights: action.payload
          }
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  flow: flowReducer,
  info: infoReducer,
  questions: questionsReducer,
  result: resultReducer
})
