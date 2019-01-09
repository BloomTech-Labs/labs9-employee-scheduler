import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import system from '../../design/theme'

// nav link item to be used in the SideNav component

const NavItem = props => <NavLink to={props.to}>{props.text}</NavLink>

const StyledNavItem = styled(NavItem)`
  text-decoration: none;
  color: ${system.color.bodytext};
  background: ${system.color.neutral};
  :hover {
    color: ${system.color.primary};
  }
`

export default StyledNavItem
