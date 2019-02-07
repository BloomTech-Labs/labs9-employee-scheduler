import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Scheduler from '../components/Scheduler'
import Modal from '../components/Modal'
import HoursOfOperationForm from '../components/HoursOfOperationForm'
import TopBar from '../components/common/TopBar'
import NavMenu from '../components/common/NavMenu'
import OuterContainer from '../components/common/OuterContainer'
import styled from '@emotion/styled'
import Alert from '../components/common/Alert'
import system from '../design/theme'

// this component will house all of the main features for the create schedule page.
const CreateSchedule = props => {
  const [state, setState] = useState({
    hoursModal: false
  })

  const toggleModal = e => {
    setState(state => ({ ...state, hoursModal: !state.hoursModal }))
  }

  return (
    <OuterContainer>
      <NavMenu />
      <TopBar location="Schedule" />
      {/* DO NOT REMOVE THE NavMenu AND TopBar COMPONENTS - THEY NEED TO BE HERE */}
      <MainContentHolder>
        <MobileOnly>
          <Alert>
            This calendar is read-only on mobile for now.
            <br />
            We're working hard to release mobile editing soon.
          </Alert>
        </MobileOnly>
        <div>
          <Modal show={state.hoursModal} toggleShow={toggleModal}>
            <HoursOfOperationForm />
          </Modal>
          <Scheduler toggleModal={toggleModal} />
        </div>
      </MainContentHolder>
    </OuterContainer>
  )
}

export default CreateSchedule

CreateSchedule.propTypes = {
  toggleModal: PropTypes.func,
  hoursModal: PropTypes.bool
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
