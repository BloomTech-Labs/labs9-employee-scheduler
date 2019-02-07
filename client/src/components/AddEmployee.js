import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Input } from './common/FormContainer'
import Button from './common/Button'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import system from '../design/theme'
import axios from 'axios'
import { Link } from 'react-router-dom'

const closeStyle = { position: 'absolute', top: '25px', right: '25px' }

class AddEmployee extends Component {
  state = {
    email: '',
    name: '',
    role: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { role: currentRole, token, toggleShow } = this.props
    const { email, name, role: newUserRole } = this.state

    if (!email || !name) {
      alert('Please fill out all fields!')
    } else if (currentRole === 'supervisor') {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/invites/invite-employee`,
          { email, name },
          {
            headers: { authorization: token }
          }
        )
        .then(() => {
          alert(`We've sent an invite to: ${name}.`)
          toggleShow()
        })
        .catch(() => {
          alert(`Something has gone wrong. Try again!`)
        })
    } else if (!newUserRole) {
      alert(`Please indicate the new user's role.`)
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/invites/invite-${newUserRole}`,
          { email, name },
          {
            headers: { authorization: token }
          }
        )
        .then(() => {
          alert(`We've sent an invite to: ${name}.`)
          toggleShow()
        })
        .catch(() => alert(`Something has gone wrong. Try again!`))
    }
  }

  render() {
    const { role, Close, paid, employees } = this.props
    const { handleChange, handleSubmit } = this

    if ((paid && employees.length < 21) || employees.length < 5) {
      // 20 is cap for pro, 4 is cap for free
      return (
        <ModalContainer>
          <form onSubmit={handleSubmit}>
            <h6 id="instructions">
              Fill all fields & we'll send your employee a sign-up invite!
            </h6>
            <Close style={closeStyle} />
            <label htmlFor="name">Employee Name *</label>
            <Input
              type="name"
              id="name"
              name="name"
              placeholder="ex. Adam Hinckley"
              onChange={handleChange}
              aria-label="name"
              required
            />
            <label htmlFor="email">Employee Email *</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="ex. adam@getcadence.co"
              onChange={handleChange}
              aria-label="email"
              required
            />
            {role === 'owner' && (
              <>
                <label htmlFor="role">Employee Role *</label>
                <div className="radio">
                  <Input
                    type="radio"
                    id="emp"
                    name="role"
                    value="employee"
                    onChange={handleChange}
                  />
                  <label htmlFor="emp"> Employee</label>
                </div>
                <div className="radio">
                  <Input
                    type="radio"
                    id="sup"
                    name="role"
                    value="supervisor"
                    onChange={handleChange}
                  />
                  <label htmlFor="sup"> Supervisor</label>
                </div>
              </>
            )}
            <Button type="submit" data-test="submit">
              Send Invite
            </Button>
          </form>
        </ModalContainer>
      )
    } else {
      // if employee number is at the cap
      return (
        <ModalContainer>
          <form>
            <Close style={closeStyle} />
            <h6 id="instructions">
              You have reached the limit for the number of users your account
              can support.
            </h6>

            {role === 'owner' ? (
              <Link to="/billing">
                <Button>Upgrade</Button>
              </Link>
            ) : (
              `Contact your business's owner about upgrading.`
            )}
          </form>
        </ModalContainer>
      )
    }
  }
}

const mapStateToProps = state => ({
  role: state.auth.user.role,
  token: state.auth.token,
  paid: state.organization.details.paid,
  employees: state.employees.employees
})

export default connect(mapStateToProps)(AddEmployee)

AddEmployee.propTypes = {
  role: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  paid: PropTypes.bool,
  employees: PropTypes.array,
  addEmployee: PropTypes.func
}

const ModalContainer = styled(Container)`
  @media ${system.breakpoints[0]} {
    margin: 0;
    width: 100%;
    height: 100%;

    form {
      margin: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`
