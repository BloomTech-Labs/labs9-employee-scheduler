const system = {
  color: {
    danger: 'crimson', // red for alerts, warnings, reject actions, etc.
    hoverDanger: '#b30000',
    success: '#2D936C', // green for approval, success, happy path actions, etc.
    hoverSuccess: '#33a77a',
    primary: '#535fd7', // vibrant purple for energy // alt is 26368b: calm & deep blue for main color fields in app. Can be used for headers as well.
    hoverPrimary: '#1462b0',
    neutral: '#f4f4f4', // for backgrounds & expanses of white space
    neutralDark: '#DBDBDB', // for slight contrast on background
    bodytext: '#333333', // for large sections of copy
    captiontext: '#666', // for small size copy, lower-emphasis copy
    lightgrey: '#999',
    white: '#ffffff'
  },

  // moved font to global styles in app.js because we only have one font-family

  fontSizing: {
    s: '1.2rem', // for captions, could go to 10px if legible
    sm: '1.6rem', // for large captions
    m: '2rem', // base size for text
    ml: '2.4rem', // size for headers
    l: '3rem', // for big emphasis
    xl: '3.5rem' // ultra large
  },

  borders: {
    radius: '3px', // for border-radius
    bigRadius: '5px',
    transparent: '1px solid transparent',
    blue: '1px solid #159',
    grey: '1px solid #666'
  },

  breakpoints: [
    '(max-width: 600px)',
    '(max-width: 900px)',
    '(max-width: 1200px)'
  ],
  // for media queries -- express them as @media ${system.breakpoints[0]} {styles here}
  // in the arr, the first is for mobile, second is for portrait tablet, third is for landscape tablet

  shadows: {
    button: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    buttonHover: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    buttonHoverLight: '2px 2px 19px -2px rgba(0,0,0,0.75)',
    other: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    otherLight: '0 0px 3px 0 rgba(0, 0, 0, 0.15);'
  },

  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

  spacing: {
    standardPadding: '7.5px 15px',
    bigPadding: '25px',
    hugePadding: '40px',
    container: '0 75px',
    mobile: '0 25px',
    lineHeight: 1.25,
    TopBar: '7.5rem',
    modalBottom: '15rem'
  }
}

export default system
