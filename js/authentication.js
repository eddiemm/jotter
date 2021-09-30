import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { database } from "./firestore.js";

// export functions to handle authentication 
export function createUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`${user.email} created successfully!`);
        // store the current users username in database
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log(`signed out successfully`);
        // window.location.href = "./index.html";
    }).catch((error) => {
        // An error happened.
        console.log(`error occurred signing out--- ${error.message}`);
    });
}



auth.onAuthStateChanged(user=>{
    if(user){
        // user is signed in
        // redirect user to user note view
        if(window.location.pathname !== "/root/noteView.html"){
            window.location.replace("./noteView.html");
        }
    } else {
        // user is not signed in
        // redirect user to user login page
        if(window.location.pathname !== "/root/index.html"){
            window.location.replace("./index.html");
        }
    }
});