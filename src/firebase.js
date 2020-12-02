import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCY6s2UIRTbcxK9Y320lPnh6zvOoMvbYyw',
  authDomain: 'social-media-b4c7b.firebaseapp.com',
  databaseURL: 'https://social-media-b4c7b.firebaseio.com',
  projectId: 'social-media-b4c7b',
  storageBucket: 'social-media-b4c7b.appspot.com',
  messagingSenderId: '781204649137',
  appId: '1:781204649137:web:fc730b2de1d209855c9e90',
  measurementId: 'G-2SSF8BEZJ8'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

// collection References
const userCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// Export utils/refs
export {
  db,
  auth,
  userCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
