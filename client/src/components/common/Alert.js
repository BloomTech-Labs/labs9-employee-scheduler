import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Status = props => {
  return (
    // Pass this component a "success" boolean from your component's state. It will handle the rest.
    <Container success={props.success}>
      <h6>{props.children}</h6>
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
  border: 1px solid ${system.color.bodytext};
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  width: 100%;
  margin-bottom: 20px;

  h6 {
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.s};
    text-align: center;
  }
`
