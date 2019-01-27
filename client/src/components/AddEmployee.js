import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Container, Input } from './common/FormContainer'
import Button from './common/Button'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import system from '../design/theme'
import axios from 'axios'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class AddEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
            this.props.toggleShow()
          })
          .catch(err => {
            alert(`Something has gone wrong. Try again!`)
            console.log(err)
          })
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
              this.props.toggleShow()
            })
            .catch(err => alert(`Something has gone wrong. Try again!`))
        }
      }
    }
  }

  render() {
    const { role, Close, toggleShow } = this.props
    return (
      <ModalContainer>
        <form onSubmit={this.submitHandler}>
          <h6 id="instructions">
            Fill this out and we'll send your employee a sign-up email!
          </h6>
          <Close style={{ position: 'absolute', top: '25px', right: '25px' }} />
          <label htmlFor="name">Employee Name</label>
          <Input
            type="name"
            id="name"
            name="name"
            placeholder="ex. Adam Hinckley"
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
            placeholder="ex. adam@getcadence.co"
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
      </ModalContainer>
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
