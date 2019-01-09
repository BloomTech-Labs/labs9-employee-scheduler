const system = {
  color: {
    danger: 'crimson', // red for alerts, warnings, reject actions, etc.
    success: '#2D936C', // green for approval, success, happy path actions, etc.
    primary: '#115599', // calm & deep blue for main color fields in app. Can be used for headers as well.
    neutral: '#fefdfa', // for backgrounds & expanses of white space
    bodytext: '#333333', // for large sections of copy
    captiontext: '#999999' // for small size copy, lower-emphasis copy
  },

  fonts: {
    system:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
    sans: '"Open Sans", sans-serif'
  },

  fontSizing: {
    s: '12px', // for captions, could go to 10px if legible
    m: '16px', // base size for text
    l: '30px' // for headers
  },

  spacing: {
    radius: '3px' // for border-radius
  }
}

export default system
