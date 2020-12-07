import {
  ORIENTATION_PORTRAIT,
  ORIENTATION_LANDSCAPE
} from './types'

export const toPortraitOrientation = () => dispatch => {
  dispatch({ type: ORIENTATION_PORTRAIT })
}

export const toLandscapeOrientation = () => dispatch => {
  dispatch({ type: ORIENTATION_LANDSCAPE })
}
