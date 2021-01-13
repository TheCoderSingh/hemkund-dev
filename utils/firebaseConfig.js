import firebase from "firebase/app";
import {
	API_KEY,
	AUTH_DOMAIN,
	DB_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	SENDER_ID,
	APP_ID,
	M_ID,
} from "@env";

let firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DB_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: SENDER_ID,
	appId: APP_ID,
	measurementId: M_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}
