import React from 'react'

const Button = ({ handleHours, id }) => {
  return (
    <div>
      <button id={id} onClick={handleHours} name="open">
        open
      </button>
      <button id={id} onClick={handleHours} name="close">
        close
      </button>
    </div>
  )
}

export default Button
