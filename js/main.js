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
            editingTools[i].isToggled = !editingTools[i].isToggled;
            document.execCommand(toolId);
        }
    }
}



// get reference to note elements, maybe use for copy paste?
const noteGrid = document.querySelector('.js-note-grid');
noteGrid.addEventListener('select', (evt) => {

    if(document.activeElement.nodeName.toLowerCase() == 'div'){
        const textarea = document.activeElement;
        let selectedText = getSelectedText(textarea);
    }
}, false);

function getSelectedText(textInputElement){
    return textInputElement.value.substring(textInputElement.selectionStart, textInputElement.selectionEnd)
}


noteGrid.addEventListener('focus', (evt) => {
    console.log('Event target: ' + evt.target.nodeName);
}, true);


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
    deleteNoteButton.classList.add('note__btn--delete');

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = 'Delete?';

    deleteNoteButton.innerHTML = '&times;';
    deleteNoteButton.appendChild(tooltip);

    newNote.append(newNoteText, deleteNoteButton);
    noteGrid.appendChild(newNote);
}

// deleteNoteElement()

// [x] TODO: add note button styling    
// TODO: add note button behavior
// [x] TODO: remove button styling
// TODO: remove button behavior
// TODO: ul button behavior bug
// TODO: ol button behavior bug
// TODO: code button pressed event
// TODO: search for text implementation
// TODO: authentication
// TODO: cloud database connection
// TODO: Session - State management
// TODO: JS modularity
// TODO: HTML Semantics