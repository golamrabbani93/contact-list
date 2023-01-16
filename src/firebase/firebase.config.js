// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBiVRSSlfPt5RQB91N06I0Tw7XxVQiCnyc',
	authDomain: 'contact-list-mern-app.firebaseapp.com',
	projectId: 'contact-list-mern-app',
	storageBucket: 'contact-list-mern-app.appspot.com',
	messagingSenderId: '337075173191',
	appId: '1:337075173191:web:57a6f067d4ff37651abe62',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
