import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    return (
      <div className="col-sm-8">
        <div className="vertical-align">
          <h2>Posts</h2>
          <div>
            Order by
            <select className="order-by">
              <option value="voteScore">Vote Score</option>
              <option value="time">Time</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <ul className="list-group">
              {this.props.posts.map(post =>
                <li className="list-group-item" key={post.id}>
                  <a href="#">
                    {post.title}
                  </a>
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
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
