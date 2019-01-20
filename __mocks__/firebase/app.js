let firebaseAuth = {}

firebaseAuth = Object.assign(firebaseAuth, {
  onStateChanged: callback => {
    setTimeout(callback, 100)
    return () => {}
  }
})

let firebase = {}

firebase = Object.assign(firebase, {
  auth() {
    return firebaseAuth
  },
  apps: []
  // initializeApp(req) {
  //   if (req.apiKey) {
  //     return firebase
  //   } else {
  //     throw new Error('apiKey is expected')
  //   }
  // }
})

export default firebase
