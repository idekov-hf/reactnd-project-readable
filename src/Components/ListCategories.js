import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, setSelectedCategory } from '../actions'

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
              {this.props.categories.map(category => {
                const selected = this.props.selectedCategory === category.name
                return (
                  <a
                    className={`list-group-item list-group-item-action ${selected
                      ? 'active'
                      : ''}`}
                    key={category.path}
                    onClick={() =>
                      this.props.setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </a>
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
    categories: state.categories.all,
    selectedCategory: state.categories.selected
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    setSelectedCategory: category => dispatch(setSelectedCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)
