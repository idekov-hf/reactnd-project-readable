import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class ListCategories extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  render() {
    return (
      <div className="col-sm-4">
        <h2>Categories</h2>
        <div>
          <div>
            <div className="list-group">
              {this.props.categories.map(category =>
                <a
                  className="list-group-item list-group-item-action"
                  key={category.path}
                >
                  {category.name}
                </a>
              )}
            </div>
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
