import React, { Component } from 'react'
import propTypes from 'prop-types'
import TopBar from '../components/common/TopBar'
import NavMenu from '../components/common/NavMenu'
import OuterContainer from '../components/common/OuterContainer'
import { Container, Input } from '../components/common/FormContainer'
import Button from '../components/common/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import Status from '../components/common/Status'
import Loader from '../components/common/Loader'
import { updateUserSettings } from '../actions'
import { phonePattern } from '../utils'


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
      .then(res => {
        this.setState({
          loading: false,
          success: true,
          error: false,
          disabled: true
        })
        this.props.updateUserSettings(this.props.token)
      })
      .catch(err =>
        this.setState({ loading: false, error: true, success: false })
      )
  }

  render() {
    return (
      <OuterContainer height="true">
        <NavMenu />
        <TopBar location="Settings" />

        <Container settings>
          <h1 data-testid="settings">
            Hiya, {this.props.user.first_name}! Here are your settings.
          </h1>
          {this.state.loading ? <Loader /> : null}
          {this.state.success ? (
            <Status success={this.state.success}>
              We've successfully edited your profile. Now get back to work{' '}
              <span role="img" aria-label="wink emoji">
                &#x1F609;
              </span>
            </Status>
          ) : null}
          {this.state.error ? (
            <Status>
              Hmm, something's wrong. Give it another shot.{' '}
              <span role="img" aria-label="fingers crossed emoji">
                &#x1f91e;
              </span>
            </Status>
          ) : null}

          <fieldset disabled={this.state.disabled}>
            <form onSubmit={this.submitHandler}>
              {/* Replace this EDIT with a pencil icon later */}
              <p className="edit" onClick={() => this.editHandler()}>
                {this.state.disabled ? 'EDIT' : 'CANCEL'}
              </p>
              <h6 id="instructions">
                You can view & edit your contact details here.
              </h6>
              <label htmlFor="email">Contact Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="ex. kamry@getcadence.co"
                onChange={this.changeHandler}
                defaultValue={this.state.user.email}
                disabled={this.state.disabled}
                aria-label="email"
              />
              <label htmlFor="phone">Phone</label>
              <Input
                type="tel"
                id="phone"
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
                  id="emailpref"
                  onChange={this.checkHandler}
                  aria-label="emailpref"
                  checked={this.state.user.emailpref}
                />
                <label htmlFor="emailpref">Email</label>

                <Input
                  type="checkbox"
                  name="phonepref"
                  id="phonepref"
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

export default connect(
  mapStateToProps,
  { updateUserSettings }
)(Settings)

Settings.propTypes = {
  // add propTypes here
  user: propTypes.object,
  token: propTypes.string.isRequired
}
