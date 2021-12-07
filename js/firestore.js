import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { database } from "./firebase.js";

// Create a note in DB
export async function createNoteInDB(uid, noteContent){    
    try{
        if(uid){
            const collectionReference = collection(database, `users/${uid}/notes`);
            // Create a doc with auto generated id
            const addedDocReference = await addDoc(collectionReference, { content: noteContent });
            return addedDocReference.id;

        }
    } catch(e){
        console.log(`Error adding note to firestore: ${e.message}`);
    }
    return;
}

// Fetch user notes
export async function getUsersNotes(uid){
    if(uid){
        const collectionReference = collection(database, `users/${uid}/notes`);
        const allDocsSnapshot = await getDocs(collectionReference);
        let notes = [];
        allDocsSnapshot.forEach((document) => {
            notes.push({
                id: document.id,
                content: document.data().content
            });
        });
        return notes;
    }
    return null;
}

// Update a note in DB
export async function updateNoteInDB(uid, noteId, newContent){
    // UPDATE A DOCUMENT USING UID AND DOCUMENTREFERENCE.ID
    const documentToUpdate = doc(database, `users/${uid}/notes/${noteId}`);
    await updateDoc( documentToUpdate, {
        content: `${newContent}`
    });
}

// Delete a note from DB
export async function deleteNoteFromDB(uid, noteId){
    await deleteDoc(doc(database, `users/${uid}/notes/${noteId}`));
}

