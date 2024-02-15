let AllFavoritesId =[];

/////number of favorite items
if (localStorage.getItem("favorites") != null){   
    AllFavoritesId =JSON.parse(localStorage.getItem("favorites"));
    document.getElementById("favNum").innerHTML = `${AllFavoritesId.length}` ;
}
////// add and remove meals from favorites
function favorite(x){
    let elements =document.getElementsByClassName(`${x}`); 

    if(AllFavoritesId == null ||  AllFavoritesId.some(obj => obj == `${x}`) == false){
        AllFavoritesId.push(`${x}`)
        for(let i =0 ; i<elements.length ; i++){
            elements[i].classList.remove("fa-regular");
            elements[i].classList.add("fa-solid");
        }

    }else if(AllFavoritesId != null && AllFavoritesId.some(obj => obj == `${x}`) == true){
        let index = AllFavoritesId.indexOf(`${x}`);
        AllFavoritesId.splice(index, 1);
        for(let i =0 ; i<elements.length ; i++){
            elements[i].classList.add("fa-regular");
            elements[i].classList.remove("fa-solid");
        }
    }
    localStorage.setItem("favorites" , JSON.stringify(AllFavoritesId));
    document.getElementById("favNum").innerHTML = AllFavoritesId.length ;

}