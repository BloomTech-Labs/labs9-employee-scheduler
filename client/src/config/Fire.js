import firebase from 'firebase';

const config = {
  // this is all public and was copied from the firebase console - Adam
  apiKey: 'AIzaSyA3bv7tMZL8pW0RjItXJaksvEghvAWTtMY',
  authDomain: 'cadence-4f66e.firebaseapp.com',
  databaseURL: 'https://cadence-4f66e.firebaseio.com',
  projectId: 'cadence-4f66e',
  storageBucket: 'cadence-4f66e.appspot.com',
  messagingSenderId: '274823729425'
};
const fire = firebase.initializeApp(config);
export default fire;
