import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import { generateId } from '../utils/helperMethods'

class NewComment extends Component {
  handleSubmit(event) {
    event.preventDefault()
    const nameInput = event.target.nameInput
    const commentTextarea = event.target.commentTextarea
    const postId = this.props.postId
    const newComment = {
      id: generateId(),
      timestamp: Date.now(),
      body: commentTextarea.value,
      author: nameInput.value,
      parentId: postId
    }
    this.props.addComment(newComment, postId)
    nameInput.value = ''
    commentTextarea.value = ''
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form onSubmit={event => this.handleSubmit(event)}>
            <label>
              Name
              <input
                name="nameInput"
                className="form-control"
                placeholder="Your name"
              />
            </label>
            <label>
              Comment
              <textarea
                name="commentTextarea"
                className="form-control"
                placeholder="Type your comment here"
              />
            </label>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment, postId) => dispatch(addComment(comment, postId))
  }
}

export default connect(null, mapDispatchToProps)(NewComment)
