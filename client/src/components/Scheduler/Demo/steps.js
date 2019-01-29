import React from 'react'

export default [
  {
    title: 'Employees List',
    target: 'body',
    content: (
      <div>
        <p>
          Hi, Cadence is here to help. Let's go over a few features to get you
          started.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">S-K-I-P</strong> },
    textAlign: 'center',
    placement: 'center',
    disableBeacon: true,
    disableOverlayClose: false,
    hideCloseButton: false,
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
          No need to scroll around. Cadence allows you to just filter your
          employees name for a quick and easy search.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">S-K-I-P</strong> },
    textAlign: 'right',
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
    }
  },
  {
    title: 'Availability',
    target: '#employeeCard',
    content: (
      <div>
        <p>
          Ever wanted to see when your employee would be available for
          scheduling? Cadence will show you here so that you can schedule with
          confidence.
        </p>
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
    }
  },
  {
    title: 'PTO Status',
    target: '#timeOff',
    content: (
      <div>
        <p>
          Here you'll have visibility of any PTO requests your employees have on
          file. You can see their status as well as the days they are
          requesting.
        </p>
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
    }
  },
  {
    target: '#employeePool',
    content: (
      <div>
        Here are your employees, you can drag them onto the Calendar to begin
        scheduling. All of your future employess will also be here once they
        register.
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
