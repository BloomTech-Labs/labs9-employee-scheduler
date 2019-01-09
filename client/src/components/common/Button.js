import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Button = props => {
  return <StyledButton type={props.type}>{props.text}</StyledButton>
}

export default Button

const StyledButton = styled('button')`
  /* some styles go here */
  border-radius: ${system.borders.radius};
  border: ${system.borders.transparent};
  color: ${system.color.neutral};
  background: ${system.color.primary};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.m};
  padding: ${system.spacing.standardPadding};
  transition: ${system.transition};
  :hover {
    box-shadow: ${system.shadows.buttonHover};
  }
`
