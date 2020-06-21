import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyDXX29oCwjTqMUKB6Hzh8NioLH-pp24UYo",
  authDomain: "foodyjoe-3a05d.firebaseapp.com",
  databaseURL: "https://foodyjoe-3a05d.firebaseio.com",
  projectId: "foodyjoe-3a05d",
  storageBucket: "foodyjoe-3a05d.appspot.com",
  messagingSenderId: "674788384636",
  appId: "1:674788384636:web:1091a4a9818cf5bdd50ef9",
  measurementId: "G-MDK5NC3RYL"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots :true})

export default firebase