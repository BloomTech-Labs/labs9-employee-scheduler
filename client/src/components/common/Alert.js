import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Status = props => {
  return (
    // Pass this component a "success" boolean from your component's state. It will handle the rest.
    <Container success={props.success}>
      <p>{props.children}</p>
    </Container>
  )
}

export default Status

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  line-height: 1.25;
  background: ${system.color.success};
  padding: ${system.spacing.standardPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  width: 100%;

  p {
    color: ${system.color.white};
    font-size: ${system.fontSizing.m};
    text-align: center;
  }
`
