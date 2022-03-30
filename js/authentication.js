import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { auth } from "./firebase.js";

/* Create a user using email and password combination */ 
export function createUser(email, password, displayName = ''){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(user, {
            displayName: displayName
        });
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(`Error occurred: ${errorMessage}`);
    });
}

/* Login user with credentials */
export function loginUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;        
        console.log(`Signed in successfully`);
        if(user.uid === 'LPGnSdIX7YVHz3JpgV6jHRftVxb2'){
            console.log('Running in test mode');
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        switch(errorCode){
            case "auth/invalid-email": 
                alert("Email format invalid. Try again.");
                break;
            case "auth/wrong-password": 
                alert("Password incorrect. Try again.");
                break;
            case "auth/user-not-found": 
                alert("User not found. Try again.");
                break;
            default: 
                break;   
        }
    });
}


export function signUserOut(){
    // unsubscribe();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signed out successfully');
        // window.location.href = "./index.html";
    }).catch((error) => {
        console.log(`Error occurred signing out: ${error.message}`);
    });
}


auth.onAuthStateChanged(user=>{    
    if(user){
        // redirect user to note view
        if(window.location.pathname !== "/src/pages/noteView.html"){
            window.location.replace("/src/pages/noteView.html");
        } 
    } 
});

