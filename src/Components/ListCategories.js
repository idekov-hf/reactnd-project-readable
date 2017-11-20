import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions'

class ListCategories extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  render() {
    const selectedCategory = this.props.category
    return (
      <div className="col-sm-4">
        <h2>Categories</h2>
        <div>
          <div>
            <div className="list-group">
              {this.props.categories.map(category => {
                const selected = selectedCategory === category.name
                return (
                  <Link
                    to={`/${selected ? '' : category.name}`}
                    className={`list-group-item list-group-item-action ${selected
                      ? 'active'
                      : ''}`}
                    key={category.path}
                  >
                    {category.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.all
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)
