import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import system from '../design/theme'
import Button from './common/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import Status from './Status'
import Loader from './Loader'

const phonePattern =
  '^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$'

// This component will render out settings for the signed in user
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      loading: false,
      error: false,
      success: false,
      user: {
        email: '',
        phone: '',
        emailpref: false,
        phonepref: false
      }
    }
  }

  componentDidMount() {
    const { phone, email, emailpref, phonepref } = this.props.user
    this.setState({
      user: {
        phone: phone,
        email: email,
        emailpref: !!emailpref,
        phonepref: !!phonepref
      }
    })
  }

  editHandler = () => {
    if (!this.state.disabled) {
      const { phone, email, emailpref, phonepref } = this.props.user
      document.querySelector('form').reset()
      this.setState({
        user: {
          phone: phone,
          email: email,
          emailpref: !!emailpref,
          phonepref: !!phonepref
        },
        disabled: true
      })
    } else {
      this.setState({
        disabled: false
      })
    }
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
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: Boolean(event.target.checked)
      }
    })
  }

  submitHandler = event => {
    event.preventDefault()
    this.setState({
      disabled: true,
      loading: true,
      error: false,
      success: false
    })

    const { user } = this.state
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/users/${this.props.user.id}`,
        user,
        {
          headers: { authorization: this.props.token }
        }
      )
      .then(res =>
        this.setState({ loading: false, success: true, error: false })
      )
      .catch(err =>
        this.setState({ loading: false, error: true, success: false })
      )
  }

  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Settings" />

        <Container>
          <h1 data-testid="settings">Settings</h1>
          {this.state.loading ? <Loader /> : null}
          {this.state.success ? (
            <Status success={this.state.success}>
              We successfully edited your profile. Now get back to work :P
            </Status>
          ) : null}
          {this.state.error ? (
            <Status>Hmm, something's wrong. Give it another shot.</Status>
          ) : null}

          <fieldset disabled={this.state.disabled}>
            <form onSubmit={this.submitHandler}>
              {/* Replace this EDIT with a pencil icon later */}
              <p onClick={() => this.editHandler()}>
                {this.state.disabled ? 'EDIT' : 'CANCEL'}
              </p>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="ex. bruce@waynecorp.com"
                onChange={this.changeHandler}
                defaultValue={this.state.user.email}
                disabled={this.state.disabled}
                aria-label="email"
              />
              <label htmlFor="phone">Phone</label>
              <Input
                type="tel"
                name="phone"
                placeholder="ex. 111-111-1111"
                pattern={phonePattern}
                onChange={this.changeHandler}
                defaultValue={this.state.user.phone}
                disabled={this.state.disabled}
                aria-label="tel"
              />
              <div>
                <label>Preferred Contact Method</label>
                <br />
                <Input
                  type="checkbox"
                  name="emailpref"
                  onChange={this.checkHandler}
                  aria-label="emailpref"
                  checked={this.state.user.emailpref}
                />
                <label htmlFor="emailpref">Email</label>

                <Input
                  type="checkbox"
                  name="phonepref"
                  onChange={this.checkHandler}
                  aria-label="phonepref"
                  checked={this.state.user.phonepref}
                />
                <label htmlFor="phonepref">Phone</label>
              </div>
              {this.state.disabled ? null : (
                <Button type="submit" data-test="submit">
                  Submit Edits
                </Button>
              )}
            </form>
          </fieldset>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Settings)

Settings.propTypes = {
  // add propTypes here
  user: propTypes.object,
  token: propTypes.string.isRequired
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

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      box-shadow: 0 0 0px 1000px white inset;
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
    ${props => (props.disabled ? 'none !important' : '#d2d2d2')};
  transition: ${system.transition};
  :disabled {
    background: ${system.color.white};
    color: ${system.color.bodytext};
  }
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
