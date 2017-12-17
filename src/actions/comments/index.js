import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  ADJUST_COMMENT_SCORE,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from './types'
import * as APIUtil from '../../utils/api'

export const receiveComments = (comments, post) => ({
  type: RECEIVE_COMMENTS,
  comments,
  post
})

export const fetchComments = post => dispatch => {
  APIUtil.fetchComments(post.id).then(comments => {
    dispatch(receiveComments(comments, post))
  })
}

export const addCommentToStore = comment => ({
  type: ADD_COMMENT,
  comment
})

export const addComment = newComment => dispatch => {
  APIUtil.addComment(newComment).then(comment => {
    dispatch(addCommentToStore(comment))
  })
}

export const adjustCommentScoreInStore = (commentId, updatedScore) => ({
  type: ADJUST_COMMENT_SCORE,
  commentId,
  updatedScore
})

export const adjustCommentScore = (comment, option) => dispatch => {
  APIUtil.adjustCommentScore(comment.id, option).then(updatedComment => {
    const commentId = updatedComment.id
    const updatedScore = updatedComment.voteScore
    dispatch(adjustCommentScoreInStore(commentId, updatedScore))
  })
}

export const deleteCommentInStore = commentId => ({
  type: DELETE_COMMENT,
  commentId
})

export const deleteComment = comment => dispatch => {
  APIUtil.deleteComment(comment.id).then(() =>
    dispatch(deleteCommentInStore(comment.id))
  )
}

export const updateCommentInStore = comment => ({
  type: UPDATE_COMMENT,
  comment
})

export const updateComment = (commentId, commentDetails) => dispatch => {
  APIUtil.updateComment(commentId, commentDetails).then(updatedComment =>
    dispatch(updateCommentInStore(updatedComment))
  )
}
