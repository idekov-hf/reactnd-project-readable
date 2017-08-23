import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, ORDER_POSTS } from '../actions'

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
