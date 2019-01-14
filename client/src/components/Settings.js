import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import system from '../design/theme'
import Button from './common/Button'

// This component will render out settings for the signed in user
class Settings extends Component {
  state = {
    location: 'Settings',
    disabled: true,
    fakeUser: {
      email: 'example@example.com',
      phone: '123-456-7890',
      emailpref: true,
      phonepref: false,
      password: '',
      confirm: ''
    }
  }

  clickHandler = () => {
    this.setState({
      disabled: false
    })
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({
      fakeUser: {
        [event.target.name]: event.target.value
      }
    })
  }

  checkHandler = event => {
    event.preventDefault()
    this.setState({
      fakeUser: {
        [event.target.name]: event.target.checked
      }
    })
  }

  submitHandler = event => {
    event.preventDefault()
    const { password, confirm } = this.state.fakeUser
    if (password && confirm !== password) {
      alert('Your passwords do not match')
    }
  }

  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />

        <Container>
          <h1>Settings</h1>

          <fieldset disabled={this.state.disabled}>
            <form onSubmit={this.submitHandler}>
              <p onClick={() => this.clickHandler()}>EDIT</p>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="ex. bruce@waynecorp.com"
                onChange={this.changeHandler}
                defaultValue={this.state.fakeUser.email}
                disabled={this.state.disabled}
              />
              <label htmlFor="tel">Phone</label>
              <Input
                type="tel"
                name="tel"
                placeholder="ex. 111-111-1111"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={this.changeHandler}
                defaultValue={this.state.fakeUser.phone}
                disabled={this.state.disabled}
              />
              <div>
                <label>Preferred Contact Method</label>
                <br />
                <Input
                  type="checkbox"
                  name="emailpref"
                  onChange={this.checkHandler}
                  checked={this.value}
                  defaultChecked={this.state.fakeUser.emailpref}
                />
                <label htmlFor="emailpref">Email</label>

                <Input
                  type="checkbox"
                  name="phonepref"
                  onChange={this.checkHandler}
                  checked={this.value}
                  defaultChecked={this.state.fakeUser.phonepref}
                />
                <label htmlFor="phonepref">Phone</label>
              </div>
              {this.state.disabled ? null : (
                <EditOptions
                  changeHandler={event => this.changeHandler(event)}
                />
              )}
              {this.state.disabled ? null : (
                <Button type="submit">Submit Edits</Button>
              )}
            </form>
          </fieldset>
        </Container>
      </OuterContainer>
    )
  }
}

export default Settings

Settings.propTypes = {
  // add propTypes here
}

// These input fields will only appear if the user is editing the page.
const EditOptions = props => {
  return (
    <>
      <label htmlFor="password">Password</label>
      <Input
        name="password"
        type="password"
        placeholder="A strong password"
        onChange={props.changeHandler}
        value={props.value}
      />
      <label htmlFor="confirm">Confirm Password</label>
      <Input
        name="confirm"
        type="password"
        placeholder="Confirm password"
        onChange={props.changeHandler}
        value={props.value}
      />
    </>
  )
}

const Container = styled('div')`
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  fieldset {
    width: 60%;
  }

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};

    p {
      position: absolute;
      top: 25px;
      right: 25px;
      cursor: pointer;
      :hover {
        color: ${system.color.primary};
      }
    }

    label {
      font-size: ${system.fontSizing.s};
      padding: 0 5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      color: ${system.color.captiontext};
    }

    input[type='checkbox'] {
      margin-top: 10px;
      :first-of-type {
        margin-left: 5px;
      }
      :nth-of-type(2) {
        margin-left: 40px;
      }
    }

    button {
      width: 150px;
    }
  }
`
const Input = styled.input`
  font-size: ${system.fontSizing.m};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  border: none;
  border-bottom: 2px solid
    ${props => (props.disabled ? 'transparent' : '#d2d2d2')};
  transition: ${system.transition};
  :disabled {
    background: ${system.color.white};
  }
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
