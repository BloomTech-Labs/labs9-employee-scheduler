import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../design/theme'
import Button from './common/Button'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import axios from 'axios'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class AddEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      newUser: {
        email: '',
        name: '',
        role: ''
      }
    }
  }

  changeHandler = event => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [event.target.name]: event.target.value
      }
    })
  }

  submitHandler = event => {
    event.preventDefault()
    const { role, token } = this.props
    const { email, name } = this.state.newUser
    const newUser = {
      email: email,
      name: name
    }

    if (role === 'supervisor') {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/invites/invite-employee`,
          newUser,
          {
            headers: { authorization: token }
          }
        )
        .then(res => {
          alert(`We've sent an invite to employee: ${name}.`)
          this.toggleShow()
        })
        .catch(err => alert(`Something has gone wrong. Try again!`))
    } else {
      const intendedRole = this.state.newUser.role
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/invites/invite-${intendedRole}`,
          newUser,
          {
            headers: { authorization: token }
          }
        )
        .then(res => {
          alert(`We've sent an invite to ${intendedRole}: ${name}.`)
          this.toggleShow()
        })
        .catch(err => alert(`Something has gone wrong. Try again!`))
    }
  }

  componentWillUnmount() {
    // cleans up the event listener for handling clicks outside the nav
    if (this.state.show) {
      document.removeEventListener('click', this.toggleShow)
    }
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
    if (this.state.show) {
      this.setState({
        newUser: {
          email: '',
          name: '',
          role: ''
        }
      })
      document.querySelector('form').reset()
    }
  }

  render() {
    const { toggleShow } = this
    const { role } = this.props
    return (
      <Container>
        <button id="add-employee" onClick={() => toggleShow()}>
          +
        </button>

        <Fade right when={this.state.show}>
          <Form show={this.state.show} onSubmit={this.submitHandler}>
            <label htmlFor="name">Employee Name</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="ex. Bruce Wayne"
              onChange={this.changeHandler}
              value={this.props.value}
              aria-label="name"
            />
            <label htmlFor="email">Employee Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ex. bruce@waynecorp.com"
              onChange={this.changeHandler}
              value={this.props.value}
              checked={this.props.checked}
              aria-label="email"
            />
            <label htmlFor="role">Employee Role</label>
            {role === 'owner' ? (
              <>
                <div className="radio">
                  <input
                    type="radio"
                    id="emp"
                    name="role"
                    value="employee"
                    checked={this.props.checked}
                    onChange={this.changeHandler}
                  />
                  <label htmlFor="emp"> Employee</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="sup"
                    name="role"
                    value="supervisor"
                    onChange={this.changeHandler}
                  />
                  <label htmlFor="sup"> Supervisor</label>
                </div>
              </>
            ) : null}
            <Button
              type="submit"
              data-test="submit"
              onClick={() => this.setState({ submit: true })}
            >
              Invite Employee
            </Button>
            {/* tried to add a cancel button, but it wouldn't work */}
          </Form>
        </Fade>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  role: state.auth.user.role,
  token: state.auth.token
})

export default connect(mapStateToProps)(AddEmployee)

AddEmployee.propTypes = {
  // add propTypes here
}

const Container = styled.div`
  position: absolute;
  margin: auto -7.5rem;
  top: 2.5rem;
  right: 0;
  width: 20%;
  z-index: 100;

  #add-employee {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    border: ${system.borders.transparent};
    outline: none;
    font-size: ${system.fontSizing.ml};
    box-shadow: ${system.shadows.button};
    color: ${system.color.white};
    background: ${system.color.primary};
    transition: ${system.transition};
    position: absolute;
    top: 0;
    right: 10rem;
    cursor: pointer;
    :hover {
      border: 1px solid ${system.color.primary};
      box-shadow: ${system.shadows.buttonHoverLight};
      color: ${system.color.primary};
      background: ${system.color.white};
    }
  }
`

const Form = styled.form`
  visibility: ${props => (props.show ? null : 'hidden')};
  display: flex;
  flex-flow: column nowrap;
  background: ${system.color.white};
  padding: ${system.spacing.bigPadding};
  box-shadow: ${system.shadows.other};
  width: 100%;
  border: 1px solid ${system.color.primary};
  border-right: none;
  border-radius: ${system.borders.radius};
  right: 0;
  top: 7rem;
  z-index: 200;
  position: absolute;

  label {
    font-size: ${system.fontSizing.s};
    padding: 0 5px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: ${system.color.captiontext};
  }

  input {
    font-size: ${system.fontSizing.sm};
    color: ${system.color.bodytext};
    padding: 2.5px 5px;
    margin: 0.5rem 0 ${system.spacing.hugePadding};
    border: none;
    border-bottom: 2px solid #d2d2d2;
    transition: ${system.transition};
    width: 100%;
    :focus {
      border-bottom: 2px solid ${system.color.primary};
    }
  }
  input[type='radio'] {
    width: auto;
    margin: 10px 10px 40px;
    :first-of-type {
      margin-bottom: 10px;
    }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    box-shadow: 0 0 0px 1000px white inset;
  }

  button {
    margin-top: 1rem;
  }
`
