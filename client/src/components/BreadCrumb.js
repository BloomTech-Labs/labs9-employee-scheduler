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
          <LinkItem to="/signup">Sign Up</LinkItem>
          <LinkItem to="/signup">Sign In</LinkItem>
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
    color: ${system.color.bodytext};
    text-decoration: none;
    text-align: center;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 75px;
  height: 40px;
`
