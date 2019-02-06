const admin = require('firebase-admin')
const uuid = require('uuid/v4')

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

  // authenication loophole for tests
  if (process.env.NODE_ENV === 'test' && idToken && idToken === 'testing') {
    if (req.headers.user === 'new_id') {
      req.user = { id: uuid() }
    } else if (req.headers.user === 'owner' || !req.headers.user) {
      req.user = { id: 'saSV8fdc3ThHNCwlpvgJt2F70Qu1' } // owner
    } else if (req.headers.user === 'supervisor') {
      req.user = { id: 'v8tNYGQe1XdzZlrPerWW5Ujvfro1' } // supervisor
    } else if (req.headers.user === 'employee') {
      req.user = { id: 'xsc44X6okFgw3V2OPIIcGIMXkkz1' } // employee
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
        return res.status(403).json({ error: 'Did not authenticate' }, error)
      })
  } else {
    return res.status(403).json({ error: 'Did not authenticate' })
  }
}

module.exports = authenticate
