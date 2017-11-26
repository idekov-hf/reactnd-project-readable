import React, { Component } from 'react'
import { connect } from 'react-redux'
import { adjustCommentScore, deleteComment } from '../actions'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'
import Modal from 'react-modal'

class ListComments extends Component {
  render() {
    const { comments, adjustCommentScore, deleteComment } = this.props
    return (
      <ul className="list-group">
        {comments.map(comment =>
          <li className="list-group-item comment" key={comment.id}>
            <div className="content">
              <h4>
                Author: {comment.author}
              </h4>
              <p>
                {new Date(comment.timestamp).toLocaleString()}
              </p>
              <p>
                {comment.body}
              </p>
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
              <FaEdit size={30} className="edit-icon" />
              <FaTrashO
                size={30}
                className="delete-icon"
                onClick={() => deleteComment(comment)}
              />
            </div>
          </li>
        )}
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    adjustCommentScore: (comment, option) =>
      dispatch(adjustCommentScore(comment, option)),
    deleteComment: comment => dispatch(deleteComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(ListComments)
