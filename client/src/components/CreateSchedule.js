import React, { Component } from 'react'
import propTypes from 'prop-types'
import Scheduler from './Scheduler'
import Modal from './Modal'
import HoursOfOperation from './HoursOfOperation'
import Fade from 'react-reveal/Fade'
import BreadCrumb from './BreadCrumb'
import Button from './common/Button'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import Alert from './common/Alert'
import system from '../design/theme'

// this component will house all of the main features for the create schedule page.
class CreateSchedule extends React.Component {
  state = { hoursModal: false }

  toggleModal = e => {
    this.setState(state => ({ hoursModal: !state.hoursModal }))
  }

  render() {
    return (
      <OuterContainer>
        <LeftSideBar />
        <BreadCrumb location="Schedule" />
        {/* DO NOT REMOVE THE LEFTSIDEBAR AND BREADCRUMB COMPONENTS - THEY NEED TO BE HERE */}
        <MainContentHolder>
          <MobileOnly>
            <Alert>Review only on mobile view</Alert>
          </MobileOnly>
          <div>
            <Modal show={this.state.hoursModal} toggleShow={this.toggleModal}>
              <HoursOfOperation />
            </Modal>
            <Scheduler toggleModal={this.toggleModal} />
          </div>
        </MainContentHolder>
      </OuterContainer>
    )
  }
}

export default CreateSchedule

CreateSchedule.propTypes = {
  // add propTypes here
}

const MainContentHolder = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  position: relative;

  @media ${system.breakpoints[0]} {
    padding: 20px;
  }
`

const MobileOnly = styled.div`
  display: none;

  @media ${system.breakpoints[0]} {
    display: block;
  }
`
