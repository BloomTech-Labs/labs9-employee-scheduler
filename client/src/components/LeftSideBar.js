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
        <Hamburger onClick={() => toggleShow()}>&#9776;</Hamburger>
        <Fade left when={this.state.show}>
          <Nav>
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

const Hamburger = styled.div`
  font-size: ${system.fontSizing.ml};
  color: ${system.color.neutral};
  cursor: pointer;
  margin: ${system.spacing.bigPadding};
`

const Container = styled.nav`
  position: absolute;
`

const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  border: ${system.borders.grey};
  border-top: none;
  border-left: none;
  border-radius: ${system.borders.radius};
  width: 200px;
  position: absolute;

  a {
    text-decoration: none;
    padding: ${system.spacing.standardPadding};
    border-bottom: ${system.borders.grey};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
    background: ${system.color.neutral};
    transition: ${system.transition};
    :hover {
      color: ${system.color.neutral};
      background: ${system.color.primary};
    }
    :last-child {
      border: ${system.borders.transparent};
    }
  }
`
