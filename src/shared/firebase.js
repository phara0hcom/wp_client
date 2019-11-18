import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
