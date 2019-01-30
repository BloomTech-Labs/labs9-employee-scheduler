import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button

const StyledButton = styled.button`
  /* some styles go here */
  cursor: pointer;
  border-radius: ${system.borders.radius};
  border: 1px solid ${system.color.primary};
  color: ${props => (props.cancel ? system.color.primary : system.color.white)};
  background: ${props =>
    props.cancel ? system.color.white : system.color.primary};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.sm};
  padding: ${system.spacing.standardPadding};
  transition: ${system.transition};
  outline: none;
  :hover {
    box-shadow: ${system.shadows.other};
  }
`
