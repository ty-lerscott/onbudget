import {
  MockStorage,
  MockFirebase,
  MockFirestore,
  MockMessaging,
  MockFirebaseSdk,
  MockAuthentication
} from 'firebase-mock'

const mockInitializeFirebase = store => {
  const mockstorage = new MockStorage()
  const mockauth = new MockAuthentication()
  const mockfirestore = new MockFirestore()

  const mocksdk = new MockFirebaseSdk(
    // use null if your code does not use RTDB
    null,
    // use null if your code does not use AUTHENTICATION
    () => {
      return mockauth
    },
    // use null if your code does not use FIRESTORE
    () => {
      return mockfirestore
    },
    // use null if your code does not use STORAGE
    () => {
      return mockstorage
    },
    // use null if your code does not use MESSAGING
    null
  )

  return mocksdk
}

export default mockInitializeFirebase
