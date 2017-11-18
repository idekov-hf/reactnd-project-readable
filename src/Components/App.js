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
            return (
              <div className="row">
                <ListCategories location={props.location} />
                <ListPosts location={props.location} />
              </div>
            )
          }}
        />
        <Route exact path="/:category/:post_id" component={PostDetail} />
      </div>
    )
  }
}

export default App
