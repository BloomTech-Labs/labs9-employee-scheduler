import React from 'react';
import { NavLinks } from 'react-router-dom';

// nav link item to be used in the SideNav component

const NavItem = (props) => <NavLinks to={props.to}>{props.text}</NavLinks>;

export default NavItem;
