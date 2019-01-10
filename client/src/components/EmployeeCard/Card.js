import React, { Component } from 'react'
import propTypes from 'prop-types'

// this card component will contain the employee's info such as name, email, phone.
// these cards will live in both the calendar page (view only) and the employees directory (edit possible)
class Card extends Component {
  render() {
    return (
      <div>
        {/* Employee Name */}
        {/* Employee Email */}
        {/* Employee Phone */}
      </div>
    )
  }
}

export default Card

Card.propTypes = {
  // adding propTypes here
}
