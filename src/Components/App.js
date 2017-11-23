import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route
          exact
          path="/:category?"
          render={props => {
            const category = props.match.params.category
              ? props.match.params.category
              : ''
            return (
              <div className="row">
                <ListCategories category={category} />
                <ListPosts category={category} />
              </div>
            )
          }}
        />
        <Route exact path="/:category/:postId" component={PostDetail} />
      </div>
    )
  }
}

export default App
