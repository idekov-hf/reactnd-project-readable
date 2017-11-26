import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, adjustServerPostScore } from '../actions'
import NewComment from './NewComment'
import ListComments from './ListComments'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'

class PostDetail extends Component {
  componentDidMount() {
    if (Object.keys(this.props.post).length === 0) {
      this.props.fetchPost(this.props.postId)
    }
  }
  render() {
    const { post, postId, adjustPostScore, orderBy, comments } = this.props
    return (
      <div>
        <div className="post">
          <h1>
            {post.title}
          </h1>
          <h3>
            Author: {post.author}
          </h3>
          <p>
            {new Date(post.timestamp).toLocaleString()}
          </p>
          <p>
            {post.body}
          </p>
          <div className="vote-score-container">
            <p className="vote-score-number">
              Score: {post.voteScore}
            </p>
            <div className="vote-score-controls">
              <button
                value="decrement"
                onClick={e => adjustPostScore(post, e.target.value, orderBy)}
              >
                -
              </button>
              <button
                value="increment"
                onClick={e => adjustPostScore(post, e.target.value, orderBy)}
              >
                +
              </button>
            </div>
          </div>
          <p>
            Comments: {comments.length}
          </p>
          <div className="post-buttons">
            <button className="btn btn-info edit-icon">
              <FaEdit size={20} onClick={() => {}} />
            </button>
            <button className="btn btn-danger delete-icon">
              <FaTrashO size={20} onClick={() => {}} />
            </button>
          </div>
        </div>

        <div className="comments-header-container">
          <h2>Comments</h2>
          <hr />
        </div>

        <div>
          <ListComments comments={comments} />
        </div>

        <div className="new-comment">
          <NewComment postId={postId} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const postId = props.match.params.postId
  return {
    post: state.posts.all[postId] ? state.posts.all[postId] : {},
    postId: postId,
    orderBy: state.posts.orderBy,
    comments: Object.values(state.comments).filter(
      comment => comment.parentId === postId
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: postId => dispatch(fetchPost(postId)),
    adjustPostScore: (post, operation, orderBy) =>
      dispatch(adjustServerPostScore(post, operation, orderBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
