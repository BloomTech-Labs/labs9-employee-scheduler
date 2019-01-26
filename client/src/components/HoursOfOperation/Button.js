import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Zoom from 'react-reveal'
import Checkbox from './Checkbox'
import TimeSlider from './TimeSlider'
import Status from './Status'

const Button = ({
  showHandleHours,
  id,
  day,
  name,
  closedAllDay,
  status,
  toggled,
  disabled
}) => {
  return (
    <Container>
      <button name={name} onClick={showHandleHours} className="days" id={id}>
        {name}
      </button>
      {day === true ? (
        <>
          <Zoom left>
            <div className="buttons">
              <TimeSlider disabled={disabled} name={name} />
            </div>
          </Zoom>
          <Zoom right>
            <div className="container">
              <Checkbox closedAllDay={closedAllDay} toggled={toggled} />
              <Status status={status} />
            </div>
          </Zoom>
        </>
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
    width: 100px;
    cursor: pointer;
    &:hover {
      background: ${system.color.button};
      box-shadow: ${system.shadows.buttonHoverLight};
    }
  }
  .buttons {
    position: absolute;
    margin-top: -2px;
    margin-left: 139px;
    width: 177px;
    background: white;
    padding: 12px;
    padding-right: 25px;
    border-radius: 0 25px 25px 0;
    z-index: -1;
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
