import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, orderPostsBy, adjustServerPostScore } from '../actions'

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const {
      orderBy,
      orderPostsBy,
      posts,
      adjustPostScore,
      comments
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
          <button className="btn btn-success">Add Post +</button>
        </div>
        <div>
          <div>
            <ul className="list-group">
              {posts.map(post =>
                <li className="list-group-item" key={post.id}>
                  <h4>
                    <Link to={`/${post.category}/${post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p>
                    Author: {post.author}
                  </p>
                  <p>
                    Date created: {new Date(post.timestamp).toLocaleString()}
                  </p>
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
                  <p>
                    Comments: {comments[post.id] && comments[post.id].length}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
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
  const pathname = props.location.pathname
  const filterBy = pathname.replace(/\//g, '')
  if (filterBy !== '') {
    posts = posts.filter(post => {
      return filterBy === post.category
    })
  }

  return {
    posts,
    orderBy: state.posts.orderBy,
    comments: state.comments.byParentId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    orderPostsBy: value => dispatch(orderPostsBy(value)),
    adjustPostScore: (post, operation, orderBy) =>
      dispatch(adjustServerPostScore(post, operation, orderBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
