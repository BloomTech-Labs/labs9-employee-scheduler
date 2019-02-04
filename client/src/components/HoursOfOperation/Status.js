import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import PropTypes from 'prop-types'

const Status = ({ status }) => (
  <Container>
    <p>{status}</p>
  </Container>
)

export default Status

Status.propTypes = {
  status: PropTypes.string.isRequired
}

const Container = styled.div`
  z-index: -2;
  margin-right: 10px;
  width: 70px;

  p {
    font-size: ${system.fontSizing.s};
  }
`
