import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Textarea from 'react-textarea-autosize'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'
import ScoreMechanism from './ScoreMechanism'
import { modalStyles } from '../styles/modal-styles'
import {
  fetchPosts,
  adjustServerPostScore,
  addPost,
  deletePost,
  updatePost,
  orderPostsBy
} from '../actions/posts'
import { generateId } from '../utils/helperMethods'

class ListPosts extends Component {
  state = {
    newPostModalOpen: false,
    postEditModalOpen: false,
    post: null
  }
  componentDidMount() {
    this.props.fetchPosts()
  }
  openNewPostModal = () => {
    this.setState({ newPostModalOpen: true })
  }
  closeNewPostModal = () => {
    this.setState({ newPostModalOpen: false })
  }
  openPostEditModal = (event, post) => {
    this.setState({ postEditModalOpen: true, post })
  }
  closePostEditModal = () => {
    this.setState({ postEditModalOpen: false })
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
    const {
      orderBy,
      orderPostsBy,
      visiblePosts,
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
              value={orderBy}
              className="order-by"
              onChange={e => {
                orderPostsBy(e.target.value)
              }}
            >
              <option value="voteScore">Most Votes</option>
              <option value="timestamp">Newest Post</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={this.openNewPostModal}>
            Add Post +
          </button>
        </div>
        <div>
          <div>
            <ul className="list-group">
              {visiblePosts.map(post => (
                <li className="list-group-item post-list-item" key={post.id}>
                  <div className="content">
                    <h4>
                      <Link to={`/${post.category}/${post.id}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <p>Author: {post.author}</p>
                    <p>
                      Date created: {new Date(post.timestamp).toLocaleString()}
                    </p>
                    <ScoreMechanism
                      score={post.voteScore}
                      onDecrement={() => adjustPostScore(post.id, 'downVote')}
                      onIncrement={() => adjustPostScore(post.id, 'upVote')}
                    />
                    <p>
                      Comments:{' '}
                      {numComments[post.id] ? numComments[post.id] : 0}
                    </p>
                  </div>

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
                </li>
              ))}
            </ul>
          </div>
        </div>

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

function mapStateToProps({ posts, comments, categories }, props) {
  let visiblePosts = Object.keys(posts.all).reduce((postsArr, postKey) => {
    postsArr.push(posts.all[postKey])
    return postsArr
  }, [])

  const { orderBy } = posts
  visiblePosts = visiblePosts.sort((a, b) => {
    if (a[orderBy] > b[orderBy]) return -1
    if (a[orderBy] < b[orderBy]) return 1
    return 0
  })

  // Filter posts if category has been selected
  const filterBy = props.category
  if (filterBy !== '') {
    visiblePosts = visiblePosts.filter(post => {
      return filterBy === post.category
    })
  }

  const numComments = Object.values(comments).reduce((obj, comment) => {
    const parentId = comments[comment.id].parentId
    return {
      ...obj,
      [parentId]: obj[parentId] === undefined ? 1 : obj[parentId] + 1
    }
  }, {})

  return {
    visiblePosts,
    orderBy,
    numComments,
    categories: categories.all
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    adjustPostScore: (post, operation) =>
      dispatch(adjustServerPostScore(post, operation)),
    addPost: post => dispatch(addPost(post)),
    deletePost: postId => dispatch(deletePost(postId)),
    updatePost: (postId, postData) => dispatch(updatePost(postId, postData)),
    orderPostsBy: value => dispatch(orderPostsBy(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
