import React, { Component } from 'react'
import propTypes from 'prop-types'
import Scheduler from './Scheduler'
import HoursOfOperationModal from './HoursOfOperationModal'
import Fade from 'react-reveal/Fade'
import BreadCrumb from './BreadCrumb'
import Button from './common/Button'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import system from '../design/theme'

// this component will house all of the main features for the create schedule page.
class CreateSchedule extends React.Component {
  state = { hoursModal: false }

  toggleModal = e => {
    this.setState(state => ({ hoursModal: !state.hoursModal }))
  }

  render() {
    return (
      <OuterContainer
        style={
          this.state.hoursModal
            ? {
                height: '100vh',
                overflowY: 'hidden'
              }
            : undefined
        }
      >
        <LeftSideBar />
        <BreadCrumb location="Schedule" />
        {/* DO NOT REMOVE THE LEFTSIDEBAR AND BREADCRUMB COMPONENTS - THEY NEED TO BE HERE */}
        <Scheduler />
      </OuterContainer>
    )
  }
}

export default CreateSchedule

CreateSchedule.propTypes = {
  // add propTypes here
}
