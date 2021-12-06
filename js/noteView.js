import { signUserOut } from './authentication.js';
import { createNoteInDB, getNotes } from './firestore.js';
import { auth } from "./firebase.js";


/* MENU */
const menu = document.querySelector('.js-menu');
const hamburger = document.querySelector('.js-hamburger-wrapper');
const hamburgerIcon = document.querySelector('.js-hamburger-icon');

/* change menu visibility */
function toggleMenu (){
    menu.classList.toggle('menu--is-visible');
    hamburgerIcon.classList.toggle('hamburger--minus');
}
hamburger.addEventListener('click', toggleMenu, false);
    
    
/* TOOLBAR */
const toolbar = document.querySelector('.js-toolbar');
    
// create array of tool objects with their name and toggle state
const editingTools = [];
for(let i = 0; i < toolbar.children.length; i++){
    var current = toolbar.children[i];
    let tool = {
        toolName: `${current.id}`,
        isToggled: current.classList.contains('toolbar__tool--selected')
    };
    editingTools.push(tool);
}
    
// add click listener to parent for event delegation
toolbar.addEventListener('click', (evt) => {   
    let toolElement = evt.target;

    if(document.activeElement.classList.contains('note__text')){
        // only toggle the selected class if the element is the parent li or the
        // the icon within it
        if(toolElement.tagName === 'BUTTON'){        
            toolElement.classList.toggle('toolbar__tool--is-selected');
            toggleToolById(toolElement.id);   
        }   

        if(toolElement.tagName === 'I'){
            toolElement.parentElement.classList.toggle('toolbar__tool--is-selected')
            toggleToolById(toolElement.parentElement.id);  
        }
    }     

}, false);
    
// in order to prevent the toolbar from taking focus, we must prevent that behavior
// in the mousedown event because 'mousedown' occurs before 'focus'
toolbar.addEventListener('mousedown', (evt) => { 
    evt.preventDefault();
}, false);

// function to toggle a tool element using their id
function toggleToolById(toolId){        
    for(let i = 0; i < editingTools.length; i++){
        if(editingTools[i].toolName === toolId){
            // if(toolId === 'insertUnorderedList' || toolId === 'insertOrderedList'){
            //     document.execCommand("indent");
            //     console.log("matched" + toolId);
            // }            
            editingTools[i].isToggled = !editingTools[i].isToggled;
            document.execCommand(toolId);
        }
    }
}
    
    
/* Note grid */
// get reference to note element parent for event delegation since
// notes will be rendered dynamically
const noteGrid = document.querySelector('.js-note-grid');
const addButton = document.querySelector('#addNote');

const addNoteHandler = (evt) => {
    createNoteElement("");
    // create a new note in database for currentUser
    // createNoteInDB(currentUser, "hello db!");
}
addButton.addEventListener('click', addNoteHandler, false);    
    
const handleGridMousedown = (evt) => {
    // delete note mousedown
    let deleteClicked = evt.target.classList.contains('js-note-delete');
    let tooltipClicked = evt.target.classList.contains('js-tooltip');
    if(deleteClicked || tooltipClicked){
        evt.preventDefault();
        if(tooltipClicked){
            console.log('delete note');
            evt.target.closest('.note').remove();
            // TODO: remove note from DB
            alert('Note deleted');
        }
    }  
    
    // hide menu if the grid is clicked
    if(menu.classList.contains('menu--is-visible')){
        menu.classList.toggle('menu--is-visible');
        hamburgerIcon.classList.toggle('hamburger--minus');
    }
}
noteGrid.addEventListener('mousedown', handleGridMousedown, false);
    
/* Toolbar */
// deactivate toolbar when a note is not selected
const blurHandler = (evt) => {
    if(evt.target.classList.contains('note__text')){
        // deselect all tools
        editingTools.forEach(tool => {
            tool.isToggled = false;
        });
        for(let i = 0; i < toolbar.children.length; i++){
            toolbar.children[i].classList.remove('toolbar__tool--is-selected');
        }
    }
}
noteGrid.addEventListener('blur', blurHandler, true);    
    
/* Search bar */
const searchBar = document.querySelector('.js-searchbar');
const handleSearchKeyup = (evt) => {
    // revert previous split text and span insert
    for(let i = 0; i < noteGrid.children.length; i ++){
        noteGrid.children[i].firstElementChild.innerHTML = noteGrid.children[i].firstElementChild.innerText;
        console.log(noteGrid.children[i].firstElementChild.textContent);
    }


    if(evt.target.value){
        // console.log('value of search: ' + evt.target.value);
        searchNotes(evt.target.value);
    }
}
searchBar.addEventListener('keyup', handleSearchKeyup, false);
    
function searchNotes(searchText){
    // for each note in the grid
    for(let i = 0; i < noteGrid.children.length; i ++){
        if(noteGrid.children[i].firstElementChild.innerText.indexOf(searchText) >= 0){
            let fullNoteString = noteGrid.children[i].firstElementChild.innerText;
            let searchTextStart = fullNoteString.indexOf(searchText);
            let searchTextEnd = searchTextStart + searchText.length;
            
            // console.log(noteGrid.children[i].firstElementChild.firstChild); // text node
            const fullStringTextNode = noteGrid.children[i].firstElementChild.firstChild;
            // split 3/3 string
            const thirdSubstr = fullStringTextNode.splitText(searchTextEnd).textContent;
            // split 2/3 string (searchtext)
            const secondSubstr = fullStringTextNode.splitText(searchTextStart).textContent;
            // split 1/3 string
            const firstSubstr = fullStringTextNode.textContent;
            
            // rejoin as innerHTML and embed 2/3 into a span with styling
            noteGrid.children[i].firstElementChild.innerHTML = firstSubstr + "<span class=\"text--highlight\">" + secondSubstr + "</span>" + thirdSubstr;
        }
    }
}
 
/* Menu */
/* Sign out */
const logoutLink = document.querySelector("#logoutLink");
logoutLink.addEventListener('click', (evt)=>{
    // TODO: remove listeners
    signUserOut();
});


/* Render user notes from DB */
export function createNoteElement(noteText){
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    
    const newNoteText = document.createElement('span');
    newNoteText.classList.add('note__text');
    newNoteText.contentEditable = 'true';
    newNoteText.spellcheck = 'false';
    newNoteText.textContent = noteText;

    const deleteNoteButton = document.createElement('div');
    deleteNoteButton.classList.add('note__btn--delete', 'js-note-delete');

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip', 'js-tooltip');
    tooltip.textContent = 'Delete?';

    deleteNoteButton.innerHTML = '&times;';
    deleteNoteButton.appendChild(tooltip);

    newNote.append(newNoteText, deleteNoteButton);
    noteGrid.appendChild(newNote);
}



// TODO: cloud database connection
// TODO: Session - State management
// TODO: JS modularity
// TODO: HTML Semantics and Accesibility Check


// BUGS: 
// Edit buttons dont affect CTRL+A text
// Clicking delete button removes not focus.
// ul button behavior bug
// ol button behavior bug

// EXTRAS:
// Note deleted custom alert
// Note deleted animation

let usersNotes = [];
auth.onAuthStateChanged( user => {
    if(!user){
        if(window.location.pathname !== "/root/index.html"){
            // TODO: storeUsersNotesToDatabase()
            // TODO: removeAllNotesFromView()
            window.location.replace("./index.html");
            console.log('user logout fired from noteview');
        }
    } else {
        // fetch users notes from DB
        getNotes(user.uid).then(notes=>{
            usersNotes=notes;
            notes.forEach(note=>{
                // console.log("docID: " + note.id + " \ncontent: " + note.content);
                // usersNotes.push(note);
                createNoteElement(note.content);
            })
            console.log(usersNotes);
        }).catch(error=>{
            console.log(error.message);
        });
    }
});













