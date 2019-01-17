import styled from '@emotion/styled'
import system from '../../design/theme'

const CardContainer = styled('div')`
  border: 1px inset ${system.color.captiontext};
  border-radius: ${system.borders.radius};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding} 7.5px;

  p {
    padding: 0.5rem;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.sm};
  }
`

export default CardContainer
