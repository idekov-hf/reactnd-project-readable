import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions'

function categories(state = {}, action) {
  const { type, categories } = action
  switch (type) {
    case RECEIVE_CATEGORIES:
      return categories.reduce((categoriesObj, category) => {
        categoriesObj[category.path] = category
        return categoriesObj
      }, {})
    default:
      return state
  }
}

function posts(state = { byId: {}, allIds: [] }, action) {
  const { type, posts } = action
  switch (type) {
    case RECEIVE_POSTS:
      return posts.reduce(
        (postsObj, post) => {
          postsObj['byId'][post.id] = post
          postsObj['allIds'].push(post.id)
          return postsObj
        },
        { byId: {}, allIds: [] }
      )
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
