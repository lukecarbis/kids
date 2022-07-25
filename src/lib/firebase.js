import { initializeApp } from 'firebase/app';
import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
	setPersistence,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

export const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

export const createUser = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserDisplayName = (name) => {
	return updateProfile(auth.currentUser, { displayName: name });
};

export const signUserIn = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const signUserOut = () => {
	return signOut(auth);
};
// export const db = firebase.firestore();
