import React from 'react'
import avails from '../../assets/video/avails.mp4'

export default [
  {
    title: 'Employee List',
    target: 'body',
    content: (
      <div>
        <p>
          On this page, you'll be able to see all your employees at a glance.
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
    title: 'Availability',
    target: '#avails',
    content: (
      <div>
        <p>You'll be able to see each employee's availability for the week.</p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'left',
    placement: 'top',
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
    title: 'Time Off Management',
    target: '#pto',
    content: (
      <div>
        <p>
          You'll also be able to{' '}
          <span className="demo-bold">
            manage your employees' time off requests
          </span>
          .
          <br />
          <br />
          <span className="demo-bold">
            Try clicking one of the buttons
          </span>{' '}
          below to change the request status.
          <br />
          <br />
          Hit 'Next' when you're ready to move on.
        </p>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'left',
    placement: 'top',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '#edit',
    content: (
      <div>
        If you want to{' '}
        <span className="demo-bold">change your employee's availabilities</span>{' '}
        for the week, you can do so here.
        <video className="demo-video" muted controls autoPlay loop>
          <source src={avails} type="video/mp4" />
        </video>
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'top',
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
    title: 'Edit Availabilities'
  },
  {
    target: '#delete',
    content: (
      <div>
        You can <span className="demo-bold">delete an employee's account</span>{' '}
        by clicking this button.
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
    },
    title: 'Delete Employee'
  },
  {
    target: '#add-employee',
    content: (
      <div>
        You can <span className="demo-bold">add an employee</span> using this
        button.
        <br />
        <br />
        We will <span className="demo-bold">send them an invite email</span>.
        Once they accept your invite, their card will appear on this page.
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'bottom',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10
      }
    },
    title: 'Add Employee'
  },
  {
    target: 'body',
    content: (
      <div>
        <span className="demo-bold">
          On the free plan, you have a limit of 3 total employees.
        </span>{' '}
        Delete the demo accounts to add 2 of your own employees.
      </div>
    ),
    locale: { skip: <strong arial-label="skip">Skip</strong> },
    textAlign: 'center',
    placement: 'center',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: false,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10
      }
    },
    title: 'Billing'
  }
]
