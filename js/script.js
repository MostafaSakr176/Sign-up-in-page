//----------------to get sign up elements--------------
var signUpName = document.getElementById("signUpName") ;
var signUpEmail = document.getElementById("signUpEmail") ;
var signUpPass = document.getElementById("signUpPass") ;
var exist = document.getElementById("exist");

//----------------to get login elements--------------
var logInEmail = document.getElementById("signinEmail") ;
var logInPass = document.getElementById("signinPassword") ;
var logInBtn = document.getElementById("logInBtn");
var incorrect = document.getElementById("incorrect") ;

//----------------to get home element--------------
var userMessage = document.getElementById("username") ;



var currentName ;   //variable for store the name of user



var signUpContainer = [];
if (localStorage.getItem('users') == null) {
    signUpContainer = []
} else {
    signUpContainer = JSON.parse(localStorage.getItem('users')) //to return data to the array of users
}


//=================== Sign Up ====================
function signUp(){
    if (isEmpty() == false){
        messageReqiuered();
        return false
    }

    if (validateName() == false) {
        validationMessage();
        return false
    }

    if (validateEmail() == false) {
        validationMessage();
        return false
    }

    var user = {
        userName : signUpName.value ,
        userEmail : signUpEmail.value ,
        userPass : signUpPass.value
        }


    if (signUpContainer.length == 0) {
        
        addUser(user);

        return true ;

    }

    isEmailExist();

    if (isEmailExist() == false) {

        messageFailed();

    }else{
        
        addUser(user);

    }

    
}


//function for adding user to the array and local storage 
function addUser(user){
    signUpContainer.push(user);
        localStorage.setItem("users" , JSON.stringify(signUpContainer)) ;
        messageSuccess();
        clearInputs();
}


//------------- Sign Up Messages-------------
function messageReqiuered(){
    exist.innerText = "all inputs are required"
    exist.className = "text-danger" ;
}

function messageSuccess(){
    exist.innerText = "Success" ;
    exist.className = "text-success" ;
}

function messageFailed(){
    exist.innerText = "email already exists" ;
    exist.className = "text-danger" ;
}

function validationMessage(){
    exist.innerText = `Name or Email are invalid` ;
    exist.className = "text-warning" ;
}
//-------------------------------------


//function to clear inputs
function clearInputs(){
    signUpName.value = "" ;
    signUpEmail.value = "" ;
    signUpPass.value = "" ;
}


//for check signUp inputs is empty or not ?
function isEmpty(){

    if (signUpName.value == "" || signUpEmail.value == "" || signUpPass.value == "") {
        return false
    } else {
        return true
    }
}


//function for validate the Name
function validateName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(signUpName.value) == true){
        return true;
    }else{
        return false;
    }
    
}

//function for validate the Email
function validateEmail(){
    var regex = /([a-z]*|[A-Z]*)(@)([a-z]*|[A-Z]*)(.com)$/;
    if(regex.test(signUpEmail.value) == true){
        return true;
    }else{
        return false;
    }
}


//function for check if the email is exist or not ?
function isEmailExist() {
    for (var index = 0; index < signUpContainer.length; index++) {
        if ( signUpContainer[index].userEmail.toLowerCase() == signUpEmail.value.toLowerCase() ) {
            return false
        }
    }
}




//==================================== LOGIN ========================================

function logIn(){

    if (isLoginEmpty() == false) {
        logInReqiuered();
        return false
    }
    

    if (isCorrect()) {
        logInBtn.href = "home.html";
        

    }else{
        logInFailed();
    }

}


//---------------- Login Messages ----------------
function logInReqiuered(){
    incorrect.innerText = "all inputs are required"
    incorrect.className = "text-danger" ;
}

function logInFailed(){
    incorrect.innerText = "Email or Password is incorrect"
    incorrect.className = "text-danger" ;
}
//------------------------------------------------


//for check login inputs is empty or not ?
function isLoginEmpty(){

    if (logInPass.value == "" || logInEmail.value == "") {
        return false
    } else {
        return true
    }
}


//for check if email and password are correct or not ?
function isCorrect(){
    for (var index = 0; index < signUpContainer.length; index++) {
        if ( signUpContainer[index].userEmail == logInEmail.value && signUpContainer[index].userPass == logInPass.value ) {

            currentName = signUpContainer[index].userName ; //store name of user 
            localStorage.setItem("name" , JSON.stringify(currentName)) ; //store name of user in local storage
            
            return true;
        }
    }
}


//for return name from local storage and display in in home page
var currentName = JSON.parse(localStorage.getItem("name"));
userMessage.innerText = "WELCOME " + currentName ;


//if user goes to home page without entering email and password 
if (currentName == null) {
userMessage.innerText = "You must enter your email and password" ;
}


//delete name from local storage when user log out 
function logOut(){
    localStorage.removeItem("name");
}