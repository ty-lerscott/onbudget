import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { createFirestoreInstance } from 'redux-firestore'

const initializeFirebase = store => {
  firebase.initializeApp({
    appId: process.env.REACT_APP_FIREBASE_appId,
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId
  })

  firebase.firestore()

  return {
    firebase,
    config: {
      userProfile: 'users',
      useFirestoreForProfile: true
    },
    dispatch: store.dispatch,
    createFirestoreInstance
  }
}

export default initializeFirebase
