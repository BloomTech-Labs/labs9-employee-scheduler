import React, { Component } from 'react'
import styled from '@emotion/styled'
import system from '../design/theme'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class AddEmployee extends Component {
  state = {
    show: false,
    newUser: {
      name: '',
      email: ''
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
    const { toggleShow } = this
    const { role } = this.props.auth.user
    return (
      <Container>
        <button id="add-employee" onClick={() => toggleShow()}>
          +
        </button>
        <Fade right when={this.state.show}>
          <p>hello world this is a thing I want to show</p>
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
  null
)(AddEmployee)

AddEmployee.propTypes = {
  // add propTypes here
}

const Container = styled.nav`
  #add-employee {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    border: ${system.borders.transparent};
    outline: none;
    font-size: ${system.fontSizing.ml};
    box-shadow: ${system.shadows.button};
    color: ${system.color.white};
    background: ${system.color.primary};
    transition: ${system.transition};
    :hover {
      border: 1px solid ${system.color.primary};
      box-shadow: ${system.shadows.buttonHoverLight};
      color: ${system.color.primary};
      background: ${system.color.white};
    }
  }
`

const Nav = styled.nav`
  background: ${system.color.white};
  box-shadow: ${system.shadows.other};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  border: 1px solid ${system.color.primary};
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
