import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Textarea from 'react-textarea-autosize'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'
import { modalStyles } from '../styles/modal-styles'
import { deletePost, updatePost } from '../actions/posts'

class PostControls extends Component {
  state = {
    postEditModalOpen: false,
    post: null
  }
  openPostEditModal = (event, post) => {
    this.setState({ postEditModalOpen: true, post })
  }
  closePostEditModal = () => {
    this.setState({ postEditModalOpen: false })
  }
  handlePostDelete = (event, postId) => {
    this.props.deletePost(postId)
  }
  handlePostEdit(event) {
    event.preventDefault()
    this.closePostEditModal()

    const updatedPostData = {
      title: event.target.titleInput.value,
      body: event.target.bodyTextarea.value
    }

    this.props.updatePost(this.state.post.id, updatedPostData)
  }
  render() {
    const { post } = this.props
    return (
      <div className="controls-container">
        <div className="buttons">
          <FaEdit
            size={30}
            className="edit-icon"
            onClick={event => this.openPostEditModal(event, post)}
          />
          <FaTrashO
            size={30}
            className="delete-icon"
            onClick={event => {
              this.handlePostDelete(event, post.id)
            }}
          />
        </div>

        <Modal
          isOpen={this.state.postEditModalOpen}
          onRequestClose={this.closePostEditModal}
          style={modalStyles}
        >
          <form onSubmit={event => this.handlePostEdit(event)}>
            <label>
              Title
              <input
                name="titleInput"
                className="form-control"
                placeholder="Title"
                defaultValue={this.state.post ? this.state.post.title : ''}
              />
            </label>
            <label>
              Post body
              <Textarea
                name="bodyTextarea"
                className="form-control"
                placeholder="Your post's body"
                defaultValue={this.state.post ? this.state.post.body : ''}
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

export default connect(null, { updatePost, deletePost })(PostControls)
