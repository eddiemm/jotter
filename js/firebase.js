import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
// Your web app's Firebase configuration      
// For Firebase JS SDK v7.20.0 and later, measurementId is optional      
const firebaseConfig = {      
    apiKey: "AIzaSyBXwxu_1WeVlCDyCWtSSMfWjrJ9Zmw33M8",      
    authDomain: "jotter-11622.firebaseapp.com",      
    projectId: "jotter-11622",   
    appId: "1:611095104857:web:97b77a7eebddde2af59048",      
    measurementId: "G-1BZSKB7W0R"      
};

// Initialize Firebase      
const app = initializeApp(firebaseConfig);      
const analytics = getAnalytics(app);
export const auth = getAuth();
export const database = getFirestore();