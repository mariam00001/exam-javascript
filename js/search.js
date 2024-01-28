// let input = document.querySelector("SearchByName");
// input.addEventListener("input",function(){
//     displaysearch()
// })


// $("#SearchByName").on("input", function(){
//     displayGet()
// })
async function getApi(){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let res = await api.json()
    return res.meals;
}
async function displayGet(){
    let meals = await getApi();
    let cartona ="";
    for (let i = 0; i < meals.length; i++) {
       cartona+=`
       <div class="col-md-3">
                <div class="home-sec position-relative">
                    <img src="${meals[i].strMealThumb}" class="w-100">
                <div class="capiton-layer position-absolute">
                    <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
       `  
    }
    document.querySelector("#myser").innerHTML=cartona
}

