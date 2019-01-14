import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../design/theme'
import NavItem from './common/NavItem'
import Fade from 'react-reveal/Fade'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class LeftSideBar extends Component {
  state = {
    show: false
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { toggleShow } = this
    return (
      <Container>
        <Hamburger classname="hamburger" onClick={() => toggleShow()}>
          &#9776;
        </Hamburger>
        <Fade left when={this.state.show}>
          <Nav show={this.state.show}>
            <NavItem to="/calendar">Calendar</NavItem>
            <NavItem to="/employees">Employees</NavItem>
            <NavItem to="/shift-calendar">Create Schedule</NavItem>
            <NavItem to="/settings">Settings</NavItem>
          </Nav>
        </Fade>
      </Container>
    )
  }
}

export default LeftSideBar

LeftSideBar.propTypes = {
  // add propTypes here
}

const Container = styled.nav`
  position: absolute;
  top: 0;
`

const Hamburger = styled.div`
  font-size: ${system.fontSizing.ml};
  color: ${system.color.neutral};
  cursor: pointer;
  margin: ${system.spacing.bigPadding} 25px 50px;
`

const Nav = styled.nav`
  background: ${system.color.white};
  box-shadow: ${system.shadows.otherLight};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  border-top: none;
  border-left: none;
  border-radius: ${system.borders.radius};
  width: 150px;
  position: absolute;
  visibility: ${props => (props.show ? null : 'hidden')};

  a {
    text-decoration: none;
    padding: ${system.spacing.standardPadding};
    border-bottom: 1px solid ${system.color.neutral};
    color: ${system.color.captiontext};
    font-size: ${system.fontSizing.sm};
    transition: ${system.transition};
    :hover {
      color: ${system.color.neutral};
      background: ${system.color.primary};
    }
    :first-of-type {
      border-radius: 0 ${system.borders.radius} 0 0;
    }
    :last-child {
      border: ${system.borders.transparent};
      border-radius: 0 0 ${system.borders.radius} 0;
    }
  }
`
