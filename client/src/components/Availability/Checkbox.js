import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  width: 180px;
  justify-content: space-between;
  p {
    font-size: ${system.fontSizing.s};
    margin-bottom: 10px;
  }
`

const Container = styled.div`
  width: 50px;
  height: 20px;
  position: relative;
  display: inline-block;
  & > input[type='checkbox'] {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    margin: 0;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
  }
`

const Switch = styled.div`
  margin-bottom: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${system.color.primary};
  transition: background-color 300ms;
  border-radius: 10px;
  &.toggled {
    background-color: ${system.color.danger};
  }
`

const Slider = styled.div`
  margin-left: 2px;
  margin-right: 2px;
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background-color: white;
  transition: transform 300ms;

  &.toggled {
    transform: translateX(30px);
  }
`

function Checkbox(props) {
  const { toggled, onToggle, name } = props

  return (
    <Wrapper>
      <p>{toggled ? 'unavailable' : 'available'}</p>
      <Container>
        <input
          type="checkbox"
          checked={toggled}
          onChange={onToggle}
          name={name}
        />
        <Switch className={toggled ? 'toggled' : undefined}>
          <Slider className={toggled ? 'toggled' : undefined} />
        </Switch>
      </Container>
    </Wrapper>
  )
}

export default Checkbox
