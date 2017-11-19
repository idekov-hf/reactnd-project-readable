import React, { Component } from 'react'
import { connect } from 'react-redux'

class ListComments extends Component {
  render() {
    const { comments } = this.props
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
                <button value="decrement" onClick={e => console.log(e)}>
                  -
                </button>
                <button value="increment" onClick={e => console.log(e)}>
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

function mapStateToProps(state, props) {
  const comments =
    Object.values(state.comments.byParentId).length > 0
      ? state.comments.byParentId[props.postID]
      : []
  return {
    comments: comments
  }
}

// function mapDispatchToProps(dispatch) {
//   return {}
// }

export default connect(mapStateToProps, null)(ListComments)
