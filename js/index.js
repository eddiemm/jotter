import { createUser, loginUser } from "./authentication.js";
// console.log(auth);

const signInForm = document.querySelector('.js-sign-in');
const signUpLink = document.querySelector('.js-sign-up-link');
const signUpForm = document.querySelector('.js-sign-up');
const signInLink = document.querySelector('.js-sign-in-link');


signUpLink.addEventListener('click', (evt)=>{
    signInForm.classList.add('hide');
    signUpForm.classList.remove('hide');
    // clear sign in form
    for(let i = 0; i < signInForm.children.length; i++){
        if(signInForm.children[i].classList.contains('input-field')){
            signInForm.children[i].value='';
        }
    }
}, false);


signInLink.addEventListener('click', (evt)=>{
    signUpForm.classList.add('hide');
    signInForm.classList.remove('hide');
    // clear registration form
    for(let i = 0; i < signUpForm.children.length; i++){
        if(signUpForm.children[i].classList.contains('input-field')){
            signUpForm.children[i].value='';
        }
    }
}, false);


// get the users email
const userEmailInput = signInForm.children[1];
let userEmail = userEmailInput.value;

userEmailInput.addEventListener('change', function (evt){
    userEmail = this.value;
    // console.log(userEmail);
}, false);

// get reference for the users password input, but do not store this value
const userPasswordInput = signInForm.children[2];
// passwordInput.addEventListener('change', function (evt){
//     // console.log(this.value);
// }, false);



let newUserEmail, newUserName, newUserPassword, newUserPasswordConfirmed;
const newUserEmailInput = signUpForm.children[1];
const newUserNameInput = signUpForm.children[2];
const newUserPasswordInput = signUpForm.children[3];
const newUserPasswordConfirmedInput = signUpForm.children[4];

newUserEmailInput.addEventListener('change', function (evt){
    newUserEmail = this.value;
    // console.log(newUserEmail);
}, false);

newUserNameInput.addEventListener('change', function (evt){
    newUserName = this.value;
    // console.log(newUserName);
}, false);

// newUserPasswordInput.addEventListener('change', function (evt){
//     newUserPassword = this.value;
//     console.log(newUserPassword);
// }, false);

newUserPasswordConfirmedInput.addEventListener('keyup', function (evt){
    if(this.value !== newUserPasswordInput.value){
        this.setCustomValidity('passwords dont match');
    } else {
        this.setCustomValidity('');
    }
}, false);    

// newUserPasswordInput.value should be passed in when the function is invoked
function signUpNewUser(email, username, password){
    if(newUserPasswordInput.value===newUserPasswordConfirmedInput.value){
        createUser(email, password);
        // TODO: firestore - store users name in the database - newUserName        
    }
}

const submitSignUp = signUpForm.children[5];
// submitSignUp.addEventListener('submit', signUpNewUser(newUserEmail, newUserName), false);
submitSignUp.addEventListener('click', (evt)=>{
    console.log(newUserPasswordInput.value);
    createUser(newUserEmail, newUserPasswordInput.value);
    // currentAuth.signUpNewUser(newUserEmail, newUserName);
}, false);


// // login user
const signInButton = signInForm.children[4];
signInButton.addEventListener('click', ()=>{
    // window.location.replace("noteView.html");   
    loginUser(userEmail, userPasswordInput.value); 

    //TODO: window changes before loginUser finishes process
    // window.location.href = "./noteView.html"
}, false);


// // sign out user
// const signOutTitle = document.querySelector('.title');
//     signOutTitle.addEventListener('click', ()=>{
//         //TODO: if user is signed in, try:  if(auth.currentUser) 
//         // window.location.replace("index.html");
//         signUserOut();
// }, false);
