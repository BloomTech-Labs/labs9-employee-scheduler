import React, { Component } from 'react'
import moment from 'moment'
import Form from '../Form/index'
import axios from 'axios'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'

class AvailabilityForm extends Component {
  render() {
    return (
      <div>
        <h5>Edit Availability</h5>
        <Form />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { editAvailability }
)(AvailabilityForm)
