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
const editingTools = toolbar.children;

// add click listener to parent for event delegation
toolbar.addEventListener('click', (evt) => {
    let toolElement = evt.target.tagName;

    // only toggle the selected class if the element is the parent div or the
    // the icon within it
    if(toolElement === 'LI'){
        evt.target.classList.toggle('toolbar__tool--is-selected')
    }
    if(toolElement === 'I'){
        evt.target.parentElement.classList.toggle('toolbar__tool--is-selected')
    }

}, false);



// note behavior
// get reference to the parent grid
const noteGrid = document.querySelector('.js-note-grid');    




