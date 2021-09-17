const signInForm = document.querySelector('.js-sign-in');
const signUpLink = document.querySelector('.js-sign-up-link');

const signUpForm = document.querySelector('.js-sign-up');
const signInLink = document.querySelector('.js-sign-in-link');

signUpLink.addEventListener('click', (evt)=>{
    signInForm.classList.add('hide');
    signUpForm.classList.remove('hide');
}, false);

signInLink.addEventListener('click', (evt)=>{
    signUpForm.classList.add('hide');
    signInForm.classList.remove('hide');
}, false);