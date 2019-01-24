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
import { connect } from 'react-redux'

const mapStateToProps = ({ coverage }) => ({ coverage })

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
        <ButtonHolder>
          <Coverage>{`${this.props.coverage}% coverage`}</Coverage>
          <Button onClick={this.toggleModal}>Edit Hours of Operation</Button>
        </ButtonHolder>
        <HoursOfOperationModal hidden={!this.state.hoursModal} />
        <Scheduler />
      </OuterContainer>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(CreateSchedule)

CreateSchedule.propTypes = {
  // add propTypes here
}

const ButtonHolder = styled.div`
  z-index: 14;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-right: 20px;
`

const Coverage = styled.div`
  border: 1px solid grey;
  margin-right: 30px;
  display: flex;
  align-items: center;
  border-radius: ${system.borders.radius};
  border: ${system.borders.transparent};
  color: ${system.color.neutral};
  background: ${system.color.primary};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.sm};
  padding: ${system.spacing.standardPadding};
  outline: none;
`
