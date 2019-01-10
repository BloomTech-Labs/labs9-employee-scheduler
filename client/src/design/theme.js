const system = {
  color: {
    danger: 'crimson', // red for alerts, warnings, reject actions, etc.
    success: '#2D936C', // green for approval, success, happy path actions, etc.
    primary: '#115599', // calm & deep blue for main color fields in app. Can be used for headers as well.
    neutral: '#fefdfa', // for backgrounds & expanses of white space
    bodytext: '#333333', // for large sections of copy
    captiontext: '#999999' // for small size copy, lower-emphasis copy
  },

  // moved font to global styles in app.js because we only have one font-family

  fontSizing: {
    s: '12px', // for captions, could go to 10px if legible
    m: '16px', // base size for text
    ml: '24px', // size for headers
    l: '30px' // for big emphasis
  },

  borders: {
    radius: '3px', // for border-radius
    transparent: '1px solid transparent',
    blue: '1px solid #159',
    grey: '1px solid #999999'
  },

  shadows: {
    button: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    buttonHover: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    other: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },

  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

  spacing: {
    standardPadding: '7.5px 15px',
    bigPadding: '25px',
    container: '0 75px'
  }
}

export default system
