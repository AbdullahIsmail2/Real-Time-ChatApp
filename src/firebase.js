import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const auth = firebase
	.initializeApp({
		apiKey: "AIzaSyBGVAAg_MdyiER3XAtawhFpLknWgv0ZCuk",
		authDomain: "realtime-chatapp-7923c.firebaseapp.com",
		projectId: "realtime-chatapp-7923c",
		storageBucket: "realtime-chatapp-7923c.appspot.com",
		messagingSenderId: "727111934162",
		appId: "1:727111934162:web:1817edb6dc09fdc4ba4d0b",
	})
	.auth();
