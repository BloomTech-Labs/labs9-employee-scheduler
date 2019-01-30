import React from 'react'
import BreadCrumb from './BreadCrumb'
import OuterContainer from './common/OuterContainer'
import styled from '@emotion/styled'

// This component will render out settings for the signed in user
const EmptyScreen = (props, auth) => {
  return (
    <OuterContainer height="true" background={props.background ? true : false}>
      <BreadCrumb location="" auth={auth} />
      <Container>{props.children}</Container>
    </OuterContainer>
  )
}

export default EmptyScreen

const Container = styled('div')`
  padding-top: 20px;
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
