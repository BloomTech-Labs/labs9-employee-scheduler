import React from 'react'
import EmployeeResource from './EmployeeResource'
const employees = [{ name: 'Eric', id: 1 }, { name: 'Susan', id: 2 }]

export default function(props) {
  return (
    <div>
      {employees.map(employee => (
        <EmployeeResource key={employee.id} event={employee} />
      ))}
    </div>
  )
}
