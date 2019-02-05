import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import drag from '../../img/drag.mp4'
import resize from '../../img/resize.mp4'
import hoo from '../../img/hoo.mp4'

export default [
  {
    title: 'Shift Calendar',
    target: 'body',
    content: (
      <div>
        <p>
          <span className="demo-bold">Cadence is here to help!</span>
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
          With this search bar, you can quickly{' '}
          <span className="demo-bold">look up the employee you need</span>.
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
          Cadence will show you{' '}
          <span className="demo-bold">when each employee is available</span>{' '}
          here so that you can schedule shifts with confidence.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'right',
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
          You can also see your{' '}
          <span className="demo-bold">
            employees' approved and pending time off requests
          </span>
          , so you don't schedule someone on their day off.
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
        Each of your employees gets a card here. <br /> <br />
        <span className="demo-bold">
          Click and drag a card to the calendar
        </span>{' '}
        to create a shift. <br /> <br />
        <span className="demo-bold">You can expand the video below</span> (and
        any video in this guide) if you need more help.
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <video className="demo-video" muted controls autoPlay loop>
            <source src={drag} type="video/mp4" />
          </video>
        </Suspense>
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
          Once you drag your employee to the calendar, you can{' '}
          <span className="demo-bold">move the shift around or resize it</span>{' '}
          until everything is just right. <br />
          <br />
          We'll also{' '}
          <span className="demo-bold">
            warn you when an employee isn't available
          </span>{' '}
          so you don't have to remember.
          <br />
          <br />
          <span className="demo-bold">Click on a shift to delete it</span>.
          <Suspense
            fallback={
              <div>
                <p>Loading...</p>
              </div>
            }
          >
            <video className="demo-video" muted controls autoPlay loop>
              <source src={resize} type="video/mp4" />
            </video>
          </Suspense>
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
    title: 'Calendar'
  },
  {
    target: '#HOO',
    content: (
      <div>
        <p>
          <span className="demo-bold">
            Set your business' weekly hours of operations
          </span>{' '}
          by clicking this button. You can also set your business to be closed
          on any day if you want.
        </p>
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <video className="demo-video" controls muted autoPlay loop>
            <source src={hoo} type="video/mp4" />
          </video>
        </Suspense>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    textAlign: 'center',
    placement: 'bottom',
    styles: {
      options: {
        zIndex: 10000
      }
    },
    title: 'Hours of Operation'
  },
  {
    title: 'Menu',
    target: '#menu',
    content: (
      <div>
        <p>
          Navigate around the app using this menu.
          <br />
          <br />{' '}
          <span className="demo-bold">
            When you click 'Next', we'll send you to the Employee List page.
          </span>
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
