import React from 'react'

const SelectList = ({ name, value, changeHandler, options, label }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select name={name} value={value} onChange={changeHandler}>
        {selectOptions}
      </select>
    </div>
  )
}

export default SelectList
