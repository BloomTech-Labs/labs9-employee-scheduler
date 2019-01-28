import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

export default function({ coverage }) {
  return (
    <Coverage isGood={Boolean(coverage)}>{`${
      coverage ? coverage : 0
    }% coverage`}</Coverage>
  )
}

const Coverage = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${system.borders.radius};
  border: ${props =>
    props.isGood
      ? `1px solid ${system.color.success}`
      : `1px solid ${system.color.danger}`};
  color: ${props =>
    props.isGood ? system.color.success : system.color.danger};
  background: ${system.color.white};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.sm};
  padding: ${system.spacing.standardPadding};
  outline: none;
`
