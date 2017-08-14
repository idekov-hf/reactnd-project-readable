import React, { Component } from 'react'
import ListCategories from './ListCategories'

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App container">
        <ListCategories />
        <div className="page-header">
          <h1>Posts</h1>
        </div>
      </div>
    )
  }
}

export default App
