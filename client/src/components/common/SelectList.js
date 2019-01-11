import React from 'react'

const SelectList = ({
  name,
  value,
  changeHandler,
  options,
  label,
  ariaLabel
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="drop-down">
      <label htmlFor={label}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={changeHandler}
        aria-label={ariaLabel}
      >
        {selectOptions}
      </select>
    </div>
  )
}

export default SelectList
