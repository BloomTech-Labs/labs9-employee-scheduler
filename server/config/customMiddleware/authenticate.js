const admin = require('firebase-admin')

// replace is needed because process.env escapes \n with \\n
const privateKey = process.env.FIREBASE_SECRET.replace(/\\n/g, '\n')
const clientEmail = process.env.FIREBASE_EMAIL

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'cadence-20246',
    clientEmail,
    privateKey
  }),
  databaseURL: 'https://cadence-20246.firebaseio.com'
})

//checks to see if there is a token and verifies it
const authenticate = (req, res, next) => {
  const idToken = req.headers.authorization
  // this is a testing convenience to allow testing while firebase
  // is in process. It must be removed for production environment
  if (idToken && idToken === 'testing') {
    console.log(
      'This authentication middleware has a testing loophole that must be removed in production'
    )

    // for testing authorize middleware
    if (req.headers.user === 'owner') {
      req.user = 'yJgErAY0haNm0zdLSvzLUed6UXK2' // ownder
    } else if (req.headers.user === 'supervisor') {
      req.user = 'OsdZPBFJICgfyThBytBZhHSDtf82' // supervisor
    } else if (req.headers.user === 'employee') {
      req.user = 'xsc44X6okFgw3V2OPIIcGIMXkkz1' // employee
    }

    return next()
  }
  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function(decodedToken) {
        var uid = decodedToken.uid
        req.user = { id: uid }
        return next()
      })
      .catch(function(error) {
        console.log('auth error', error)
        return res.status(403).json({ error: 'Did not authenticate' })
      })
  } else {
    return res.status(403).json({ error: 'Did not authenticate' })
  }
}

module.exports = authenticate
