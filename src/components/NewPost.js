import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'
import { modalStyles } from '../styles/modal-styles'
import { generateId } from '../utils/helperMethods'
import { addPost } from '../actions/posts'

class NewPost extends Component {
  state = {
    newPostModalOpen: false
  }
  openNewPostModal = () => {
    this.setState({ newPostModalOpen: true })
  }
  closeNewPostModal = () => {
    this.setState({ newPostModalOpen: false })
  }
  handleCreatePost = event => {
    event.preventDefault()
    this.closeNewPostModal()

    const newPost = {
      id: generateId(),
      timestamp: Date.now(),
      title: event.target.titleInput.value,
      body: event.target.bodyTextarea.value,
      author: event.target.authorInput.value,
      category: event.target.categorySelect.value
    }

    this.props.addPost(newPost)
  }
  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.openNewPostModal}>
          Add Post +
        </button>
        <Modal
          isOpen={this.state.newPostModalOpen}
          onRequestClose={this.closeNewPostModal}
          style={modalStyles}
        >
          <form onSubmit={event => this.handleCreatePost(event)}>
            <label>
              Title
              <input
                name="titleInput"
                className="form-control"
                placeholder="Title"
              />
            </label>
            <label>
              Author
              <input
                name="authorInput"
                className="form-control"
                placeholder="Your name"
              />
            </label>
            <label>
              Post body
              <Textarea
                name="bodyTextarea"
                className="form-control"
                placeholder="Your post's body"
                minRows={4}
                maxRows={12}
              />
            </label>
            <label>
              Select category
              <select name="categorySelect" className="new-post-select">
                {this.props.categories.map(category => (
                  <option value={`${category.name}`} key={category.path}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-success">
              Create Post
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.all
})

export default connect(mapStateToProps, { addPost })(NewPost)
