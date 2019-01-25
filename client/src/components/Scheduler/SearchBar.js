import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { searchEmployees } from '../../actions'
class SearchBar extends Component {
  state = { searchTerm: '' }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for employee.."
          name="searchTerm"
          onChange={this.changeHandler}
          value={this.state.searchTerm}
        />
      </div>
    )
  }
}

export default connect(
  null
  // { searchEmployees }
)(SearchBar)
