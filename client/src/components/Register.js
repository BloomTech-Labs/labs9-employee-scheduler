import React, { Component } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import Form from './Form/index'
import BreadCrumb from './BreadCrumb'
import SelectList from './common/SelectList'
import system from '../design/theme'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      organization: '',
      phone: '',
      email: ''
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    console.log('clicked')
  }

  render() {
    const options = [
      {
        label: 'McDonalds',
        value: 'McDonalds'
      },
      {
        label: 'Netflix',
        value: 'Netflix'
      },
      {
        label: 'Amazon',
        value: 'Amazon'
      }
    ]

    return (
      <Container>
        <BreadCrumb />
        <div className="wrapper">
          <h1 className="headerText" data-testid="register-form">
            Register
          </h1>
          <form type="submit" onClick={this.onSubmit}>
            <Form.Group
              property="firstName"
              type="text"
              value={this.state.firstName}
              handleChange={this.changeHandler}
              placeholder="First Name..."
              ariaLabel="first-name"
            >
              <Form.Label>First Name</Form.Label>
              <Form.TextInput />
            </Form.Group>
            <Form.Group
              property="lastName"
              type="text"
              value={this.state.lastName}
              handleChange={this.changeHandler}
              ariaLabel="last-name"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.TextInput />
            </Form.Group>
            <Form.Group
              property="email"
              type="text"
              value={this.state.email}
              handleChange={this.changeHandler}
              ariaLabel="email"
            >
              <Form.Label>Email</Form.Label>
              <Form.TextInput />
            </Form.Group>
            <Form.Group
              property="phone"
              type="number"
              value={this.state.phone}
              handleChange={this.changeHandler}
              ariaLabel="phone"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.TextInput />
            </Form.Group>

            {/* drop down box menu */}
            <SelectList
              label="Organization"
              name="organization"
              value={this.state.organization}
              changeHandler={this.changeHandler}
              options={options}
              ariaLabel="organization"
            />

            <button className="register">Register</button>
          </form>
        </div>
      </Container>
    )
  }
}

export default Register

const Container = styled('div')`
  width: 100%;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .wrapper {
    margin: 30px auto 0 auto;
    width: 100%;
    max-width: 900px;
    min-width: 500px;
    padding: ${system.spacing.container};
    .headerText {
      font-size: ${system.fontSizing.l};
      margin-bottom: 30px;
    }
    form {
      width: 100%;
      .form-group {
        .form-label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
        }
      }
      .drop-down {
        display: flex;
        flex-direction: column;
        height: 200px;
        label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
          margin: 20px 0 20px 0;
        }
        select {
          font-size: ${system.fontSizing.m};
          border: ${system.borders.transparent};
          border-radius: ${system.borders.radius};
          outline: none;
          cursor: pointer;
        }
      }
      .register {
        justify-content: flex-end;
        padding: ${system.spacing.standardPadding};
        background-color: ${system.color.primary};
        color: ${system.color.neutral};
        box-shadow: ${system.shadows.button};
        border-radius: ${system.borders.radius};
        border: ${system.borders.transparent};
        font-size: ${system.fontSizing.m};
        letter-spacing: 1px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          box-shadow: ${system.shadows.buttonHoverLight};
          background-color: ${system.color.hoverPrimary};
        }
      }
    }
  }
`
