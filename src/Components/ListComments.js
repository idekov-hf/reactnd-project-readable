import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  adjustCommentScore,
  deleteComment,
  updateComment
} from '../actions/comments'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'
import Modal from 'react-modal'
import { modalStyles } from '../styles/modal-styles'
import Textarea from 'react-textarea-autosize'

class ListComments extends Component {
  state = {
    commentModalOpen: false,
    commentId: null,
    commentAuthor: null,
    commentBody: null
  }
  openCommentModal = comment => {
    this.setState({
      commentModalOpen: true,
      commentId: comment.id,
      commentAuthor: comment.author,
      commentBody: comment.body
    })
  }
  closeCommentModal = () => {
    this.setState({ commentModalOpen: false })
  }
  handleUpdate = event => {
    event.preventDefault()
    this.closeCommentModal()

    const updatedCommentDetails = {
      timestamp: Date.now(),
      body: event.target.commentTextarea.value
    }
    this.props.updateComment(this.state.commentId, updatedCommentDetails)
  }
  render() {
    const { commentModalOpen } = this.state
    const { comments, adjustCommentScore, deleteComment } = this.props
    return (
      <div>
        <ul className="list-group">
          {comments.map(comment => (
            <li className="list-group-item comment" key={comment.id}>
              <div className="content">
                <h4>Author: {comment.author}</h4>
                <p>{new Date(comment.timestamp).toLocaleString()}</p>
                <p>{comment.body}</p>
                <div className="vote-score-container">
                  <p className="vote-score-number">
                    Score: {comment.voteScore}
                  </p>

                  <div className="vote-score-controls">
                    <button
                      value="downVote"
                      onClick={e => adjustCommentScore(comment, e.target.value)}
                    >
                      -
                    </button>
                    <button
                      value="upVote"
                      onClick={e => adjustCommentScore(comment, e.target.value)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <FaEdit
                  size={30}
                  className="edit-icon"
                  onClick={() => this.openCommentModal(comment)}
                />
                <FaTrashO
                  size={30}
                  className="delete-icon"
                  onClick={() => deleteComment(comment)}
                />
              </div>
            </li>
          ))}
        </ul>

        <Modal
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          style={modalStyles}
        >
          <form onSubmit={event => this.handleUpdate(event)}>
            <label>Author: {this.state.commentAuthor}</label>
            <label>
              Edit your comment:
              <Textarea
                name="commentTextarea"
                className="form-control"
                placeholder="Type your comment here"
                defaultValue={this.state.commentBody}
                minRows={4}
                maxRows={8}
              />
            </label>
            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    adjustCommentScore: (comment, option) =>
      dispatch(adjustCommentScore(comment, option)),
    deleteComment: comment => dispatch(deleteComment(comment)),
    updateComment: (commentId, updatedComment) =>
      dispatch(updateComment(commentId, updatedComment))
  }
}

export default connect(null, mapDispatchToProps)(ListComments)
