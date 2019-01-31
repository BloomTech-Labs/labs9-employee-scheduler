import React from 'react'
import { Redirect } from 'react-router-dom'

export default [
  {
    title: 'Employee List',
    target: 'body',
    content: (
      <div>
        <p>Here, you'll be able to see all your employees.</p>
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
    target: '#add-employee',
    content: (
      <div>
        You can add an employee using this button. We will send them an invite
        email. Once they accept your invite, their card will appear here.
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
    title: 'Add Employee'
  }
  // {
  //   title: 'Menu',
  //   target: '#menu',
  //   content: (
  //     <div>
  //       <p>
  //         Navigate around the app using this menu. When you click 'Next', we'll
  //         send you to the Employee List page. Click the "Tutorial" button there
  //         to resume this guide.
  //       </p>
  //     </div>
  //   ),
  //   locale: { skip: <strong arial-label="skip">Skip</strong> },
  //   textAlign: 'center',
  //   placement: 'bottom',
  //   disableBeacon: true,
  //   disableOverlayClose: true,
  //   hideCloseButton: true,
  //   hideFooter: false,
  //   spotlightClicks: false,
  //   styles: {
  //     options: {
  //       zIndex: 10000
  //     }
  //   }
  // },
  // {
  //   target: 'body',
  //   content: <Redirect to="/employees" />
  // }
]
