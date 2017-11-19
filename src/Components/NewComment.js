import React, { Component } from 'react'

export default class NewComment extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form>
            <label>
              Name
              <input className="form-control" placeholder="Your name" />
            </label>
            <label>
              Comment
              <textarea
                className="form-control"
                placeholder="Type your comment here"
              />
            </label>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}
