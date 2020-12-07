import {
  ORIENTATION_PORTRAIT,
  ORIENTATION_LANDSCAPE
} from './types';
import { combineReducers } from 'redux'
import quizReducer from './scenes/Quiz/Quiz.reducer'

export default combineReducers({
  orientation: screenOrientationReducer,
  quiz: quizReducer
})

function screenOrientationReducer(state = 'portrait', action) {
  switch (action.type) {
    case ORIENTATION_PORTRAIT:
      return ORIENTATION_PORTRAIT
    case ORIENTATION_LANDSCAPE:
      return ORIENTATION_LANDSCAPE
    default:
      return state;
  }
}
