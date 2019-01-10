import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'
import bgImg from '../img/fff.jpg'
import Button from './common/Button'
import LeftSideBar from './LeftSideBar'

// this is the main landing page, it will house the payment options and main site branding styles. The nav here will display as Sign Up || Sign In.
// if a user is logged in already, it will display the Schedule now button and the navbar will change to logout.
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Home'
    }
  }

  render() {
    return (
      <div>
        <BreadCrumb location={this.state.location} />
        <Container src={bgImg}>
          <p>
            Scheduling your employees is hard. Cadence is here to help. blah
            blah blah blah blah blah blah blah blah blah blah
          </p>
          <Button type="text">Schedule Now</Button>
        </Container>
        <LeftSideBar />
      </div>
    )
  }
}

export default Home

Home.propTypes = {
  // add propTypes here
}

const Container = styled('div')`
  margin: 7.5rem 7.5rem 0;
  height: 50rem;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: cover;
  p {
    padding: ${system.spacing.bigPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
    width: 55rem;
    font-weight: bold;
  }
  button {
    font-size: ${system.fontSizing.m};
    padding: ${system.spacing.standardPadding};
    margin-left: 2.5rem;
  }
`
