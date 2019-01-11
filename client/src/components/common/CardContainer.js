import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const CardContainer = styled('div')`
  border: 1px inset ${system.color.captiontext};
  border-radius: ${system.borders.radius};
  padding: ${system.spacing.standardPadding};
  margin-top: ${props => (props.avail ? system.spacing.bigPadding : null)};
  margin-bottom: ${system.spacing.bigPadding};

  p {
    padding: 0.5rem;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
  }
`

export default CardContainer
