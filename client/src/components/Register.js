import React, { Component } from 'react'
import propTypes from 'prop-types'
import Form from './Form/index'
import BreadCrumb from './BreadCrumb'
import SelectList from './common/SelectList'
import { Container } from './common/RegisterContainer'

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
