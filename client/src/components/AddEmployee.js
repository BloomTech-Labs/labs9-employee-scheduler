import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../design/theme'
import { Container, Input } from './common/FormContainer'
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
      updateFlag: false,
      newUser: {
        email: '',
        name: '',
        role: ''
      }
    }
  }

  componentWillUpdate() {
    if (!this.state.updateFlag) {
      this.setState({
        show: this.props.show,
        updateFlag: true
      })
    }
  }

  toggleShow = () => {
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
    this.setState({
      show: !this.state.show,
      updateFlag: !this.state.updateFlag
    })
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

    if (!email || !name) {
      alert('Please fill out all fields!')
    } else {
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
        if (!this.state.newUser.role) {
          alert(`Please indicate the new user's role.`)
        } else {
          const intendedRole = this.state.newUser.role
          axios
            .post(
              `${
                process.env.REACT_APP_SERVER_URL
              }/invites/invite-${intendedRole}`,
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
    }
  }

  render() {
    const { role } = this.props
    return (
      <Modal show={this.state.show}>
        <Container>
          <h1 />
          <h1 />
          <form onSubmit={this.submitHandler}>
            <h6 id="instructions">
              Fill this out and we'll send your employee a sign-up email!
            </h6>
            <p className="delete" onClick={this.toggleShow}>
              ✕
            </p>
            <label htmlFor="name">Employee Name</label>
            <Input
              type="name"
              id="name"
              name="name"
              placeholder="ex. Bruce Wayne"
              onChange={this.changeHandler}
              value={this.props.value}
              aria-label="name"
              required
            />
            <label htmlFor="email">Employee Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="ex. bruce@waynecorp.com"
              onChange={this.changeHandler}
              value={this.props.value}
              checked={this.props.checked}
              aria-label="email"
              required
            />
            {role === 'owner' ? (
              <>
                <label htmlFor="role">Employee Role</label>
                <div className="radio">
                  <Input
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
                  <Input
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
            <Button type="submit" data-test="submit">
              Send Invite
            </Button>
          </form>
        </Container>
      </Modal>
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

const Modal = styled.div`
  display: ${props => (props.show ? null : 'none')};
  position: fixed;
  top: 75px;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background: ${system.color.bodytext};
  opacity: 0.98;

  .delete {
    position: absolute;
    font-size: ${system.fontSizing.m};
    top: 2.5rem;
    right: 2.5rem;
    color: ${system.color.lightgrey};
    cursor: pointer;

    :hover {
      color: ${system.color.danger};
    }
  }
`
