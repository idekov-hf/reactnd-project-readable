import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ListCategories from './ListCategories'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'
import NotFound from './NotFound'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Switch>
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
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
