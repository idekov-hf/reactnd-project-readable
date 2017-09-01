import { combineReducers } from 'redux'
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  ORDER_POSTS,
  SET_SELECTED_CATEGORY
} from '../actions'

const defaultCategoriesState = {
  all: [],
  selected: ''
}

function categories(state = defaultCategoriesState, action) {
  const { type, categories, category } = action
  switch (type) {
    case RECEIVE_CATEGORIES:
      return { ...state, all: categories }
    case SET_SELECTED_CATEGORY:
      return { ...state, selected: category }
    default:
      return state
  }
}

function posts(state = {}, action) {
  const { type, posts, value } = action
  switch (type) {
    case RECEIVE_POSTS:
      return posts.reduce((postsObj, post) => {
        postsObj[post.id] = post
        return postsObj
      }, {})
    case ORDER_POSTS:
      const orderedPosts = Object.values(state).sort((a, b) => {
        if (a[value] > b[value]) return -1
        if (a[value] < b[value]) return 1
        return 0
      })
      return orderedPosts.reduce((postsObj, post) => {
        postsObj[post.id] = post
        return postsObj
      }, {})
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
