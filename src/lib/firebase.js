import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCCifaGtIu7HN4M8EBw8ISfPKttKlJe0MI',
	authDomain: 'kids-bdcfb.firebaseapp.com',
	projectId: 'kids-bdcfb',
	storageBucket: 'kids-bdcfb.appspot.com',
	messagingSenderId: '110287665319',
	appId: '1:110287665319:web:99ecd498b977327eda4382'
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const createUser = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const signUserIn = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const signUserOut = () => {
	return signOut(auth);
};
// export const db = firebase.firestore();
