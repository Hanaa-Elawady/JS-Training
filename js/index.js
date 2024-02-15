/////////////////////// GLOBAL//////////////
const btnLogin = document.getElementById('btnLogin');
const inputs = document.getElementsByTagName('input');
const formData = document.querySelector("form");
let isValid = false;
const hint =document.getElementById('hint');

/////////////////////// WHEN START//////////////
if (localStorage.getItem("remainSignIn") != null){   
    var index = localStorage.getItem("remainSignIn");
    login(index);
}

//////////////  EVENT ////////////
///// real time validation call
formData.addEventListener('input',function(e){
    const inputsFeilds =[ 'email' , 'password'];
    for (let i = 0 ; i < inputsFeilds.length ; i++) {
        if(e.target.id == inputsFeilds[i]){
            validation(i);
        }else{
            continue;
        }
    }
    if (hasClass(inputs[0], "is-valid") && hasClass(inputs[1], "is-valid")) {
        isValid =true;
    } else {
        isValid =false;
    }
});

////////check email & password to login
formData.addEventListener('submit',function(e){
    e.preventDefault();

    var email = inputs[0].value;
    var pass = inputs[1].value;
    storedProfiles = JSON.parse(localStorage.getItem("profilesList"));
    var index;

    // incase there is no accounts in local memory
    if( storedProfiles == null){
        hint.innerHTML= " Please signUp first" ;
    }else{ //check if email exist 
        for(var i=0 ; i < storedProfiles.length ;i++){
            if(email == storedProfiles[i].email){
                index = i;
        }} 
        // email not exist
        if( index == null || index == undefined){
            inputs[0].classList.add("is-invalid");
            inputs[1].classList.remove("is-invalid");
            hint.innerHTML= "invalid Email";
        // check the Password 
        }else if(pass != storedProfiles[index].pass ){
            inputs[0].classList.remove("is-invalid");
            inputs[1].classList.add("is-invalid");
            hint.innerHTML= " Wrong password";
        }else if (pass == storedProfiles[index].pass ){
            login(index);
            inputs[0].classList.remove("is-invalid");
            inputs[1].classList.remove("is-invalid");
        }
}
})

//////////////  FUNCTIONS ////////////
// clear form function
function Clear(){
    hint.innerHTML= "";
    for(var i=0 ; i< test.length ; i++){
        inputs[i].classList.remove("is-invalid");
        inputs[i].classList.remove("is-valid");
        inputs[i].value="";
    }
}

//// real time validation function
function validation(x){
    const regex =[/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ , //email rejex
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/];//password rejex
    if (regex[x].test(inputs[x].value)) {
        inputs[x].classList.add("is-valid");
        inputs[x].classList.remove("is-invalid");
     } else {
        inputs[x].classList.add("is-invalid");
        inputs[x].classList.remove("is-valid");
     }
}

////check validation
function hasClass(element, className) {
    return element.classList.contains(className);
}

/////// logged in Successfully
function login(x){
    location.href = "home.html";
    localStorage.setItem("remainSignIn" , x);
    Clear();
}




