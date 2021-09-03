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
const editingTools = toolbar.children;

// add click listener to parent for event delegation
toolbar.addEventListener('click', (event) => {
    let toolElement = event.target.tagName;

    // only toggle the selected class if the element is the parent div or the
    // the icon within it
    if(toolElement === 'LI'){
        event.target.classList.toggle('toolbar__tool--is-selected')
    }
    if(toolElement === 'I'){
        event.target.parentElement.classList.toggle('toolbar__tool--is-selected')
    }

}, false);