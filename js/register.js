const btnRegister = document.getElementById('btnRegister');
const inputs = document.getElementsByTagName('input');
const formData = document.querySelector("form");
const signUpEmail = document.getElementById("email");
const hint = document.getElementById("hint");
let profilesList =[];
let isValid = false;


///////////////////WHEN START ////////////////////////////

// check if there is stored profile (if yes store them)
if (localStorage.getItem("profilesList") != null){   
    profilesList =JSON.parse(localStorage.getItem("profilesList"));
}

/////////////////////// EVENTS//////////////

///// real time validation call on input
formData.addEventListener('input',function(e){
    const inputsFeilds =['Name' , 'email' , 'password'];
    for (let i = 0 ; i < inputsFeilds.length ; i++) {
        if(e.target.id == inputsFeilds[i]){
            validation(i);
        }else{
            continue;
        }
    }
    if (hasClass(inputs[0], "is-valid") && hasClass(inputs[1], "is-valid") && hasClass(inputs[2], "is-valid")) {
        isValid =true;
    } else {
        isValid =false;
    }
});

//// register form action when submit
formData.addEventListener('submit',function(e){

    e.preventDefault();
    //if all fields follow the validation rules 
    if (isValid) { // right validation 

        let storedProfiles = JSON.parse(localStorage.getItem("profilesList"));
        var searchValue = signUpEmail.value;
        // check if the email is repeated 
        if(storedProfiles == null || storedProfiles.some(obj => obj.email == searchValue) == false){ //not repeated 
            setForm();
            Clear();
            hint.innerHTML="Registeration Succeeded , Go Sign in!";
            hint.classList.add("bg-success")
            hint.classList.remove("bg-danger")

        }
        else if(storedProfiles.some(obj => obj.email == searchValue) == true){ //repeated 
            hint.innerHTML="Email Address Not Available";
            hint.classList.remove("bg-success")
            hint.classList.add("bg-danger")

        }
    }else{ //validation problem 
        for(let i =0 ; i<inputs.length ; i++ ){
            if(hasClass(inputs[i], "is-valid")){
                continue;
            }else{
            inputs[i].classList.add("is-invalid");
            }
        }
    }
});

/////////////////////// FUNCTIONS//////////////

//// real time validation function
function validation(x){
    const regex =[/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/ , //name rejex 
                 /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ , //email rejex
                 /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/]; //password rejex
    if (regex[x].test(inputs[x].value)) {
        inputs[x].classList.add("is-valid");
        inputs[x].classList.remove("is-invalid");
     } else {
        inputs[x].classList.add("is-invalid");
        inputs[x].classList.remove("is-valid");
     }
}

////check feild validation
function hasClass(element, className) {
    return element.classList.contains(className);
}

//////save form data in local storage 
function setForm (){
    let profile ={
        name: inputs[0].value,
        email: inputs[1].value,
        pass: inputs[2].value,
    }
    profilesList.push(profile);
    localStorage.setItem("profilesList" , JSON.stringify(profilesList));
}

//////////clear form function 
function Clear(){
    hint.innerHTML= "";

    for(let i=0 ; i<inputs.length ;i++){
        inputs[i].value ="";
        inputs[i].classList.remove("is-invalid")
        inputs[i].classList.remove("is-valid")
    }
}
