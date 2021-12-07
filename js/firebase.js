import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";



// Firebase app configuration    
const firebaseConfig = {      
    apiKey: "AIzaSyBXwxu_1WeVlCDyCWtSSMfWjrJ9Zmw33M8",      
    authDomain: "jotter-11622.firebaseapp.com",      
    projectId: "jotter-11622",
    storageBucket: "jotter-11622.appspot.com",
    messagingSenderId: "611095104857",
    appId: "1:611095104857:web:97b77a7eebddde2af59048",      
    measurementId: "G-1BZSKB7W0R"      
};

// Initialize Firebase project
const app = initializeApp(firebaseConfig);      
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// get firestore instance attached to this app
export const database = getFirestore(app);



