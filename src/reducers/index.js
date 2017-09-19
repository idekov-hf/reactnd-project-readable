import { combineReducers } from 'redux'
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  ORDER_POSTS,
  SET_SELECTED_CATEGORY,
  ADJUST_POST_SCORE,
  RECEIVE_COMMENTS
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
      const selectedCategory = state.selected === category ? '' : category
      return { ...state, selected: selectedCategory }
    default:
      return state
  }
}

const defaultPostsState = {
  all: {},
  orderBy: 'voteScore'
}

function posts(state = defaultPostsState, action) {
  const { type, posts, value, post, operation } = action
  switch (type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        all: posts.reduce((postsObj, post) => {
          postsObj[post.id] = post
          return postsObj
        }, {})
      }
    case ORDER_POSTS:
      const orderedPosts = Object.values(state.all).sort((a, b) => {
        if (a[value] > b[value]) return -1
        if (a[value] < b[value]) return 1
        return 0
      })
      return {
        all: orderedPosts.reduce((postsObj, post) => {
          postsObj[post.id] = post
          return postsObj
        }, {}),
        orderBy: value
      }
    case ADJUST_POST_SCORE:
      if (operation === 'increment') {
        return {
          ...state,
          all: {
            ...state.all,
            [post.id]: {
              ...state.all[post.id],
              voteScore: state.all[post.id].voteScore + 1
            }
          }
        }
      } else {
        return {
          ...state,
          all: {
            ...state.all,
            [post.id]: {
              ...state.all[post.id],
              voteScore: state.all[post.id].voteScore - 1
            }
          }
        }
      }
    default:
      return state
  }
}

const defaultCommentsState = {
  byParentId: {}
}

function comments(state = defaultCommentsState, action) {
  const { type, comments, post } = action
  switch (type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        byParentId: {
          ...state.byParentId,
          [post.id]: comments
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
