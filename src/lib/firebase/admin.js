import admin from 'firebase-admin';

const certConfig = {
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
	privateKey: atob(import.meta.env.VITE_FIREBASE_PRIVATE_KEY_BASE_64)
};

admin.initializeApp({ credential: admin.credential.cert(certConfig) });

export const auth = admin.auth;
