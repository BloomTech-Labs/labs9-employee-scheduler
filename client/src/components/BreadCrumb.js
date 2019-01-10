import React from 'react'
import LinkItem from './common/LinkItem'
import styled from '@emotion/styled'
import system from '../design/theme'

// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = props => {
  // initialize content for condition
  let breadContent
  // ask the recieving component what location will be
  if (props.location !== 'Home') {
    breadContent = (
      <Container logo>
        <LinkItem to="/">Cadence</LinkItem>
      </Container>
    )
  }
  if (props.location === 'Home') {
    breadContent = (
      <Nav>
        <Container logo>
          <LinkItem to="/">Cadence</LinkItem>
        </Container>

        <Container className="breadcrumbs" extra>
        <LinkItem to="/register">Sign Up</LinkItem>
        <LinkItem to="/signin">Sign In</LinkItem>
      </Container>
      </Nav>
    )
  }

  return breadContent
}

export default BreadCrumb

// basic styling to match design file
const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${props => (props.extra ? '150px' : null)};
  a {
    font-size: ${props =>
      props.logo ? system.fontSizing.l : system.fontSizing.m};
    font-weight: ${props => (props.logo ? 'bold' : null)};
    color: ${system.color.neutral};
    text-decoration: none;
    text-align: center;
  }
`

const Nav = styled.nav`
  position: fixed;
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
  margin-bottom: 10rem;
`
