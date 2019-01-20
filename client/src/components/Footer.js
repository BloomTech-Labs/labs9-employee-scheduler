import React from 'react'
import styled from '@emotion/styled'
import system from '../design/theme'

const Footer = () => {
  return (
    <StyledFooter>
      <h6>&copy; 2019 Cadence Inc.</h6>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: ${system.color.bodytext};

  h6 {
    color: ${system.color.white};
    font-size: ${system.fontSizing.s};
  }
`
