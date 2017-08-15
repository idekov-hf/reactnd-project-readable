import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class ListCategories extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Categories</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {this.props.categories.map(category =>
                <li className="list-group-item" key={category.path}>
                  <a href="#">
                    {category.name}
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
    categories: Object.keys(
      state.categories
    ).reduce((categoryArr, categoryKey) => {
      categoryArr.push(state.categories[categoryKey])
      return categoryArr
    }, [])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)
