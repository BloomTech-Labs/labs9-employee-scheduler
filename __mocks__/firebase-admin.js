const admin = {
  initializeApp() {},
  credential: {
    cert() {}
  },
  auth() {
    return {
      verifyIdToken(token) {
        if (!token || token === 'bad_token') {
          return Promise.reject('firebase mock rejecting')
        }
        return Promise.resolve({ uid: token })
      }
    }
  }
}

module.exports = { default: admin }
