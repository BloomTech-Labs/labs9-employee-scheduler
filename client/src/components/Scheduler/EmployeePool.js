import React from 'react'
import EmployeeResource from './EmployeeResource'
import styled from '@emotion/styled'
import system from '../../design/theme'

class EmployeePool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      employees: props.employees
    }
  }

  updateSearch = e => {
    this.setState({ [e.target.name]: e.target.value.substr(0, 20) })
  }

  render() {
    const { employees, updateDragState, width } = this.props
    let filteredEmployees = employees.filter(person => {
      if (
        person.first_name
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) > -1
      ) {
        return person
      }
    })
    return (
      <React.Fragment>
        {/* Spacer is provided to block out room for the Employee Side Bar, which is positioned absolute and therefore taken out of flow */}
        <Spacer />
        <Container>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search..."
            onChange={this.updateSearch}
            value={this.state.searchTerm}
          />
          {filteredEmployees.map(employee => (
            <EmployeeResource
              key={employee.id}
              employee={employee}
              updateDragState={updateDragState}
            />
          ))}
        </Container>
      </React.Fragment>
    )
  }
}

export default EmployeePool

const Container = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 344px;
  @media ${system.breakpoints[1]} {
    width: 260px;
  }
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: ${system.color.neutralDark};

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${system.color.lightgrey};
    width: 8px;
    border-radius: 50px;
  }
`

const Spacer = styled.div`
  width: 360px;
  @media ${system.breakpoints[1]} {
    width: 280px;
  }
  height: 100%;
`
