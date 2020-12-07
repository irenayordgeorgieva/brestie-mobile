import {
  QUIZ_RESULT_SCORE
} from '../../types'

export default function flowReducer(state = null, action) {
  const { type, payload } = action

  switch (type) {
    case QUIZ_RESULT_SCORE:
      return payload
    default:
      return state
  }
}
