import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchPost,
  adjustServerPostScore,
  updatePost,
  deletePost
} from "../actions"
import NewComment from "./NewComment"
import ListComments from "./ListComments"
import { FaEdit, FaTrashO } from "react-icons/lib/fa"
import Modal from "react-modal"
import Textarea from "react-textarea-autosize"
import { modalStyles } from "../styles/modal-styles"

class PostDetail extends Component {
  state = {
    postModalOpen: false,
    postId: null
  }
  componentDidMount() {
    if (Object.keys(this.props.post).length === 0) {
      this.props.fetchPost(this.props.postId)
    }
  }
  openPostModal = postId => {
    this.setState({ postModalOpen: true, postId })
  }
  closePostModal = () => {
    this.setState({ postModalOpen: false })
  }
  handlePostEdit(event) {
    event.preventDefault()
    this.closePostModal()

    const updatedPostData = {
      title: event.target.titleInput.value,
      body: event.target.bodyTextarea.value
    }

    this.props.updatePost(this.state.postId, updatedPostData)
  }
  handlePostDelete = (event, postId) => {
    this.props.deletePost(postId)
    this.props.history.push("/")
  }
  render() {
    const { postModalOpen } = this.state
    const { post, postId, adjustPostScore, orderBy, comments } = this.props
    return (
      <div>
        <div className="post">
          <h1>{post.title}</h1>
          <h3>Author: {post.author}</h3>
          <p>{new Date(post.timestamp).toLocaleString()}</p>
          <p>{post.body}</p>
          <div className="vote-score-container">
            <p className="vote-score-number">Score: {post.voteScore}</p>
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
          <p>Comments: {comments.length}</p>
          <div className="post-buttons">
            <button
              className="btn btn-info edit-icon"
              onClick={() => this.openPostModal(post.id)}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="btn btn-danger delete-icon"
              onClick={event => this.handlePostDelete(event, post.id)}
            >
              <FaTrashO size={20} />
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

        <Modal
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          style={modalStyles}
        >
          <form onSubmit={event => this.handlePostEdit(event)}>
            <label>
              Title
              <input
                name="titleInput"
                className="form-control"
                placeholder="Title"
                defaultValue={post.title}
              />
            </label>
            <label>
              Post body
              <Textarea
                name="bodyTextarea"
                className="form-control"
                placeholder="Your post's body"
                defaultValue={post.body}
                minRows={2}
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
      dispatch(adjustServerPostScore(post, operation, orderBy)),
    updatePost: (postId, postData) => dispatch(updatePost(postId, postData)),
    deletePost: postId => dispatch(deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
