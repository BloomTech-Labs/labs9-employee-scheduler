import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Zoom from 'react-reveal'
import Checkbox from './Checkbox'
import TimeRangeSlider from './TimeRangeSlider'
import Status from './Status'

const HOOSlider = ({
  id,
  name,
  closedAllDay,
  status,
  toggled,
  disabled,
  start,
  draggableTrack,
  onChangeComplete,
  onChangeStart,
  onChange,
  end
}) => {
  return (
    <Container>
      <div>
        <p className="days" id={id}>
          {name}
        </p>
      </div>
      <Zoom left>
        <div className="closeToggle">
          <Checkbox onToggle={closedAllDay} toggled={toggled} name={name} />
          <Status status={status} />
        </div>
      </Zoom>
      <Zoom left>
        <div className="buttons">
          <TimeRangeSlider
            onChangeStart={onChangeStart}
            draggableTrack={draggableTrack}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            disabled={disabled}
            name={name}
            start={start}
            end={end}
          />
          <div className="row">
            <p>{start}</p>
            <p>{end}</p>
          </div>
        </div>
      </Zoom>
    </Container>
  )
}

export default HOOSlider

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 7.5px;
  padding-bottom: 7.5px;
  border-bottom: 2px solid ${system.color.neutral};

  :last-of-type {
    border-bottom: none;
  }

  .days {
    border: 0;
    padding: ${system.spacing.standardPadding};
    width: 116px;
    text-align: left;
    margin: 0 10px 10px;
    font-size: ${system.fontSizing.sm};
    font-weight: bold;
  }
  .buttons {
    width: 500px;
    background: white;
    padding: 12px;
    margin-right: 15px;
    border-radius: 0 25px 25px 0;
    button {
      cursor: pointer;
      margin: 5px;
      font-size: 1.8rem;
      border: transparent;
    }
    .row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      p {
        font-family: 'Nunito', sans-serif;
        margin-top: 5px;
      }
    }
  }
  .closeToggle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
