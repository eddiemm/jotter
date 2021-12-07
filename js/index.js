import { createUser, loginUser } from "./authentication.js";

/* Sign in form */
const signInForm = document.querySelector('.js-sign-in');
const signUpLink = document.querySelector('.js-sign-up-link');

const userEmailInput = signInForm.children[1];
const userPasswordInput = signInForm.children[2];
let userEmail = userEmailInput.value;

const handleEmailChange = (evt) => {
    userEmail = evt.target.value;
}
userEmailInput.addEventListener('change', handleEmailChange, false);

/* Switch to sign up form */
const gotoSignUp = () => {
    signInForm.classList.add('hide');
    signUpForm.classList.remove('hide');
    // clear inputs when switching between forms
    for(let i = 0; i < signInForm.children.length; i++){
        if(signInForm.children[i].classList.contains('input-field')){
            signInForm.children[i].value='';
        }
    }
}
signUpLink.addEventListener('click', gotoSignUp, false);    

/* Login user */
const loginButton = signInForm.children[4];
const loginClicked = (evt) => {
    console.log('clicked');
    try{
        let userEmail = userEmailInput.value;
        if(userEmail && userPasswordInput.value){
            loginUser(userEmail, userPasswordInput.value); 
        }
    } catch (e) {
        console.log(`Login error: ${e}`);
    }
}
loginButton.addEventListener('click', loginClicked, false);


/* Sign in form */
const signUpForm = document.querySelector('.js-sign-up');
const signInLink = document.querySelector('.js-sign-in-link');

/* Switch to login form */
const gotoSignIn = () => {
    signUpForm.classList.add('hide');
    signInForm.classList.remove('hide');
    // clear inputs when switching between forms
    for(let i = 0; i < signUpForm.children.length; i++){
        if(signUpForm.children[i].classList.contains('input-field')){
            signUpForm.children[i].value='';
        }
    }
}    
signInLink.addEventListener('click', gotoSignIn, false);


/* Sign up form */
const newUserEmailInput = signUpForm.children[1];
const newUserNameInput = signUpForm.children[2];
const newUserPasswordInput = signUpForm.children[3];
const newUserPasswordConfirmedInput = signUpForm.children[4];
let newUserEmail='', newUserName='';

const handleNewUserEmailChange = (evt) => {
    newUserEmail = evt.target.value;
}
newUserEmailInput.addEventListener('change', handleNewUserEmailChange, false);
    
const handleNewUserNameChange = (evt) => {
    newUserName = evt.target.value;
} 
newUserNameInput.addEventListener('change', handleNewUserNameChange, false);    
    
const validateInput = (evt) => {
    // sets error messages from validity checks
    if(evt.target.value !== newUserPasswordInput.value){
        evt.target.setCustomValidity('passwords dont match');
    } else {
        evt.target.setCustomValidity('');
    }
    // displays error messages to the user regarding validity
    evt.target.reportValidity();
}
// validate confirmed password matches new password
newUserPasswordConfirmedInput.addEventListener('change', validateInput, false);    
    
const submitSignUp = signUpForm.children[5];
const signUpButtonClicked = (evt) => {
    try{
        if(newUserEmail  && newUserPasswordInput.value){
            createUser(newUserEmail, newUserPasswordInput.value);
        }
    } catch (e) {
        console.log(`Invalid email or password: ${e}`);
    }
}
submitSignUp.addEventListener('click', signUpButtonClicked, false);
    
    

