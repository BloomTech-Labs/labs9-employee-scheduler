import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Zoom from 'react-reveal'

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
          <label className="container">
            <p>Closed All Day</p>
            <input type="checkbox" />
            <span className="checkmark" onClick={closedAllDay} />
          </label>
        </Zoom>
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
    padding-left: 35px;
    margin-bottom: 12px;
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

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`
