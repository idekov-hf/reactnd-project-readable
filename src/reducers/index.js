import { combineReducers } from "redux"
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  ORDER_POSTS,
  ADJUST_POST_SCORE,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  ADJUST_COMMENT_SCORE,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_POST,
  DELETE_POST
} from "../actions"

const defaultCategoriesState = {
  all: [],
  selected: ""
}

function categories(state = defaultCategoriesState, action) {
  const { type, categories } = action
  switch (type) {
    case RECEIVE_CATEGORIES:
      return { ...state, all: categories }
    default:
      return state
  }
}

const defaultPostsState = {
  all: {},
  orderBy: "voteScore"
}

function posts(state = defaultPostsState, action) {
  const { type, posts, value, post, operation, postId } = action
  switch (type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        all: posts.reduce((postsObj, post) => {
          postsObj[post.id] = post
          return postsObj
        }, {})
      }
    case RECEIVE_POST:
      return {
        ...state,
        all: {
          [post.id]: post
        }
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
      return {
        ...state,
        all: {
          ...state.all,
          [post.id]: {
            ...state.all[post.id],
            voteScore:
              operation === "increment"
                ? state.all[post.id].voteScore + 1
                : state.all[post.id].voteScore - 1
          }
        }
      }
    case UPDATE_POST:
      return {
        ...state,
        all: {
          ...state.all,
          [post.id]: post
        }
      }
    case DELETE_POST:
      return {
        ...state,
        all: {
          ...Object.values(state.all)
            .filter(post => post.id !== postId)
            .reduce(
              (allPosts, post) => ({
                ...allPosts,
                [post.id]: post
              }),
              {}
            )
        }
      }
    default:
      return state
  }
}

function comments(state = {}, action) {
  const { type, comments, comment, commentId, updatedScore } = action
  switch (type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...comments.reduce(
          (commentObj, comment) => ({
            ...commentObj,
            [comment.id]: comment
          }),
          {}
        )
      }
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }
    case ADJUST_COMMENT_SCORE:
      return {
        ...state,
        [commentId]: {
          ...state[commentId],
          voteScore: updatedScore
        }
      }
    case DELETE_COMMENT:
      return {
        ...Object.values(state)
          .filter(comment => comment.id !== commentId)
          .reduce(
            (comments, comment) => ({
              ...comments,
              [comment.id]: comment
            }),
            {}
          )
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        [comment.id]: comment
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
