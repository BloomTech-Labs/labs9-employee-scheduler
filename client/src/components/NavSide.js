import React from 'react';
import { NavLink } from 'react-router-dom';
// this navside will be located on the left side of the webpage and house navigational links.
const NavSide = (props) => <NavLink>{props.link}</NavLink>;

export default NavSide;
