import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import system from '../design/theme'
import logo2 from '../img/logo2.png'

const Footer = () => {
  return (
    <StyledFooter>
      <Link to="/">
        <img src={logo2} alt="logo" />
      </Link>
      <div>
        <Link to="/about">About</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/privacy">Privacy</Link>
      </div>
      <p>&copy; 2019 Cadence Inc.</p>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background: ${system.color.bodytext};

  img {
    height: 15px;
    width: auto;
  }

  div {
    width: 15%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  p,
  a {
    color: ${system.color.white};
    font-size: ${system.fontSizing.s};
  }
`
