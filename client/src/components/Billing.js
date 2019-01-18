import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import Button from './common/Button'
import styled from '@emotion/styled'
import system from '../design/theme'
import axios from 'axios'
import { connect } from 'react-redux'

class Billing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      success: false,
      error: false,
      subscription: {
        customer_id: '',
        paid: false
        //subscription_id: ''
      }
    }
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault()
    this.setState({ loading: true })
    const { token } = await this.props.stripe.createToken({
      name: `${this.props.user.first_name} ${this.props.user.last_name}`
    })
    const submission = {
      token: token,
      email: this.props.user.email
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/stripe`, submission, {
        headers: { authorization: this.props.token }
      })
      .then(res => {
        const { customer_id, paid, subscription_id } = res.data
        this.setState({
          loading: false,
          success: true,
          subscription: {
            customer_id: customer_id,
            paid: paid
            //subscription_id: subscription_id
          }
        })
        document.querySelector('form').reset()
      })
      .catch(err =>
        this.setState({
          loading: false,
          error: true
        })
      )
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/organizations/${
          this.props.user.organization_id
        }`,
        this.state.subscription,
        {
          headers: { authorization: this.props.token }
        }
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    const Status = () => {
      if (this.state.success) {
        return <Info success>Great! We'll charge you $20 once a month.</Info>
      } else if (this.state.error) {
        return <Info danger>Something went wrong. Try again.</Info>
      } else {
        return null
      }
    }
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Billing" />

        <Container>
          <h1>Billing</h1>
          <p>{this.state.loading ? 'Loading...' : null}</p>
          <Status />
          <form onSubmit={this.submit}>
            <CardElement />
            <Button type="submit">Pay</Button>
          </form>
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

export default connect(mapStateToProps)(injectStripe(Billing))

Billing.propTypes = {
  // adding propTypes here
}

const Info = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  width: 60%;
  background: ${system.color.white};
  padding: ${system.spacing.bigPadding};
  border: 1px solid ${system.color.success};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  margin-bottom: 20px;
`

const Container = styled('div')`
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    width: 60%;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    margin-bottom: 20px;

    .StripeElement {
      padding: 10px;
      border-bottom: 2px solid #d2d2d2;
      transition: ${system.transition};
      font-size: 20px !important;

      input {
        font-family: 'Nunito' !important;
      }
    }

    .StripeElement--focus {
      border-bottom: 2px solid ${system.color.primary};
    }

    .StripeElement--invalid {
      border-bottom: 2px solid crimson !important;

      input {
        color: ${system.color.danger};
      }
    }

    button {
      width: 150px;
      margin-top: 40px;
    }
  }
`
