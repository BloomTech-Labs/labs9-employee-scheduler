import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import NavItem from './NavItem'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { logout } from '../../actions'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class NavMenu extends Component {
  state = {
    show: false
  }

  componentWillUnmount() {
    // cleans up the event listener for handling clicks outside the nav
    if (this.state.show) {
      document.removeEventListener('click', this.toggleShow)
    }
  }

  toggleShow = () => {
    if (!this.state.show) {
      document.addEventListener('click', this.toggleShow)
    } else {
      document.removeEventListener('click', this.toggleShow)
    }
    this.setState({ show: !this.state.show })
  }

  render() {
    const { role } = this.props.auth.user
    const { toggleShow } = this
    return (
      <Container fixed={this.props.fixed ? true : false}>
        <Hamburger
          classname="hamburger"
          id="menu"
          data-testid="hamburger"
          onClick={() => toggleShow()}
        >
          &#9776;
        </Hamburger>
        <Fade left when={this.state.show} duration={350}>
          <Nav show={this.state.show} data-testid="nav">
            {/* render the uneditable calendar page for employees */}
            {role === 'employee' ? (
              <>
                <NavItem
                  to="/dashboard"
                  activeStyle={{ color: system.color.primary }}
                >
                  Your Dashboard
                </NavItem>
              </>
            ) : null}
            {/* render employees and shift-calender for supervisors and above */}
            {role === 'supervisor' || role === 'owner' ? (
              <>
                <NavItem
                  to="/shift-calendar"
                  activeStyle={{ color: system.color.primary }}
                >
                  Shift Scheduler
                </NavItem>
                <NavItem
                  to="/employees"
                  activeStyle={{ color: system.color.primary }}
                >
                  Employee List
                </NavItem>
                <NavItem
                  to="/dashboard"
                  activeStyle={{ color: system.color.primary }}
                >
                  Your Dashboard
                </NavItem>
              </>
            ) : null}
            {/* Billing page viable only to owner */}
            {role === 'owner' ? (
              <NavItem
                to="/billing"
                activeStyle={{ color: system.color.primary }}
              >
                Billing
              </NavItem>
            ) : null}
            {/* render settings page for all */}
            <NavItem
              to="/settings"
              activeStyle={{ color: system.color.primary }}
            >
              Profile Settings
            </NavItem>
            <button href="#" id="logout" onClick={this.props.logout}>
              Log Out
            </button>
          </Nav>
        </Fade>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(NavMenu)

NavMenu.propTypes = {
  logout: propTypes.func,
  auth: propTypes.object
}

const Container = styled.nav`
  position: ${props => (props.fixed ? 'fixed' : 'absolute')};
  z-index: 101;
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
  box-shadow: ${system.shadows.other};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  border-radius: ${system.borders.radius};
  width: 200px;
  position: absolute;
  visibility: ${props => (props.show ? null : 'hidden')};

  a,
  button {
    cursor: pointer;
    text-decoration: none;
    padding: ${system.spacing.bigPadding};
    background: ${system.color.white};
    border: none;
    text-align: left;
    border-top: 2px solid ${system.color.neutral};
    color: ${system.color.captiontext};
    font-size: ${system.fontSizing.m};
    transition: ${system.transition};
    :hover {
      color: ${system.color.white} !important;
      background: ${system.color.primary};
    }
  }

  a {
    :first-of-type {
      border-radius: 0 ${system.borders.radius} 0 0;
      border-top: 0px solid transparent;
    }
  }

  button {
    :last-child {
      border-radius: 0 0 ${system.borders.radius} 0;
    }
  }
`
