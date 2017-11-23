import React, { Component } from 'react'
import { connect } from 'react-redux'
import { adjustCommentScore } from '../actions'

class ListComments extends Component {
  render() {
    const { comments, adjustCommentScore } = this.props
    return (
      <ul className="list-group">
        {comments.map(comment =>
          <li className="list-group-item" key={comment.id}>
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
          </li>
        )}
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    adjustCommentScore: (comment, option) =>
      dispatch(adjustCommentScore(comment, option))
  }
}

export default connect(null, mapDispatchToProps)(ListComments)
