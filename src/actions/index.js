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

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch =>
  APIUtil.fetchPosts().then(posts => {
    dispatch(receivePosts(posts))
    dispatch(orderPostsByVoteScore())
  })

export const ORDER_BY_VOTESCORE = 'ORDER_BY_VOTESCORE'
export const orderPostsByVoteScore = () => ({
  type: ORDER_BY_VOTESCORE
})
