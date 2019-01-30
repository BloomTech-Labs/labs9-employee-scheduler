import React from 'react'
import { Redirect } from 'react-router-dom'

export default [
  {
    title: 'Shift Calendar',
    target: 'body',
    content: (
      <div>
        <p>
          Cadence is here to help!
          <br /> <br />
          Let's go over a few features of our shift scheduler quickly.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'left',
    placement: 'center',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    title: 'Quick Find',
    target: '#search',
    content: (
      <div>
        <p>
          With this search bar, you can quickly look up the employee you need.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'left',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    title: 'Availability',
    target: '#employeeCard',
    content: (
      <div>
        <p>
          Cadence will show you when each employee is available here so that you
          can schedule shifts with confidence.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    title: 'PTO Status',
    target: '#timeOff',
    content: (
      <div>
        <p>
          You can also see your employees' approved and pending time off
          requests, so you don't schedule someone on their day off.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '#employeePool',
    content: (
      <div>
        Each of your future employees will be a card here. Right now, it's just
        you! <br /> <br />
        Click and drag your card to the calendar to create a shift. <br />{' '}
        <br />
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: 'Employee List'
  },
  {
    target: '#calendar',
    content: (
      <div>
        <p>
          Once you drag your employee to the calendar, you can move their shift
          around or stretch and shrink it until everything is just right. <br />
          <br />
          We'll also warn you when an employee isn't available so you don't have
          to remember.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'left',
    placement: 'bottom',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: <h3>Calendar</h3>
  },
  {
    target: '#HOO',
    content: (
      <div>
        <p>
          Set your business' weekly hours of operations by clicking this button.
          You can also set your business to be closed on any day if you want.
        </p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    textAlign: 'center',
    placement: 'left',
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: <h3>Hours of Operation</h3>
  },
  {
    title: 'Menu',
    target: '#menu',
    content: (
      <div>
        <p>
          Navigate around the app using this menu. When you click 'Next', we'll
          send you to the Employee List page. Click the "Tutorial" button there
          to resume this guide.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'bottom',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: 'body',
    content: <Redirect to="/employees" />
  }
]
