/////////////////GLOBAL////////////////////////////////////////
const index = localStorage.getItem("remainSignIn");
const dataId = new URLSearchParams(location.search).get('id');

/////////////////WHEN START////////////////////////////

getMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`);

document.getElementById("Name").innerHTML= JSON.parse(localStorage.getItem("profilesList"))[index].name;

/////////////////EVENTTS///////////////////
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
//////////////////////////////FUNCTIONS//////////////////
// API call
async function getMeals(api){
    let apiData; 
        const apiResponse =await fetch(`${api}`);
        if(apiResponse.ok ==true){
            apiData = await apiResponse.json();
            displayInstruction(apiData.meals["0"]);
        }
}

// instruction display
function displayInstruction(data){
    let icon = "fa-regular"
    let ingredients = ``;
    let tagsShow = ``;

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1 d-inline-block">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let ingTags = `${data.strTags}`;
    let sentences = ingTags.split(/\,/);

    for (let i = 0; i  < sentences.length; i++) {
        if(sentences[i] == "null" || sentences[i] ==""){
            continue;
        }else{
        tagsShow += `<li class="alert alert-danger m-2 p-1 d-inline-block">${sentences[i]}</li>`
        }
    }

    if(AllFavoritesId != null && AllFavoritesId.some(obj => obj == `${data.idMeal}`) == true){
        icon = "fa-solid"
    }

    let cartona=`
            <div class="col-md-4">
                <img src="${data.strMealThumb}" alt="" class="w-100 rounded-3">
                <h2>${data.strMeal}</h2>
                <button onclick="favorite(${data.idMeal})" class="btn btn-dark">Favorite? <i class="${icon} fa-heart text-danger ${data.idMeal}"></i></button>

            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data.strInstructions}</P>
                <h3><span class="fw-bolder">Area: </span> ${data.strArea}</h3>
                <h3><span class="fw-bolder">Category: </span> ${data.strCategory}</h3>
                <h3><span class="fw-bolder">Recipes: </span></h3>
                <ul class="list-unstyled">${ingredients}</ul>
                <h3><span class="fw-bolder">Tags:</span></h3>
                <ul class="list-unstyled">${tagsShow}</ul>
                <a href="${data.strSource}" target="_blank" class="btn btn-success m-2">Source</a>
                <a href="${data.strYoutube}" target="_blank" class="btn btn-danger m-2">Youtube</a>
            </div>
    `;
    document.getElementById('Instructions').innerHTML=cartona;
}