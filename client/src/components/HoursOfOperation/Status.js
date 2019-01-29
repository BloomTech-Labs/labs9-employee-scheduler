import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Status = ({ status }) => {
  return (
    <Container>
      <p>{status}</p>
    </Container>
  )
}

export default Status

const Container = styled.div`
  z-index: -2;
  margin-right: 10px;
  width: 70px;

  p {
    font-size: ${system.fontSizing.s};
  }
`
