import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route exact path="/" render={() => (
          <div className="row">
            <ListCategories />
            <ListPosts />
          </div>
        )} />
        <Route path="/post/" component={PostDetail} />
      </div>
    )
  }
}

export default App
