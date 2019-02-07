import React from 'react'
import TopBar from './TopBar'
import OuterContainer from './OuterContainer'
import styled from '@emotion/styled'

// This component will render out settings for the signed in user
const LayoutFrame = (props, auth) => {
  return (
    <OuterContainer height="true" background={props.background ? true : false}>
      <TopBar location="" auth={auth} />
      <Container>{props.children}</Container>
    </OuterContainer>
  )
}

export default LayoutFrame

const Container = styled('div')`
  padding-top: 20px;
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
