import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/functions";

/*
* firebase client sdk configuration
*/

const config = {
    apiKey: "AIzaSyALoKjOF5Lm5Czovr7mXkhRNSOmrnyMZbw",
    authDomain: "gallery-app-6738e.firebaseapp.com",
    projectId: "gallery-app-6738e",
    storageBucket: "gallery-app-6738e.appspot.com",
    messagingSenderId: "203898588558",
    appId: "1:203898588558:web:05ec6cb393e33bf130e8df"
};

firebase.initializeApp(config);
export default firebase;
