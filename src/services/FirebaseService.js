import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

class FirebaseService {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    firebase.analytics();
  }
  createUser = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };
  updateUsername = (user, username) => {
    return user.updateProfile({
      username: username,
    });
  };
  signIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };
  signOut = () => {
    return this.auth.signOut();
  };
}
export default FirebaseService;
