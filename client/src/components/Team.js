import React from 'react'
import OuterContainer from './common/OuterContainer'
import BreadCrumb from './BreadCrumb'
import Footer from './Footer'
import styled from '@emotion/styled'
import system from '../design/theme'

const Team = () => {
  return (
    <OuterContainer>
      <BreadCrumb location="Team" />
      <Container>
        <h1>Meet the Team</h1>
      </Container>
      <Footer />
    </OuterContainer>
  )
}

export default Team

const Container = styled('div')`
  margin: 0 5rem;
  padding: 8rem 4rem;
  background: white;
  box-shadow: ${system.shadows.otherLight};
  position: relative;

  @media ${system.breakpoints[1]} {
    padding: 8rem 2rem;
  }
`
