import * as APIUtil from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch =>
  APIUtil.fetchCategories().then(({ categories }) =>
    dispatch(receiveCategories(categories))
  )

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const setSelectedCategory = category => ({
  type: SET_SELECTED_CATEGORY,
  category
})

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch =>
  APIUtil.fetchPosts().then(posts => {
    dispatch(receivePosts(posts))
    dispatch(fetchComments(posts))
    dispatch(orderPostsBy('voteScore'))
  })

export const ORDER_POSTS = 'ORDER_POSTS'
export const orderPostsBy = value => ({
  type: ORDER_POSTS,
  value
})

export const ADJUST_POST_SCORE = 'ADJUST_POST_SCORE'
export const adjustLocalPostScore = (post, operation) => ({
  type: ADJUST_POST_SCORE,
  post,
  operation
})

export const adjustServerPostScore = (post, operation, orderBy) => dispatch => {
  const option = operation === 'increment' ? 'upVote' : 'downVote'
  APIUtil.adjustPostScore(post, option).then(() => {
    dispatch(adjustLocalPostScore(post, operation))
    if (orderBy === 'voteScore') {
      dispatch(orderPostsBy('voteScore'))
    }
  })
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const receiveComments = (comments, post) => ({
  type: RECEIVE_COMMENTS,
  comments,
  post
})

export const fetchComments = posts => dispatch => {
  posts.forEach(post =>
    APIUtil.fetchComments(post.id).then(comments => {
      dispatch(receiveComments(comments, post))
    })
  )
}
