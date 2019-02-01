import styled from '@emotion/styled'
import system from '../../design/theme'
import doodles from '../../img/doodles.png'

// this component should wrap every page of the app
const OuterContainer = styled('div')`
  position: relative;
  background: ${props =>
    props.background
      ? `linear-gradient(
      rgba(83,95,215, 0.6), 
      rgba(83,95,215, 0.6)
    ), url(${doodles})`
      : system.color.neutral};
  background-repeat: repeat;
  background-size: auto;
  height: 100%;
  min-height: 100vh;

  h1 {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
    margin: ${system.spacing.bigPadding};

    @media ${system.breakpoints[1]} {
      margin: ${system.spacing.bigPadding} 0;
      padding: 0;
      font-size: ${system.fontSizing.ml};
    }
  }
`

export default OuterContainer
