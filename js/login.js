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


// get the user credentials - username and password
let username, userPassword;
const usernameInput = signInForm.children[1];
const passwordInput = signInForm.children[2];

usernameInput.addEventListener('keyup', function (evt){
    username = this.value;
    console.log(username);
}, false);

passwordInput.addEventListener('keyup', function (evt){
    userPassword = this.value;
    console.log(userPassword);
}, false);

let newUserEmail, newUserName, newUserPassword, newUserPasswordConfirmed;
const newUserEmailInput = signUpForm.children[1];
const newUserNameInput = signUpForm.children[2];
const newUserPasswordInput = signUpForm.children[3];
const newUserPasswordConfirmedInput = signUpForm.children[4];

newUserEmailInput.addEventListener('keyup', function (evt){
    newUserEmail = this.value;
    console.log(newUserEmail);
}, false);

newUserNameInput.addEventListener('keyup', function (evt){
    newUserName = this.value;
    console.log(newUserName);
}, false);

newUserPasswordInput.addEventListener('keyup', function (evt){
    newUserPassword = this.value;
    console.log(newUserPassword);
}, false);

newUserPasswordConfirmedInput.addEventListener('keyup', function (evt){
    newUserPasswordConfirmed = this.value;
    console.log(newUserPasswordConfirmed);
}, false);