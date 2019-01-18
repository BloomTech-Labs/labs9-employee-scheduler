import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import system from '../../design/theme'
import Zoom from 'react-reveal'

const Button = ({ handleHours, showHandleHours, id, day, name }) => {
  return (
    <Container>
      <button name={name} onClick={showHandleHours} className="days">
        {name}
      </button>
      {day === true ? (
        <Zoom down>
          <div className="buttons">
            <button id={id} onClick={handleHours} name="open">
              open
            </button>
            <button id={id} onClick={handleHours} name="close">
              close
            </button>
          </div>
          <div className="all-day-container">
            <input type="checkbox" name="all-day" value="Closed All Day" />
            <label htmlFor="all-day">Closed All Day</label>
          </div>
        </Zoom>
      ) : null}
    </Container>
  )
}

export default Button

const ShrinkBounce = keyframes`
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
`

const Checkboxcheck = keyframes`
0%{
    width: 0;
    height: 0;
    border-color: #212121;
    transform: translate3d(0,0,0) rotate(45deg);
  }
  33%{
    width: .2em;
    height: 0;
    transform: translate3d(0,0,0) rotate(45deg);
  }
  100%{
    width: .2em;
    height: .5em;
    border-color: #212121;
    transform: translate3d(0,-.5em,0) rotate(45deg);
  }
  `

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin: 0 auto;
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
  .all-day-container {
    display: flex;
    flex-direction: row;
    input[type='checkbox'] {
      height: 15px;
      width: 15px;
      margin-bottom: 15px;
      cursor: pointer;
    }

    input[type='checkbox'] + label {
      position: relative;
      display: flex;
      flex-direction: row;
      margin: 0.6em 0;
      color: #9e9e9e;
      transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
    }
    input[type='checkbox'] + label > ins {
      position: absolute;
      display: block;
      bottom: 0;
      left: 2em;
      height: 0;
      width: 100%;
      overflow: hidden;
      text-decoration: none;
      transition: height 300ms cubic-bezier(0.4, 0, 0.23, 1);
    }
    input[type='checkbox'] + label > ins > i {
      position: absolute;
      bottom: 0;
      font-style: normal;
      color: #4fc3f7;
    }
    input[type='checkbox'] + label > span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1em;
      width: 1em;
      height: 1em;
      background: transparent;
      border: 2px solid #9e9e9e;
      border-radius: 2px;
      cursor: pointer;
      transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
    }

    input[type='checkbox'] + label:hover,
    input[type='checkbox']:focus + label {
      color: #000000;
    }
    input[type='checkbox'] + label:hover > span,
    input[type='checkbox']:focus + label > span {
      background: rgba(255, 255, 255, 0.1);
    }
    input[type='checkbox']:checked + label > ins {
      height: 100%;
    }

    input[type='checkbox']:checked + label > span {
      border: 0.5em solid #ffeb3b;
      animation: ${ShrinkBounce} 200ms cubic-bezier(0.4, 0, 0.23, 1);
    }
    input[type='checkbox']:checked + label > span:before {
      content: '';
      position: absolute;
      top: 0.6em;
      left: 0.2em;
      border-right: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transform: rotate(45deg);
      transform-origin: 0% 100%;
      animation: Checkboxcheck 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
        forwards;
    }
  }
`
