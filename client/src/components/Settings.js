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
    fakeUser: {}
  }

  clickHandler = () => {
    this.setState({
      disabled: false
    })
  }

  inputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />

        <Container>
          <h1>Settings</h1>

          <fieldset disabled={this.state.disabled}>
            <form>
              <p onClick={() => this.clickHandler()}>EDIT</p>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="ex. bruce@waynecorp.com"
                value="Hello World"
              />
              <label htmlFor="tel">Phone</label>
              <input
                type="tel"
                name="tel"
                placeholder="ex. 111-111-1111"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
              <div>
                <label>Preferred Contact Method</label>
                <br />
                <input type="checkbox" name="emailpref" value="email" />
                <label htmlFor="emailpref">Email?</label>

                <input type="checkbox" name="phonepref" value="phone" />
                <label htmlFor="phonepref">Phone?</label>
              </div>
              {this.state.disabled ? null : editOptions}
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

const editOptions = (
  <>
    <label htmlFor="password">Password</label>
    <input name="password" type="password" placeholder="A strong password" />
    <label htmlFor="confirm">Confirm Password</label>
    <input name="confirm" type="password" placeholder="Confirm password" />
    <Button type="submit">Submit Edits</Button>
  </>
)

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

    input {
      font-size: ${system.fontSizing.m};
      padding: 2.5px 5px;
      margin: 0.5rem 0 ${system.spacing.hugePadding};
      border: none;
      border-bottom: 2px solid ${system.color.lightgrey};
      transition: ${system.transition};
      :disabled {
        background: ${system.color.white};
      }
      :focus {
        border-bottom: 2px solid ${system.color.primary};
      }
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
