import React, { Component } from 'react'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <ListCategories />
        <ListPosts />
      </div>
    )
  }
}

export default App
