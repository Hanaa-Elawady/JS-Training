//////////GLOBAL////////////////////
const index = localStorage.getItem("remainSignIn");
const Favorites = document.getElementById("Favorites");
let showFavorites =document.getElementById('showFavorites')
let storeFavoriteData =[];

////////////WHEN START //////////////////////
// user name
document.getElementById("Name").innerHTML= JSON.parse(localStorage.getItem("profilesList"))[index].name;

// get favorite
getFavoriteMeals();

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


//////////////////////FUNCTIONS //////////////////////////////////////////

// api fetch 
async function getMeals(api){
    let apiData; 
        const apiResponse =await fetch(`${api}`);
        if(apiResponse.ok ==true){
            apiData = await apiResponse.json();
            storeFavoriteData.push(apiData.meals["0"]);
        }
}

// display Meals
function displayMeals(data){
    if(data == null || data == undefined ||data.length == 0){
            showFavorites.innerHTML='<p class="text-center mx-auto my-5">No favorite meals yet !!!</p>';
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
            <button onclick="onFavorite(${data[i].idMeal})" class="btn btn-dark position-absolute top-0">Favorite? <i class="${icon} fa-heart text-danger ${data[i].idMeal}"></i></button>
        </div>
        `}
         showFavorites.innerHTML=cartona;
}}

////// add and remove meals from favorites
function onFavorite(x){
    favorite(x);
    getFavoriteMeals();
}

// get data of each id 
async function getFavoriteMeals(){
    for(let i=0 ;i<AllFavoritesId.length ; i++){
    await getMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${AllFavoritesId[i]}`);
    }
    displayMeals(storeFavoriteData);
    storeFavoriteData =[];
}

function showDetails(id) {
    location.href = `./instruction.html?id=${id}`;
}

