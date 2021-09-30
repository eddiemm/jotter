import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// reference to firestore database
export const database = getFirestore();
let noteRef, unsubscribe;

// basic database structure
// users
// |-userID
//     |-userNotes
//     |-preferences
//     |-settings


// database.collection('collectionName')
// .get().then().catch(); 
// returns snapshot of this collection