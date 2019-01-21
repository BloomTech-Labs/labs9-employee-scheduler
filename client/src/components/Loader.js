import React from 'react'
import styled from '@emotion/styled'
import system from '../design/theme'
import rings from '../img/rings.svg'

const Loader = () => {
  return (
    // show this component when your component is loading, request is pending, etc.
    <Container>
      <img alt="loader" src={rings} />
      <p>
        We'll get you sorted in just a moment. Thanks for your patience.{' '}
        <span role="img" aria-label="hourglass done emoji">
          &#x231B;
        </span>
      </p>
    </Container>
  )
}

export default Loader

const Container = styled.div`
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: 60%;
  background: ${system.color.bodytext};
  padding: ${system.spacing.standardPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  margin-bottom: 20px;

  p {
    color: ${system.color.white};
    margin-left: ${system.spacing.bigPadding};
    font-size: ${system.fontSizing.m};
    span {
      margin: 0 5px;
    }
  }

  img {
    height: 50px;
    width: 50px;
  }
`
