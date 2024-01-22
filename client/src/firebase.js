// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'mern-estate-d8fa7.firebaseapp.com',
	projectId: 'mern-estate-d8fa7',
	storageBucket: 'mern-estate-d8fa7.appspot.com',
	messagingSenderId: '629836004496',
	appId: '1:629836004496:web:6432561b7a256be87b2c15',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
