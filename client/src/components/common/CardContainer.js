import styled from '@emotion/styled'
import system from '../../design/theme'

const CardContainer = styled('div')`
  border-radius: ${system.borders.radius};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding} 7.5px;
  box-shadow: ${system.shadows.otherLight};

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
