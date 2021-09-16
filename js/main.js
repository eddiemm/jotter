console.log('Jotter canvas ready');

/* MENU */
// DOM variables
const menu = document.querySelector('.js-menu');
const hamburger = document.querySelector('.js-hamburger-wrapper');
const hamburgerIcon = document.querySelector('.js-hamburger-icon');

// change menu visibility
function toggleMenu (){
    menu.classList.toggle('menu--is-visible');
    hamburgerIcon.classList.toggle('hamburger--minus');
}

// attach click listener to menu icon
hamburger.addEventListener('click', toggleMenu, false);


/* TOOLBAR */
const toolbar = document.querySelector('.js-toolbar');

// create array of tool objects with their name and toggle state
const editingTools = [];
for(let i = 0; i < toolbar.children.length; i ++){
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



// get reference to note element parent for event delegation
const noteGrid = document.querySelector('.js-note-grid');

// Add note functionality
const addButton = document.querySelector('#addNote');

addButton.addEventListener('click', createNoteElement, false);

// createNoteElement()
function createNoteElement(){
    console.log('Add button clicked');
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    
    const newNoteText = document.createElement('span');
    newNoteText.classList.add('note__text');
    newNoteText.contentEditable = 'true';
    newNoteText.spellcheck = 'false';

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

// deleteNoteElement()
noteGrid.addEventListener('mousedown', (evt)=> {
    let deleteClicked = evt.target.classList.contains('js-note-delete');
    let tooltipClicked = evt.target.classList.contains('js-tooltip');
    if(deleteClicked || tooltipClicked){
        evt.preventDefault();
        // could delete note here or add click listener
        if(tooltipClicked){
            console.log('delete note');
            // evt.target.closest('.note').classList.add('note--deleted');
            evt.target.closest('.note').remove();
            // alert('Note deleted');
        }
    }  
    
    // hide menu if the grid is clicked
    if(menu.classList.contains('menu--is-visible')){
        menu.classList.toggle('menu--is-visible');
        hamburgerIcon.classList.toggle('hamburger--minus');
    }
}, false);

// deactivate toolbar when notes are not selected
noteGrid.addEventListener('blur', (evt)=>{
    if(evt.target.classList.contains('note__text')){
        // deselect all tools
        editingTools.forEach(tool => {
            tool.isToggled = false;
        });
        for(let i = 0; i < toolbar.children.length; i++){
            toolbar.children[i].classList.remove('toolbar__tool--is-selected');
        }
    }
}, true);


const searchBar = document.querySelector('.js-searchbar');
searchBar.addEventListener('keyup', (evt)=>{
    // revert previous split text and span insert
    for(let i = 0; i < noteGrid.children.length; i ++){
        noteGrid.children[i].firstElementChild.innerHTML = noteGrid.children[i].firstElementChild.innerText;
        console.log(noteGrid.children[i].firstElementChild.textContent);
    }


    if(evt.target.value){
        // console.log('value of search: ' + evt.target.value);
        searchNotes(evt.target.value);
    }
}, false);

function searchNotes(searchText){
    // for each note in the grid
    for(let i = 0; i < noteGrid.children.length; i ++){
        if(noteGrid.children[i].firstElementChild.innerText.indexOf(searchText) >= 0){
            let fullNoteString = noteGrid.children[i].firstElementChild.innerText;
            let searchTextStart = fullNoteString.indexOf(searchText);
            let searchTextEnd = searchTextStart + searchText.length;
            
            // console.log(noteGrid.children[i].firstElementChild.firstChild); // text node
            const fullStringTextNode = noteGrid.children[i].firstElementChild.firstChild;
            // // split 3/3 string
            const thirdSubstr = fullStringTextNode.splitText(searchTextEnd).textContent;
            // // split 2/3 string (searchtext)
            const secondSubstr = fullStringTextNode.splitText(searchTextStart).textContent;
            // // split 1/3 string
            const firstSubstr = fullStringTextNode.textContent;

            // console.log(`first: ${firstSubstr}\nsecond: ${secondSubstr}\nthird: ${thirdSubstr}`);
            
            // rejoin as innerHTML and embed 2/3 into a span with styling
            noteGrid.children[i].firstElementChild.innerHTML = firstSubstr + "<span class=\"text--highlight\">" + secondSubstr + "</span>" + thirdSubstr;

            //TODO: insert this function in a while(searchtext is found in string) instead of if
            // j++ to get all instances of the word in a note
        }
    }
}



// [x] add note button styling    
// [x] add note button behavior
// [x] remove note button styling
// [x] remove note button behavior
// TODO: code button pressed event
// TODO: search for text implementation -- add multiple search terms found
// TODO: change edit tools to buttons and disable when not focused on a note
// TODO: authentication
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