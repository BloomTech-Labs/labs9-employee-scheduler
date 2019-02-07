import React, { useEffect } from 'react'
import LinkItem from './LinkItem'
import styled from '@emotion/styled'
import system from '../../design/theme'
import logo2 from '../../assets/img/logo2.png'
import { connect } from 'react-redux'
import { fetchOrgFromDB } from '../../actions'

const TopBar = props => {
  useEffect(() => {
    const { user, token } = props.auth
    if (user !== null) {
      props.fetchOrgFromDB(user.organization_id, token)
    }
  }, [props.auth])

  // ask the receiving component what location will be
  const { location, organization, auth } = props
  const username =
    auth.user !== null
      ? ` | ${auth.user.first_name} ${auth.user.last_name}`
      : null

  const orgname =
    organization.details.name !== undefined
      ? `${organization.details.name}`
      : null

  const breadContent =
    location === 'Home' || location === 'terms' || location === 'privacy' ? (
      <Nav fixed={true}>
        <Container logo>
          <LinkItem to="/">
            <img src={logo2} alt="logo" />
          </LinkItem>
        </Container>

        <Container className="TopBars" extra>
          <LinkItem to="/register" className="entry">
            Sign Up
          </LinkItem>
          <LinkItem to="/login" className="entry">
            Log In
          </LinkItem>
        </Container>
      </Nav>
    ) : (
      <Nav>
        <Container logo>
          <LinkItem to="/">
            <img src={logo2} alt="logo" />
          </LinkItem>
          <p id="crumb">{location}</p>
        </Container>

        {/* want to put org or user names here */}
        <Container className="TopBars">
          <h6 id="org-name">
            {orgname}
            <span id="user-name">{username}</span>
          </h6>
        </Container>
      </Nav>
    )
  return breadContent
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    organization: state.organization
  }
}

export default connect(
  mapStateToProps,
  { fetchOrgFromDB }
)(TopBar)

// basic styling to match design file
const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${props => (props.extra ? '225px' : null)};

  @media ${system.breakpoints[1]} {
    display: ${props => (props.extra ? 'none' : 'flex')};
  }

  h6 {
    color: ${system.color.white};
    font-size: ${system.fontSizing.m};

    @media ${system.breakpoints[1]} {
      display: none;
    }

    span {
      font-family: 'Nunito', sans-serif;
      font-size: ${system.fontSizing.sm};
    }
  }

  img {
    height: 2.75rem;
    width: auto;
  }

  a,
  button {
    font-size: ${system.fontSizing.sm};
    cursor: pointer;
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
  }

  #crumb {
    text-transform: capitalize;
  }

  @media ${system.breakpoints[0]} {
    #crumb,
    #logout {
      display: none;
    }

    img {
      height: 2rem;
      width: auto;
    }
  }
`

// for some pages (currently just home) nav is fixed
// for others, it is static and does not scroll with the page

const Nav = styled.nav`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};
  z-index: 100;
  top: 0;
  background: ${system.color.primary};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 10rem;
  height: ${system.spacing.TopBar};
  margin-bottom: ${({ fixed }) => (fixed ? '10rem' : undefined)};

  @media ${system.breakpoints[0]} {
    justify-content: center;
  }
`
