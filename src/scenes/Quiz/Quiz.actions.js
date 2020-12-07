import {
  FETCH_QUESTIONS,
  NEXT_QUESTION,
  PREVIOUS_QUESTION,
  QUESTION_ANSWER_CHANGE,
  QUESTION_WEIGHTS
} from '../../types'

export const fetchQuestions = () => async dispatch => {
  try {
    const result = await fetch(
      'http://okeibg.com/api/quiz'
    )
    const json = await result.json()

    const { flow, questions } = json.data[0].quiz

    const newQuestions = {}
    questions.forEach(question => {
      newQuestions[question.id] = question
    })

    dispatch({
      payload: {
        flow,
        questions: newQuestions,
        version: json.data[0].id
      },
      type: FETCH_QUESTIONS
    })

    const weights = {}
    flow.options.forEach(o => { weights[o.id] = o.weight })
  
    dispatch({
      payload: weights,
      type: QUESTION_WEIGHTS
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message) // TODO: Handle error
  }
}

export const questionAnswerChange = (optionId) => (dispatch) => {
  dispatch({
    payload: optionId,
    type: QUESTION_ANSWER_CHANGE
  })
}

export const previousQuestion = () => dispatch => {
  dispatch({
    type: PREVIOUS_QUESTION
  })
}

const getNextQuestion = (passed, flow, answers) => {
  let current = flow
  let nextQuestion = null

  for(;;) {
    const option = current.options.find(o => o.id === answers[current.id].id)

    if (current.next) {
      if (passed.includes(current.next.id)) {
        current = current.next
        continue
      } else {
        nextQuestion = current.next
      }
    }
    
    if (option.next) {
      if (passed.includes(option.next.id)) {
        current = option.next
        continue
      } else {
        nextQuestion = option.next
        break
      }
    } else {
      break
    }
  }

  return nextQuestion
}

export const nextQuestion = () => (dispatch, getState) => {
  const state = getState()
  const { flow, info } = state.quiz
  const { passed, answers, currentQuestion, currentAnswer } = info

  const next = getNextQuestion(
    [ ...passed, currentQuestion ],
    flow,
    {
      ...answers,
      [currentQuestion]: {
        ...answers[currentQuestion],
        id: currentAnswer
      }
    }
  )

  dispatch({
    payload: {
      next: next ? next.id : next
    },
    type: NEXT_QUESTION
  })

  if (next) {
    const weights = {}
    next.options.forEach(o => { weights[o.id] = o.weight })

    dispatch({
      payload: weights,
      type: QUESTION_WEIGHTS
    })
  }
}
