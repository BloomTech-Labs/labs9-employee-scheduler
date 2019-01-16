import React from 'react'
import EmployeeResource from './EmployeeResource'

export default function(props) {
  const { employees } = props
  return (
    <div>
      {employees.map(employee => (
        <EmployeeResource key={employee.id} employee={employee} />
      ))}
    </div>
  )
}
