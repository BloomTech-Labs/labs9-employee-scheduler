import React from 'react'
import LinkItem from './common/LinkItem'
import styled from '@emotion/styled'
import system from '../design/theme'
// import logo1 from '../img/logo1.png'
import logo2 from '../img/logo2.png'

// this will benefit from being refactored once Breadcrumb is getting loaded by App.js
// once that happens we'll simply be able to this method down as props
import { logout } from '../actions' // for initial call
import { connect } from 'react-redux'

// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = props => {
  // initialize content for condition
  let breadContent
  // ask the receiving component what location will be

  if (props.location !== 'Home') {
    breadContent = (
      <Nav fixed={false}>
        <Container logo>
          <LinkItem to="/">
            <img src={logo2} alt="logo" />
          </LinkItem>
          <p> {props.location}</p>
        </Container>

        <Container className="breadcrumbs">
          {!props.auth ? <button onClick={props.logout}>Log out</button> : null}
        </Container>
      </Nav>
    )
  }
  if (props.location === 'Home') {
    breadContent = (
      <Nav fixed={true}>
        <Container logo>
          <LinkItem to="/">
            <img src={logo2} alt="logo" />
          </LinkItem>
        </Container>

        <Container className="breadcrumbs" extra>
          <LinkItem to="/register">Sign Up</LinkItem>
          <LinkItem to="/login">Log In</LinkItem>
        </Container>
      </Nav>
    )
  }

  return breadContent
}

export default connect(
  null,
  { logout }
)(BreadCrumb)

// basic styling to match design file
const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${props => (props.extra ? '225px' : null)};

  img {
    height: 2.75rem;
    width: auto;
  }

  a,
  button {
    font-size: ${props =>
      props.logo ? system.fontSizing.l : system.fontSizing.sm};
    font-weight: ${props => (props.logo ? 'bold' : null)};
    color: ${system.color.white};
    background: transparent;
    text-decoration: none;
    text-align: center;
    padding: ${props => (props.logo ? null : system.spacing.standardPadding)};
    border: ${props => (props.logo ? null : `1px solid ${system.color.white}`)};
    border-radius: ${system.borders.radius};
    transition: ${system.transition};
    :hover {
      background: ${props => (props.logo ? null : system.color.white)};
      color: ${props => (props.logo ? null : system.color.primary)};
    }
  }

  p {
    font-size: ${system.fontSizing.s};
    color: ${system.color.white};
    margin: 5px 15px 0;
    word-spacing: 5px;
  }
`

// for some pages (currently just home) nav is fixed
// for others, it is static and does not scroll with the page

const Nav = styled.nav`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'static')};
  z-index: 100;
  top: 0;
  background: ${system.color.primary};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 10rem;
  height: 7.5rem;
  margin-bottom: ${({ fixed }) => (fixed ? '10rem' : '1rem')};
`
