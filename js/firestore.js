import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { database } from "./firebase.js";



// reference to firestore database

// let noteRef, unsubscribe;

// basic database structure
// users
// |-userID
//     |-userNotes
//     |-preferences
//     |-settings


// database.collection('collectionName')
// .get().then().catch(); 
// returns snapshot of this collection

// implement database CRUD
// function to create notes 
// function to read notes 
// function to update notes
// function to delete notes


let unsubscribe;
let notesReference;



export function createNoteInDB(){    
   
}


export async function getNotes(uid){
    if(uid){
        const collectionReference = collection(database, "users/"+uid+"/notes");
        const allDocsSnapshot = await getDocs(collectionReference);
        let notes = [];
        allDocsSnapshot.forEach((document) => {
            notes.push({
                id: document.id,
                content: document.data().content
            });
            // notes[`${document.id}`] = document.data().content;
        });
        // console.log(notes); // Array[{}{}]
        // console.log(notes.length); // 2
        return notes;
    }
    return null;
}

function updateNoteInDB(){
    
}

function deleteNoteFromDB(){
    
}

function getUsersNotes(user){
}
