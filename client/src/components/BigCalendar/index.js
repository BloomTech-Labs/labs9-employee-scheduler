import React, { Component } from 'react'
import Calendar from './src'
import moment from 'moment'
import withDragAndDrop from './src/addons/dragAndDrop'

import './Calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

const DnDCalendar = withDragAndDrop(Calendar)

class App extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Some title'
      }
    ]
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start
      state.events[0].end = end
      return { events: state.events }
    })
  }

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: '100vh' }}
        />
      </div>
    )
  }
}

export default App
