import React from 'react'

export default [
  {
    target: 'body',
    content: (
      <div>
        Hi, Cadence is here to help. Here's a quick tutorial to get you going.
      </div>
    ),
    locale: { skip: <strong arial-label="skip">S-K-I-P</strong> },
    textAlign: 'center',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: false,
    hideCloseButton: false,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: 'Employees List'
  },
  {
    target: '#employeePool',
    content: (
      <div>
        Here are your employees, you can drag them onto the Calendar to begin
        scheduling.
      </div>
    ),
    locale: { skip: <strong arial-label="skip">S-K-I-P</strong> },
    textAlign: 'center',
    placement: 'right',
    disableBeacon: true,
    disableOverlayClose: false,
    hideCloseButton: false,
    hideFooter: false,
    spotlightClicks: false,
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: 'Employees List'
  },
  {
    target: '#calendar',
    content: (
      <div>
        <p>
          Once you drop your employees in, you can move them around or stretch
          and shrink their hours until everything is just right. We also let you
          know when an employee isn't available so you don't have to remember.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">S-K-I-P</strong> },
    textAlign: 'left',
    placement: 'bottom',
    disableBeacon: false,
    disableOverlayClose: false,
    hideCloseButton: false,
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
          Set the hours of operations for the week by clicking this button. You
          can also set your business to be closed if you want.
        </p>
      </div>
    ),
    textAlign: 'center',
    placement: 'left',
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: <h3>Hours of Operation</h3>
  }
]
