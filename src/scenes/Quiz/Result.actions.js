import {
  QUIZ_RESULT_SCORE
} from '../../types'

export const calculateRisk = () => (dispatch, getState) => {
  const { info } = getState().quiz
  const { passed, answers } = info

  let userScore = 0
  let maxScore = 0

  passed.forEach(questionId => {
    maxScore += Math.max(...Object.values(answers[questionId].weights))
    userScore += answers[questionId].weights[answers[questionId].id]
  })

  dispatch({ payload: userScore / maxScore * 100, type: QUIZ_RESULT_SCORE })
}
