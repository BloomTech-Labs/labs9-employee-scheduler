import React from 'react'

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
    title: 'Quick Find',
    target: '#search',
    content: (
      <div>
        <p>
          With this search bar, you can quickly look up whichever employee you
          need.
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
          You'll also be able to manage your employees' time off requests.
          <br />
          <br />
          Try clicking one of the buttons below to change the request status.
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
        If you want to change your employee's availabilities for the week, you
        can do so here.
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
      <div>You can delete an employee's account by clicking this button.</div>
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
        You can add an employee using this button.
        <br />
        <br />
        We will send them an invite email. Once they accept your invite, their
        card will appear here.
        <br />
        <br />
        On the free plan, you have a limit of 3 total employees. Delete the demo
        accounts to add 2 of your own employees.
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
  }
]
