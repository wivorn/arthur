import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCUp8ijXS2W1jRdhD6vILAsyJ7g3d14stM',
  authDomain: 'newagent-cb752.firebaseapp.com',
  databaseURL: 'https://newagent-cb752.firebaseio.com',
  projectId: 'newagent-cb752',
  storageBucket: 'newagent-cb752.appspot.com',
  messagingSenderId: '562243239353'
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
