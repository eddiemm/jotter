import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { auth } from "./firebase.js";

// export functions to handle authentication 
export function createUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`${user.email} created successfully!`);
        // TODO: store the current users displayName
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('an error occurred: ' + errorMessage);
    });
}


export function loginUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;        
        console.log(user.email + " signed in successfully");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error occured signing in: " + errorCode+ ": " + errorMessage);
    });
}


export function signUserOut(){
    // unsubscribe();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log(`signed out successfully`);
        // window.location.href = "./index.html";
    }).catch((error) => {
        // An error happened.
        console.log(`error occurred signing out--- ${error.message}`);
    });
}


let currentUser = null;
auth.onAuthStateChanged(user=>{
    currentUser = user; 

    if(user){
        // console.log(`auth.currentUser: ${auth.currentUser.uid}\nuser: ${user.uid}`);
        currentUser = user;
        // redirect user to user note view
        if(window.location.pathname !== "/root/noteView.html"){
            window.location.replace("./noteView.html");
        } 
    } 
});


// export async function getUsersNotes(user){
//     if(user){
//         let usersNotes = [];
//         await getNotes(user.uid).then(notes=>{
//             notes.forEach(note=>{
//                 // console.log("docID: " + note.id + " \ncontent: " + note.content);
//                 usersNotes.push(note);
//                 //createNoteElement(note.content) in noteView
//             })
//         }).catch(error=>{
//             console.log(error.message);
//         });
//         return usersNotes;
//     }
//     return null;
// }

