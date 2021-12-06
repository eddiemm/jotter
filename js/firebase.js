import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore, doc, deleteDoc, collection, addDoc, getDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";



// Your web app's Firebase configuration      
// For Firebase JS SDK v7.20.0 and later, measurementId is optional      
const firebaseConfig = {      
    apiKey: "AIzaSyBXwxu_1WeVlCDyCWtSSMfWjrJ9Zmw33M8",      
    authDomain: "jotter-11622.firebaseapp.com",      
    projectId: "jotter-11622",
    storageBucket: "jotter-11622.appspot.com",
    messagingSenderId: "611095104857",
    appId: "1:611095104857:web:97b77a7eebddde2af59048",      
    measurementId: "G-1BZSKB7W0R"      
};

// Initialize Firebase      
const app = initializeApp(firebaseConfig);      
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// get firestore instance attached to this app
export const database = getFirestore(app);
// // create a reference to the correct collection or document 
// const noteReference = doc(database, "notes/Bddd8U1XZwfZ0PUsZoZQ");
// // new data is sent to firestore as objects with key/value pairs
// const newContent = { content: "GHOST!" };
// // set the new data at the referenced location
// setDoc(noteReference, newContent);
// console.log("done");




// ADDING DATA TO THE APPROPRIATE LOCATION IN DB WITH AN AUTO ID, will duplicate
// get reference to collection users/useruid/notes
const pathToUsersNotes = "users/UL3lbsVeCxRHRmpdvy4gF4khdO83/notes";
const collectionReference = collection(database, pathToUsersNotes);
// create a data object for new document
const newData = {
    content: "Toy Story!"
}

// CREATE A DOCUMENT WITH AUTO GEN ID
// addDoc(collectionReference, newData);
// const addedDocReference = await addDoc(collectionReference, newData);
// console.log("added document with id: " + addedDocReference.id);


// UPDATE A DOCUMENT USING UID AND DOCUMENTREFERENCE.ID
// const documentToUpdate = doc(database, "users/UL3lbsVeCxRHRmpdvy4gF4khdO83/notes/n6k13G8giby5el8slnsB");
// await updateDoc( documentToUpdate, {
//     content: "Changed the content of the note at: n6k13G8giby5el8slnsB"
// });


// DELETE A DOCUMENT UID AND DOCUMENTREFERENCE.ID
// await deleteDoc(doc(database, "users/UL3lbsVeCxRHRmpdvy4gF4khdO83/notes/0tcEafK340ed5M9YyC1x"));


// READ 1 DOCUMENT IN A COLLECTION
// const docToReadReference = doc(database, "users/UL3lbsVeCxRHRmpdvy4gF4khdO83/notes/5KS88oPLfJNVMJ0LJbqF");
// const docSnapshot = await getDoc(docToReadReference);
// if (docSnapshot.exists()) {
//     console.log("Document data:", docSnapshot.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }


// READ ALL DOCUMENTS IN A COLLECTION
// const allDocsSnapshot = await getDocs(collectionReference);
// allDocsSnapshot.forEach(document => {
//     console.log(document.id, " => ", document.data().content);
// });



// -- USER CLICKS ON ADD NEW NOTE --
// create a new blank document in users/useruid/notes
// setDoc(collectionReference, { content: "" });
// attach listener to this note
// onchange, update content

