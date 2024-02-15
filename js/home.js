//////////GLOBAL////////////////////
const index = localStorage.getItem("remainSignIn");
const search = document.getElementById("Search");
let searchByFirstLitter = document.getElementById('searchByFirstLitter');
let displayMealsMain =document.getElementById('displayMealsMain');

////////////WHEN START //////////////////////
document.getElementById("Name").innerHTML= JSON.parse(localStorage.getItem("profilesList"))[index].name;
getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');

///////////////////////EVENTS///////////////////////////////

//////hover effect on logout icon
document.getElementById("signOut").addEventListener("mouseenter" ,function(){
    document.querySelector(".fa-solid").classList.replace("fa-door-closed","fa-door-open")
})
document.getElementById("signOut").addEventListener("mouseleave" ,function(){
    document.querySelector(".fa-solid").classList.replace("fa-door-open","fa-door-closed")
})

//////////click logout 
document.getElementById("signOut").addEventListener('click' ,function(){
    localStorage.removeItem("remainSignIn");
})

// call api while searching by name
document.getElementById('searchByName').addEventListener('input',function(){
    getMeals(`https://themealdb.com/api/json/v1/1/search.php?s=${searchByName.value}`)
})

// call api while searching by letter
searchByFirstLitter.addEventListener('input',function(){
    let length = searchByFirstLitter.value.length;
    if (length == 0) {
        getMeals(`https://themealdb.com/api/json/v1/1/search.php?f=a`);
    }else if(length ==1){
        getMeals(`https://themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLitter.value}`);
    }else{
        searchByFirstLitter.value = searchByFirstLitter.value.slice(0, 1);
        getMeals(`https://themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLitter.value}`);
    }
})

//////////////////////FUNCTIONS //////////////////////////////////////////
// api fetch 
async function getMeals(api){
    let apiData; 
    const apiResponse =await fetch(`${api}`);
    if(apiResponse.ok ==true){
        apiData = await apiResponse.json();
        displayMeals(apiData.meals);
    }
};

// display Meals
function displayMeals(data){
    if(data == null || data == undefined ||data.length == 0){
            displayMealsMain.innerHTML='<p class="text-center mx-auto my-5">no meals by this name</p>';
    }else{
    let cartona =``;
        for( let i =0 ; i < data.length ; i++ ){
            let icon = "fa-regular"
            if(AllFavoritesId != null && AllFavoritesId.some(obj => obj == `${data[i].idMeal}`) == true){
                icon = "fa-solid"
            }
            cartona+=`
            <div class="col position-relative" >
            <div class="cursor" onclick="showDetails(${data[i].idMeal})">
                <div class="imgContainer rounded-3 w-100 h-auto position-relative">
                    <img src="${data[i].strMealThumb}" alt="" class="w-100 rounded-3">
                    <div class="w-100 h-100 position-absolute top-100 d-flex picFade">
                        <div class="m-auto text-center">
                            <h3 class="text-black">${data[i].strMeal}</h3>
                        </div>
                   </div>
                </div>
            </div>
            <button onclick="favorite(${data[i].idMeal})" class="btn btn-dark position-absolute top-0">Favorite? <i class="${icon} fa-heart text-danger ${data[i].idMeal}"></i></button>
        </div>
        `}
            displayMealsMain.innerHTML=cartona;
}};


function showDetails(id) {
    location.href = `./instruction.html?id=${id}`;
}

