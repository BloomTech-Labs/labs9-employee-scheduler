import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scheduler from './Scheduler'
import Modal from './Modal'
import HoursOfOperationForm from './HoursOfOperationForm'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import Alert from './common/Alert'
import system from '../design/theme'

// this component will house all of the main features for the create schedule page.
class CreateSchedule extends Component {
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
            <Alert>
              This calendar is read-only on mobile for now.
              <br />
              We're working hard to release mobile editing soon.
            </Alert>
          </MobileOnly>
          <div>
            <Modal show={this.state.hoursModal} toggleShow={this.toggleModal}>
              <HoursOfOperationForm />
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
  toggleModal: PropTypes.func,
  hoursModal: PropTypes.bool
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
