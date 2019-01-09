import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'
import bgImg from '../img/tempImg.png'
import Button from './common/Button'

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
        <Container>
          <img
            src={bgImg}
            className="landing-image"
            alt="temporary placeholder"
          />
          <p>
            Leverage agile frameworks to
            <br /> provide a robust synopsis <br />
            for high level overviews. <br />
            Iterative approaches to corporate <br />
            strategy foster collaborative
            <br /> thinking to further the
            <br />
          </p>
          <Button type="text">Schedule Now</Button>
        </Container>
      </div>
    )
  }
}

export default Home

Home.propTypes = {
  // add propTypes here
}

const Container = styled('div')`
  position: relative;
  margin: 0 75px;
  width: 100%;
  height: 500px;
  .landing-image {
    width: 100%;
    max-width: 1350px;
  }
  p {
    position: absolute;
    top: 50px;
    left: 90px;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
  }
  button {
    position: absolute;
    top: 274px;
    left: 133px;
    font-size: ${system.fontSizing.l};
    padding: ${system.spacing.bigPadding};
  }
`
