import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import system from '../design/theme'
import Button from './common/Button'
import axios from 'axios'

// This component will render out settings for the signed in user
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Settings',
      disabled: true,
      user: {
        email: '',
        phone: '',
        emailpref: true,
        phonepref: false
      }
    }
  }

  // this CDM get url needs to be updated when the users/current route is built to get by current id
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        headers: { authorization: 'testing' }
      })
      .then(res => {
        const { phone, email } = res.data[0]
        console.log(res.data[0])
        this.setState({
          user: {
            phone: phone,
            email: email
          }
        })
      })
      .catch(err => console.log(err))
  }

  editHandler = () => {
    this.setState({
      disabled: false
    })
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  checkHandler = event => {
    event.preventDefault()
    this.setState({
      user: {
        [event.target.name]: event.target.checked
      }
    })
  }

  submitHandler = event => {
    event.preventDefault()
    this.setState({
      disabled: true
    })

    // need to get id off of redux state
    // ${id} needs to go in url
    const { user } = this.setState
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/users/`, user, {
        headers: { authorization: 'testing' }
      })
      .then(res => alert('Your account has been edited successfully.'))
      .catch(err => alert('Something went wrong. Try again please.'))
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
              {/* Replace this EDIT with a pencil icon later */}
              <p onClick={() => this.editHandler()}>EDIT</p>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="ex. bruce@waynecorp.com"
                onChange={this.changeHandler}
                defaultValue={this.state.user.email}
                disabled={this.state.disabled}
              />
              <label htmlFor="phone">Phone</label>
              <Input
                type="tel"
                name="phone"
                placeholder="ex. 111-111-1111"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={this.changeHandler}
                defaultValue={this.state.user.phone}
                disabled={this.state.disabled}
              />
              <div>
                <label>Preferred Contact Method</label>
                <br />
                <Input
                  type="checkbox"
                  name="emailpref"
                  onChange={this.checkHandler}
                  defaultChecked={this.state.user.emailpref}
                />
                <label htmlFor="emailpref">Email</label>

                <Input
                  type="checkbox"
                  name="phonepref"
                  onChange={this.checkHandler}
                  defaultChecked={this.state.user.phonepref}
                />
                <label htmlFor="phonepref">Phone</label>
              </div>
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
  color: ${system.color.bodytext};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  border: none;
  border-bottom: 2px solid
    ${props => (props.disabled ? 'transparent' : '#d2d2d2')};
  transition: ${system.transition};
  :disabled {
    background: ${system.color.white};
    color: ${system.color.bodytext};
  }
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
