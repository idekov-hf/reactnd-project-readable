import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, orderPostsBy } from '../actions'

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    return (
      <div className="col-sm-8">
        <div className="vertical-align">
          <h2>Posts</h2>
          <select
            defaultValue="orderBy"
            className="order-by"
            onChange={e => this.props.orderPostsBy(e.target.value)}
          >
            <option value="orderBy" disabled="disabled">
              Order by
            </option>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time</option>
          </select>
          <button className="btn btn-success">Add Post +</button>
        </div>
        <div>
          <div>
            <ul className="list-group">
              {this.props.posts.map(post =>
                <li className="list-group-item" key={post.id}>
                  <h4>
                    <a href="#">
                      {post.title}
                    </a>
                  </h4>
                  <p>
                    Score: {post.voteScore}
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

function mapStateToProps(state) {
  return {
    posts: Object.keys(state.posts).reduce((postsArr, postKey) => {
      postsArr.push(state.posts[postKey])
      return postsArr
    }, [])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    orderPostsBy: value => dispatch(orderPostsBy(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
