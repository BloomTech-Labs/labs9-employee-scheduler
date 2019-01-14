import styled from '@emotion/styled'
import system from '../../design/theme'

// this component should wrap every page of the app
const OuterContainer = styled('div')`
  position: relative;
  background: ${system.color.neutral};
  height: ${props => (props.height ? '100vh' : null)};

  h1 {
    padding: ${system.spacing.standardPadding} 0;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
    margin: ${system.spacing.bigPadding};
  }
`

export default OuterContainer
