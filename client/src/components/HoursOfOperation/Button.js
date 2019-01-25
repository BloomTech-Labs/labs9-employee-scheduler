import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Fade from 'react-reveal'
import Checkbox from './Checkbox'

const Button = ({
  handleHours,
  showHandleHours,
  id,
  day,
  name,
  closedAllDay
}) => {
  return (
    <Container>
      <button name={name} onClick={showHandleHours} className="days" id={id}>
        {name}
      </button>
      {day === true ? (
        <Fade top>
          <div className="buttons">
            <button id={id} onClick={handleHours} name="open">
              open
            </button>
            <button id={id} onClick={handleHours} name="close">
              close
            </button>
          </div>
          <div className="container">
            <Checkbox closedAllDay={closedAllDay} />
          </div>
        </Fade>
      ) : null}
    </Container>
  )
}

export default Button

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin: 0 auto;
  margin-bottom: 15px;
  .days {
    border-radius: ${system.borders.bigRadius};
    background: ${system.color.neutral};
    border: 0;
    box-shadow: ${system.shadows.button};
    padding: ${system.spacing.standardPadding};
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      background: ${system.color.button};
      box-shadow: ${system.shadows.buttonHoverLight};
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    button {
      cursor: pointer;
      margin: 5px;
      font-size: 1.8rem;
      border: transparent;
    }
  }
  .container {
    display: flex;
    flex-direction: row;
    justify-items: center;
    height: 6px;
    position: relative;
    margin-bottom: 12px;
    padding: 0 15px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    p {
      margin-top: 5px;
      font-size: ${system.fontSizing.s};
      height: 100%;
    }
  }
`
