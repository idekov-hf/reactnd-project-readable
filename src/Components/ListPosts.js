import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Posts</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {this.props.posts.map(post =>
                <li className="list-group-item" key={post.id}>
                  <a href="#">
                    {post.title}
                  </a>
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
