import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../../design/theme'
import Availability from './Availability'
import TimeOff from './TimeOff'
import ReactTooltip from 'react-tooltip'
import drag from '../../../img/drag.svg'

// this card component will contain the employee's info such as name, email, phone.
// these cards will live in both the calendar page (view only) and the employees directory (edit possible)
class Card extends Component {
  render() {
    const {
      first_name,
      last_name,
      availabilities,
      time_off_requests,
      width
    } = this.props
    return (
      //tooltip added to help the user understand how to schedule employees
      <Container
        data-testid="employee-card"
        data-tip="drag card to calendar to schedule"
        className="tooltip"
      >
        <ReactTooltip type="dark" effect="solid" place="right" />
        <div className="x" />
        {/* Employee Name */}
        <Name>

        <P main>{`${first_name} ${last_name}`}</P>
        {/* drag and drop icon */}
        <img src={drag}/>
        </Name>
        <div>
          {/* the below two things should conditionally render based on whether there is data or not */}
          {availabilities && availabilities.length ? (
            <Availability availabilities={availabilities} />
          ) : null}

          {time_off_requests && time_off_requests.length ? (
            <TimeOff
              timeOffRequests={time_off_requests}
              view={this.props.view}
            />
          ) : null}
        </div>
      </Container>
    )
  }
}

export default Card

Card.propTypes = {
  // adding propTypes here
  first_name: propTypes.string,
  last_name: propTypes.string,
  email: propTypes.string,
  phone: propTypes.string,
  availabilities: propTypes.array,
  time_off_requests: propTypes.array
}

const Container = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: 12.5px 0;
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.otherLight};
  /* the a tag is intended to work on the tooltip, but it's not working */
  a {
    z-index: 200;
  }
 
  @media ${system.breakpoints[1]} {
    width: 220px;
  }
`
/* // this width is temp until we get a better system */

const P = styled.p`
  padding: 2.5px 7.5px;
  font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
  font-weight: ${props => (props.main ? 'bold' : null)};
  color: ${props =>
    props.main ? system.color.primary : system.color.captiontext};
  font-size: ${props =>
    props.main ? system.fontSizing.m : system.fontSizing.sm};
  line-height: ${system.spacing.lineHeight};
  text-align: start;
  @media ${system.breakpoints[1]} {
    text-align: center;
  }

  span {
    font-size: ${system.fontSizing.s};
    color: ${system.color.bodytext};
    font-weight: bold;
  }
`
const Name = styled('div')`
display: flex;
flex-direction: row;
justify-content: space-between;

img {
    width: 28px;
    height: 28px;
    margin-top: 3px;
  }
`
