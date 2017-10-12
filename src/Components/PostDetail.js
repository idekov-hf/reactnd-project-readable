import React, { Component } from 'react'
import { connect } from 'react-redux'
import { adjustServerPostScore } from '../actions'

class PostDetail extends Component {
  render() {
    const { post, adjustPostScore, orderBy } = this.props
    return (
      <div>
        <h1>{post.title}</h1>
        <h3>{post.author}</h3>
        <p>{new Date(post.timestamp).toLocaleString()}</p>
        <div className="vote-score-container">
          <p className="vote-score-number">
            Score: {post.voteScore}
          </p>
          <div className="vote-score-controls">
            <button
              value="decrement"
              onClick={e =>
                adjustPostScore(post, e.target.value, orderBy)}
            >
              -
            </button>
            <button
              value="increment"
              onClick={e =>
                adjustPostScore(post, e.target.value, orderBy)}
            >
              +
            </button>
          </div>
        </div>
        <p>{post.body}</p>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    post: state.posts.all[props.location.state.postId],
    orderBy: state.posts.orderBy
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adjustPostScore: (post, operation, orderBy) =>
      dispatch(adjustServerPostScore(post, operation, orderBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
