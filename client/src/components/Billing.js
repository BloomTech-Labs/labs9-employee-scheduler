import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import Button from './common/Button'
import styled from '@emotion/styled'
import system from '../design/theme'

// this component should render the billing page for the app and use Stripe.
class Billing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Billing',
      card: {
        cardnumber: null,
        expiry: 'null',
        cvv: 'null'
      }
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({
      card: {
        ...this.state.card,
        [event.target.name]: event.target.value
      }
    })
  }
  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />

        <Container>
          <h1>Billing</h1>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="cardnumber">Card Number</label>
            <Input
              type="tel"
              name="cardnumber"
              placeholder="ex. 4242 4242 4242 4242"
              pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
              onChange={this.changeHandler}
            />
            <label htmlFor="expiry">Expiration Date</label>
            <Input type="month" name="expiry" onChange={this.changeHandler} />

            <label htmlFor="cvv">CVV</label>
            <Input type="password" name="cvv" onChange={this.changeHandler} />
            <Button type="submit">Pay Now</Button>
          </form>
        </Container>
      </OuterContainer>
    )
  }
}

export default Billing

Billing.propTypes = {
  // adding propTypes here
}

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
