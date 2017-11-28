import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyles } from '../styles/modal-styles'
import Textarea from 'react-textarea-autosize'
import {
  fetchPosts,
  orderPostsBy,
  adjustServerPostScore,
  addPost
} from '../actions'
import { generateId } from '../utils/helperMethods'

class ListPosts extends Component {
  state = {
    postModalOpen: false
  }
  componentDidMount() {
    this.props.fetchPosts()
  }
  openPostModal = () => {
    this.setState({ postModalOpen: true })
  }
  closePostModal = () => {
    this.setState({ postModalOpen: false })
  }
  handleCreatePost = event => {
    event.preventDefault()
    this.closePostModal()

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
    const {
      orderBy,
      orderPostsBy,
      posts,
      adjustPostScore,
      numComments
    } = this.props
    return (
      <div className="col-sm-8">
        <div className="vertical-align">
          <h2>Posts</h2>
          <div>
            Order by:
            <select
              defaultValue={orderBy}
              className="order-by"
              onChange={e => orderPostsBy(e.target.value)}
            >
              <option value="voteScore">Most Votes</option>
              <option value="timestamp">Newest Post</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={this.openPostModal}>
            Add Post +
          </button>
        </div>
        <div>
          <div>
            <ul className="list-group">
              {posts.map(post => (
                <li className="list-group-item" key={post.id}>
                  <h4>
                    <Link to={`/${post.category}/${post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p>Author: {post.author}</p>
                  <p>
                    Date created: {new Date(post.timestamp).toLocaleString()}
                  </p>
                  <div className="vote-score-container">
                    <p className="vote-score-number">Score: {post.voteScore}</p>
                    <div className="vote-score-controls">
                      <button
                        value="decrement"
                        onClick={e =>
                          adjustPostScore(post, e.target.value, orderBy)
                        }
                      >
                        -
                      </button>
                      <button
                        value="increment"
                        onClick={e =>
                          adjustPostScore(post, e.target.value, orderBy)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p>
                    Comments: {numComments[post.id] ? numComments[post.id] : 0}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Modal
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
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
                {this.props.comments.map(comment => (
                  <option value={`${comment.name}`} key={comment.path}>
                    {comment.name}
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

function mapStateToProps(state, props) {
  let posts = Object.keys(state.posts.all).reduce((postsArr, postKey) => {
    postsArr.push(state.posts.all[postKey])
    return postsArr
  }, [])

  // Filter posts if category has been selected
  const filterBy = props.category
  if (filterBy !== '') {
    posts = posts.filter(post => {
      return filterBy === post.category
    })
  }

  const numComments = Object.values(state.comments).reduce((obj, comment) => {
    const parentId = state.comments[comment.id].parentId
    return {
      ...obj,
      [parentId]: obj[parentId] === undefined ? 1 : obj[parentId] + 1
    }
  }, {})

  return {
    posts,
    orderBy: state.posts.orderBy,
    numComments: numComments,
    comments: state.categories.all
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    orderPostsBy: value => dispatch(orderPostsBy(value)),
    adjustPostScore: (post, operation, orderBy) =>
      dispatch(adjustServerPostScore(post, operation, orderBy)),
    addPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
