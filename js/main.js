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
    console.log("menu toggled");
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

    // only toggle the selected class if the element is the parent div or the
    // the icon within it
    if(toolElement.tagName === 'LI'){
        toolElement.classList.toggle('toolbar__tool--is-selected');
        toggleToolById(toolElement.id);
    }
    if(toolElement.tagName === 'I'){
        toolElement.parentElement.classList.toggle('toolbar__tool--is-selected')
        toggleToolById(toolElement.parentElement.id);
    }

    console.log(editingTools);
}, false);

// function to toggle a tool element using their id
function toggleToolById(toolId){
    for(let i = 0; i < editingTools.length; i++){
        if(editingTools[i].toolName === toolId){
            editingTools[i].isToggled = !editingTools[i].isToggled;
        }
    }
}

// need ref to live tool elements not snapshot


