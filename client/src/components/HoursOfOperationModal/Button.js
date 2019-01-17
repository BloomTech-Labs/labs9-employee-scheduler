import React from 'react'

const Button = ({ handleHours, showHandleHours, id, day, name }) => {
  return (
    <div>
      <button name={name} onClick={showHandleHours}>
        {name}
      </button>
      {day === true ? (
        <>
          <button id={id} onClick={handleHours} name="open">
            open
          </button>
          <button id={id} onClick={handleHours} name="close">
            close
          </button>
        </>
      ) : null}
    </div>
  )
}

export default Button
