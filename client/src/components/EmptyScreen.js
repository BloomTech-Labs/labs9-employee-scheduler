import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'
import system from '../design/theme'

// This component will render out settings for the signed in user
export default function({ children, auth }) {
  return (
    <OuterContainer height="true">
      <BreadCrumb location="" auth={auth} />
      <Container>{children}</Container>
    </OuterContainer>
  )
}

const Container = styled('div')`
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
