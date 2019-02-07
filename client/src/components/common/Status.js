import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import check from '../../img/check.svg'
import x from '../../img/x.svg'

const Status = props => {
  return (
    // Pass this component a "success" boolean from your component's state. It will handle the rest.
    <Container success={props.success}>
      <img alt="status icon" src={props.success ? check : x} />
      <p>{props.children}</p>
    </Container>
  )
}

export default Status

const Container = styled.div`
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  line-height: 1.25;
  width: 60%;
  background: ${props =>
    props.success ? system.color.success : system.color.danger};
  padding: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  margin: 20px 0;

  p {
    color: ${system.color.white};
    margin-left: ${system.spacing.bigPadding};
    font-size: ${system.fontSizing.m};
  }

  img {
    height: 50px;
    width: 50px;
  }

  @media ${system.breakpoints[1]} {
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    min-width: 290px;
    width: 80%;
    text-align: center;
    padding: ${system.spacing.standardPadding};

    p {
      margin: 1rem 0;
      font-size: ${system.fontSizing.sm};
    }
  }
`
