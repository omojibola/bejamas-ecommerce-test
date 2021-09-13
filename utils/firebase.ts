import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBUkJIjB70_Kq8bkbludnjb2IsGnToYTZc",
  authDomain: "space-1a5ba.firebaseapp.com",
  databaseURL: "https://space-1a5ba.firebaseio.com",
  projectId: "space-1a5ba",
  storageBucket: "space-1a5ba.appspot.com",
  messagingSenderId: "578078389588",
  appId: "1:578078389588:web:03496c6d427a6ebadac4c1",
  measurementId: "G-3MYEP1FG2C",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const db = app.firestore();

export { db };
