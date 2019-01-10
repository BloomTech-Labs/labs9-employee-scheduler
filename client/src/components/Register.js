import React, { Component } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import Form from './Form/index'
import BreadCrumb from './BreadCrumb'
import SelectList from './common/SelectList'

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
      <div>
        <BreadCrumb />
        <h1>Register</h1>
        <form>
          <Form.Group
            property="firstName"
            type="text"
            value={this.state.firstName}
            handleChange={this.changeHandler}
            placeholder="First Name..."
          >
            <Form.Label>First Name</Form.Label>
            <Form.TextInput />
          </Form.Group>
          <Form.Group
            property="lastName"
            type="text"
            value={this.state.lastName}
            handleChange={this.changeHandler}
          >
            <Form.Label>Last Name</Form.Label>
            <Form.TextInput />
          </Form.Group>
          <Form.Group
            property="email"
            type="text"
            value={this.state.email}
            handleChange={this.changeHandler}
          >
            <Form.Label>Email</Form.Label>
            <Form.TextInput />
          </Form.Group>
          <Form.Group
            property="phone"
            type="number"
            value={this.state.phone}
            handleChange={this.changeHandler}
          >
            <Form.Label>Phone Number</Form.Label>
            <Form.TextInput />
          </Form.Group>
          <SelectList
            label="Organization"
            name="organization"
            value={this.state.organization}
            changeHandler={this.changeHandler}
            options={options}
          />

          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default Register
