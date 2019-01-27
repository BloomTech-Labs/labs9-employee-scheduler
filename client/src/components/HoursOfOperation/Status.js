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
  /* position: absolute;
  right: 116px;
  bottom: -5px; */
  background: white;
  z-index: -2;
  border-radius: 0 0 0px 12px;
  padding: 1px 0 7px 13px;
  width: 76px;
  p {
    font-size: ${system.fontSizing.s};
  }
`
