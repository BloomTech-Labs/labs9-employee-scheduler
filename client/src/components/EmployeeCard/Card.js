import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import axios from 'axios'
import Availability from './Availability'
import TimeOff from './TimeOff'
import Button from '../common/Button'
import { connect } from 'react-redux'
import { fetchEmployeesFromDB } from '../../actions'

// this card component will contain the employee's info such as name, email, phone.
// these cards will live in both the calendar page (view only) and the employees directory (edit possible)
class Card extends Component {
  openModal = event => {
    event.preventDefault()
    const r = window.confirm(
      `Are you sure you want to delete ${this.props.first_name} ${
        this.props.last_name
      }'s account and all associated data? This action is irreversible.`
    )

    if (r) {
      return this.deleteUser(this.props.id, this.props.organization_id)
    }
  }

  deleteUser = (id, org_id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
        headers: { authorization: this.props.token }
      })
      .then(res => this.props.fetchEmployeesFromDB(org_id, this.props.token))
      .catch(err => console.log(err))
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      emailpref,
      phone,
      phonepref,
      availabilities,
      time_off_requests,
      role,
      view,
      id
    } = this.props
    return (
      <Container data-testid="employee-card">
        <div className="x">
          {view === 'pool' || role === 'owner' ? null : (
            <p className="delete" onClick={this.openModal}>
              ✕
            </p>
          )}
        </div>
        <div>
          {/* Employee Name */}
          <P main>{`${first_name} ${last_name}`}</P>
          {/* Employee Email */}
          <P>
            <a className="link" href={`mailto:${email}`}>
              {email}
            </a>
            {Boolean(emailpref) ? <span> (pref)</span> : null}
          </P>
          {/* Employee Phone */}
          <P>
            <a className="link" href={`tel:${phone}`}>
              {phone}
            </a>
            {Boolean(phonepref) ? <span> (pref)</span> : null}
          </P>
        </div>
        <div id="row">
          {/* the below two things should conditionally render based on whether there is data or not */}
          {availabilities ? (
            <Availability availabilities={availabilities} />
          ) : null}

          {time_off_requests ? (
            <TimeOff
              className="timeoff"
              timeOffRequests={time_off_requests}
              view={this.props.view}
            />
          ) : null}
        </div>
        <div className="row">
          <WideButton onClick={this.props.updateAvail}>
            Edit Availability
          </WideButton>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    employee: state.employees
  }
}

export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB }
)(Card)

Card.propTypes = {
  // adding propTypes here
  first_name: propTypes.string,
  last_name: propTypes.string,
  email: propTypes.string,
  phone: propTypes.string,
  availabilities: propTypes.array,
  time_off_requests: propTypes.array,
  token: propTypes.string.isRequired
}

const Container = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  display: flex;
  flex-flow: column nowrap;
  min-width: 300px;
  width: 25%;

  .x {
    width: 100%;
    position: relative;
  }

  .delete {
    position: absolute;
    font-size: ${system.fontSizing.sm};
    top: 0.5rem;
    right: 0;
    color: ${system.color.lightgrey};
    cursor: pointer;

    :hover {
      color: ${system.color.danger};
    }
  }
`

const P = styled.p`
  padding: 2.5px 7.5px;
  font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
  font-weight: ${props => (props.main ? 'bold' : null)};
  color: ${props =>
    props.main ? system.color.primary : system.color.captiontext};
  font-size: ${props => (props.main ? '1.8rem' : '1.5rem')};
  line-height: ${system.spacing.lineHeight};

  a {
    color: ${system.color.captiontext};
  }

  span {
    font-size: ${system.fontSizing.s};
    color: ${system.color.bodytext};
    font-weight: bold;
  }
`
const WideButton = styled(Button)`
  width: 100%;
`
