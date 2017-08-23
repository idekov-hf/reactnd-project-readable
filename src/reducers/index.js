import { combineReducers } from 'redux'
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  ORDER_BY_VOTESCORE
} from '../actions'

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
  const { type, posts } = action
  switch (type) {
    case RECEIVE_POSTS:
      return posts.reduce((postsObj, post) => {
        postsObj[post.id] = post
        return postsObj
      }, {})
    case ORDER_BY_VOTESCORE:
      const orderedPosts = Object.values(state).sort((a, b) => {
        if (a.voteScore > b.voteScore) return -1
        if (a.voteScore < b.voteScore) return 1
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
