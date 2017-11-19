import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, adjustServerPostScore } from '../actions'
import NewComment from './NewComment'
import ListComments from './ListComments'

class PostDetail extends Component {
  componentDidMount() {
    if (Object.keys(this.props.post).length === 0) {
      this.props.fetchPost(this.props.postID)
    }
  }
  render() {
    const { post, postID, adjustPostScore, orderBy, comments } = this.props
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
            Comments: {comments[post.id] && comments[post.id].length}
          </p>
        </div>

        <div className="new-comment">
          {<NewComment />}
        </div>

        <div>
          <ListComments postID={postID} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const pathname = props.location.pathname
  const postID = pathname.slice(pathname.indexOf('/', 1) + 1)
  return {
    post: state.posts.all[postID] ? state.posts.all[postID] : {},
    postID: postID,
    orderBy: state.posts.orderBy,
    comments: state.comments.byParentId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: postID => dispatch(fetchPost(postID)),
    adjustPostScore: (post, operation, orderBy) =>
      dispatch(adjustServerPostScore(post, operation, orderBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
