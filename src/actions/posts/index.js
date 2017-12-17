import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADJUST_POST_SCORE,
  UPDATE_POST,
  DELETE_POST,
  ADD_POST
} from './types'
import * as APIUtil from '../../utils/api'
import { fetchComments } from '../comments'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch =>
  APIUtil.fetchPosts().then(posts => {
    dispatch(receivePosts(posts))
    posts.forEach(post => dispatch(fetchComments(post)))
  })

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = postId => dispatch =>
  APIUtil.fetchPost(postId).then(post => {
    dispatch(receivePost(post))
    dispatch(fetchComments(post))
  })

export const adjustLocalPostScore = (post, operation) => ({
  type: ADJUST_POST_SCORE,
  post,
  operation
})

export const adjustServerPostScore = (post, operation) => dispatch => {
  const option = operation === 'increment' ? 'upVote' : 'downVote'
  APIUtil.adjustPostScore(post, option).then(() => {
    dispatch(adjustLocalPostScore(post, operation))
  })
}

export const updatePostInStore = post => ({
  type: UPDATE_POST,
  post
})

export const updatePost = (postId, postData) => dispatch => {
  APIUtil.updatePost(postId, postData).then(updatedPost =>
    dispatch(updatePostInStore(updatedPost))
  )
}

export const deletePostInStore = postId => {
  return {
    type: DELETE_POST,
    postId
  }
}

export const deletePost = postId => dispatch => {
  APIUtil.deletePost(postId).then(() => dispatch(deletePostInStore(postId)))
}

export const addPostToStore = post => {
  return {
    type: ADD_POST,
    post
  }
}

export const addPost = post => dispatch => {
  APIUtil.addPost(post).then(newPost => {
    dispatch(addPostToStore(newPost))
  })
}
