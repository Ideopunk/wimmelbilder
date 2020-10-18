import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
	apiKey: "AIzaSyDxE3i4JmKzHh2baU7NxF8-oeErRq4b5oU",
	authDomain: "waldo-2465f.firebaseapp.com",
	databaseURL: "https://waldo-2465f.firebaseio.com",
	projectId: "waldo-2465f",
	storageBucket: "waldo-2465f.appspot.com",
	messagingSenderId: "317565624169",
	appId: "1:317565624169:web:603f8e526e9913048a67f8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
