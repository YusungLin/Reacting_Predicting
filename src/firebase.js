import firebase from 'firebase'
// import 'firebase/firestore'       // module including firebase.firestore()
// import 'firebase/database'        // module including firebase.database()

// Your web app's Firebase configuration and initialize Firebase
let firebaseApp
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD-of-GcNTW32oy-tnGz5pThV_6-f9ErtA",
    authDomain: "reacting-predicting-tt.firebaseapp.com",
    databaseURL: "https://reacting-predicting-tt.firebaseio.com",
    projectId: "reacting-predicting-tt",
    storageBucket: "reacting-predicting-tt.appspot.com",
    messagingSenderId: "652874703717",
    appId: "1:652874703717:web:fc661ff74749c7d8"
  })
} else {
  firebaseApp = firebase.apps[0]
}

// collections on firestore
export const firestore = firebase.firestore()
export const userInfo = firestore.collection('UserInfo')
export const userHistory = firestore.collection('UserHistory')
export const userTraining = firestore.collection('UserTraining')
// let docs = await userInfo.get()
// docs.forEach(doc => {
//   // doc.id is the doc name
//   console.log([doc.id]: doc.data())
// })

// userDoc = userInfo.doc('haha')
// userDoc.get().then(data => {
//   console.log(data.data().Passwd)
// }).catch(error => console.log('in firebase.js, ', error))
// userDoc.update({
//   Passwd: haha,
// })

export const initUserInfo = {
  // user level from 10 up to 1
  Level: 10,
  Login: false,
  Passwd: ''
}
export const initUserHistory = {
  TotalQues: 0,
  TotalErr: 0,
  AveErrRate: 0,
  PrevErrRate: 0,
  MostErr: '',
  TotalTime: 0,
  AveTime: 0,
  PrevTime: 0,
  TimePerQues: 0,
  TrainingTimes: 0
}
// userTraining is the most recently training record


// realtime database
export const database = firebase.database();
// database.ref('__VideoDB/1/3').once('value').then( data => {
//   console.log(data.val())
// })
// database.ref('test/training').set({
//   // don't set it
// })

// self-defined server
export const recorderServer = 'https://fec79661.ngrok.io/getAnalysis'