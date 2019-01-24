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
        <div style={{ position: 'relative' }}>
          <MainContentHolder>
            <MobileOnly>
              <Alert>Review only on mobile view</Alert>
            </MobileOnly>
            <div>
              <HoursOfOperationModal hidden={!this.state.hoursModal} />
              <Scheduler toggleModal={this.toggleModal} />
            </div>
          </MainContentHolder>
        </div>
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
