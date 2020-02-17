import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBQfGiyjIYLD4QRJCShMMoruXiUnZEDwzo",
  authDomain: "nighthawk-a9aaa.firebaseapp.com",
  databaseURL: "https://nighthawk-a9aaa.firebaseio.com",
  projectId: "nighthawk-a9aaa",
  storageBucket: "nighthawk-a9aaa.appspot.com",
  messagingSenderId: "528089462839",
  appId: "1:528089462839:web:944eadd9fae298abdda7b2",
  measurementId: "G-JE4YBPFGCT"
};
firebase.initializeApp(firebaseConfig);
if ('analytics' in firebase) {
  firebase.analytics();
}
// firebase.firestore().enablePersistence({synchronizeTabs : true});

export default firebase;
export const firestore = firebase.firestore();