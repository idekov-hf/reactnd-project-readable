import React, { Component } from 'react'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <ListCategories />
          <ListPosts />
        </div>
      </div>
    )
  }
}

export default App
