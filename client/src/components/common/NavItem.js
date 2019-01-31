import React from 'react'
import { NavLink } from 'react-router-dom'

// nav link item to be used in the SideNav component
const NavItem = props => (
  <NavLink to={props.to} activeStyle={props.activeStyle}>
    {props.children}
  </NavLink>
)

export default NavItem
