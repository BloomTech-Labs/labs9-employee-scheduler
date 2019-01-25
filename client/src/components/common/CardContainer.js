import styled from '@emotion/styled'
import system from '../../design/theme'

const CardContainer = styled('div')`
  border-radius: ${system.borders.radius};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding} 7.5px;
  box-shadow: ${system.shadows.otherLight};
  overflow-y: scroll;
  height: ${props => (props.PTO ? '275px' : null)};

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${system.color.lightgrey};
    width: 3px;
    border-radius: 50px;
  }

  h6 {
    font-size: ${system.fontSizing.sm};
    padding: 0 5px;
    margin: 1rem 0 2rem;
    color: ${system.color.captiontext};
  }

  p {
    padding: 0.5rem;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.sm};
  }
`

export default CardContainer
