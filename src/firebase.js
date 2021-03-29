import firebase from 'firebase';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCRmV5ACPoUi7hvMJaCPYKn0DPtINXdry0',
  authDomain: 'must-watch-81fcf.firebaseapp.com',
  projectId: 'must-watch-81fcf',
  storageBucket: 'must-watch-81fcf.appspot.com',
  messagingSenderId: '747758623153',
  appId: '1:747758623153:web:27b1e84ec6f7f7b4758590',
  measurementId: 'G-DW6TMMZPDH',
});

export const auth = firebaseApp.auth();

const db = firebaseApp.firestore();
export default db;
