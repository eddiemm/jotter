import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
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



export async function createNoteInDB(uid, noteContent){    
    try{
        if(uid){
            const collectionReference = collection(database, "users/"+uid+"/notes");
            // CREATE A DOCUMENT WITH AUTO GEN ID
            // addDoc(collectionReference, noteContent);
            const addedDocReference = await addDoc(collectionReference, { content: noteContent });
            console.log(addedDocReference.id);
            // console.log("adding note for user: " + uid);
            // console.log("added document with auto gen id: " + addedDocReference.id);
            // console.log("content: " + noteContent);
            return addedDocReference.id;

        }
    } catch(e){
        console.log("Error adding note to firestore: " + e.message);
    }
    return;
}


export async function getUsersNotes(uid){
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

export async function updateNoteInDB(uid, noteId, newContent){
    // UPDATE A DOCUMENT USING UID AND DOCUMENTREFERENCE.ID
    const documentToUpdate = doc(database, `users/${uid}/notes/${noteId}`);
    await updateDoc( documentToUpdate, {
        content: `${newContent}`
    });
}

export async function deleteNoteFromDB(uid, noteId){
    await deleteDoc(doc(database, `users/${uid}/notes/${noteId}`));
}

