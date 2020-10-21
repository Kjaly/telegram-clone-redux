import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyAVzrmuLV5YUoRosGzGlT4BtCsYuOszV_k",
    authDomain: "telegram-clone-99bc3.firebaseapp.com",
    databaseURL: "https://telegram-clone-99bc3.firebaseio.com",
    projectId: "telegram-clone-99bc3",
    storageBucket: "telegram-clone-99bc3.appspot.com",
    messagingSenderId: "673782819063",
    appId: "1:673782819063:web:85f064d86e6b60d3b00bf2",
    measurementId: "G-XVX8TY1PQB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;