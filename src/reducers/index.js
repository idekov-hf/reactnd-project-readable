import { RECEIVE_CATEGORIES } from '../actions'

const defaultState = {
  categories: []
}

function category(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}

export default category
