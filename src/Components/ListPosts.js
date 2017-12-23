import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ScoreMechanism from './ScoreMechanism'
import NewPost from './NewPost'
import PostControls from './PostControls'
import {
  fetchPosts,
  adjustServerPostScore,
  orderPostsBy
} from '../actions/posts'

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
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
          <NewPost />
        </div>
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
                    Comments: {numComments[post.id] ? numComments[post.id] : 0}
                  </p>
                </div>
                <PostControls post={post} />
              </li>
            ))}
          </ul>
        </div>
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
    orderPostsBy: value => dispatch(orderPostsBy(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
