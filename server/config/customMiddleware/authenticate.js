const admin = require('firebase-admin')
const privateKey = process.env.FIREBASE_SECRET
const serviceAccount = require('./firebaseConfig.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cadence-20246.firebaseio.com'
})

//checks to see if there is a token and verifies it
const authenticate = (req, res, next) => {
  const idToken = req.headers.authorization
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
