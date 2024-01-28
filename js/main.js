$(".icon-group i").on("click", function () {
if($("#setting").css("left")=="0px"){
    $("#setting").animate({ left: `-${$(".gear-box").innerWidth()}` }, 500)
    $("#setting ul").addClass("animate__animated animate__fadeOutDown")
    $(".open").css("display","flex")
    $(".close").css("display","none")
}else{
    $("#setting").animate({ left: "0px" }, 500)
    $("#setting ul").removeClass("animate__animated animate__fadeOutDown")
    $("#setting ul").addClass("animate__animated animate__fadeInUp")
    $(".close").css("display","flex")
    $(".open").css("display","none")
}
})
$(".nav-link").click(function(){
    $(this).addClass("active")
    $(this).parent().siblings().children().removeClass("active")
})
$(document).ready(function(){
    $(".loading").slideUp(6000)
})
// start home section
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
    document.querySelector("#mydata").innerHTML=cartona
}
displayGet()
// end home section
// start categories section
$("#categories").on("click",function(){
    $('#mydata').addClass('d-none')
    $('#mycontact').removeClass('d-flex').addClass("d-none")
    $('#mying').removeClass('d-flex').addClass("d-none")
    $('#myareas').removeClass('d-flex').addClass("d-none")
    $('#mysearch').removeClass('d-flex').addClass("d-none")
    $('#mycate').addClass("d-flex")
    displayCategories()
})
async function categoriesApi(){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let res = await api.json()
    return res.categories;
}
async function displayCategories(){
    let categories = await categoriesApi();
    let cartona ="";
    for (let i = 0; i < categories.length; i++) {
       cartona+=`
       <div class="col-md-3">
                <div class="home-sec position-relative">
                    <img src="${categories[i].strCategoryThumb}" class="w-100">
                <div class="capiton-layer2 position-absolute">
                    <h3 class="pt-2">${categories[i].strCategory}</h3>
                    <p class"para">${categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}<p/>
                </div>
            </div>
        </div>
       `   
    }
    document.querySelector("#RowData").innerHTML=cartona
}
// end categories section

// start ingredients section
$("#ingredients").on("click", async function(){
    $('#mydata').addClass('d-none')
    $('#mycontact').removeClass('d-flex').addClass("d-none")
    $('#myareas').removeClass('d-flex').addClass("d-none")
    $('#mysearch').removeClass('d-flex').addClass("d-none")
    $('#mycate').addClass("d-none")
    $('#mying').removeClass('d-none').addClass("d-flex")
    showIngredientsAtHome()
})
function showIngredientsAtHome(){
        cartona=``;
        IngredientsData.forEach((el)=>{
            getDataofIngredients()
           cartona+=`
           <div class="col-md-3 cusItem getStrIngredients" strIngredients="${el.strIngredient}" >
           <div class="home-meals text-center " >
               <div class="container text-center custome-color">
               <i class="fa-solid fa-drumstick-bite fa-4x text-center"></i>
               
               <h3 class="pt-1">${el.strIngredient}</h3>
               <p class="text-center">${el.strDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>
               </div>
           </div>
       </div>
         `
        })
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        getStrIngredients()
     }
let IngredientsData=[]
async function getDataofIngredients(){
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
   let result= await data.json();
   IngredientsData=result.meals.splice(0,20);  
}
getDataofIngredients()
function getStrIngredients(){
    let StrIng=Array.from( document.querySelectorAll(".getStrIngredients"))
    StrIng.forEach((el)=>{

      el.addEventListener("click",function (e) {
       let itemDate=this.getAttribute("strIngredients")
       getIngredientResult(itemDate)
       })
    }) 
}
let ingData=[]
async function getIngredientResult(x) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none")
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    let result= await data.json();
    ingData=result.meals.splice(0,20);
    showIngradientAtHome()
}
function showIngradientAtHome(){
        cartona=``;
        ingData.forEach((el)=>{
           cartona+=`
           <div class="col-md-3 cusIngItem getStrCategory" IngreId="${el.idMeal}"  data-bs-toggle="modal" data-bs-target="#exampleModal">
           <div class="home-meals position-relative rounded-2 overflow-hidden" >
               <img src="${el.strMealThumb}" class="w-100" alt="">
               <div class="position-absolute name-of-meal d-flex  align-items-center">
               <h3 class=" special-font">${el.strMeal}</h3>
               </div>
           </div>
       </div>
     
         `
        })
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        getIngradientItems()
     }
function getIngradientItems() {
        let item= Array.from( document.querySelectorAll(".cusIngItem"))
        item.forEach((el)=>{
            el.addEventListener("click",function(){
                let id=this.getAttribute("IngreId")
                getDeailes(id)
            })
        })
    }
// end ingredients section

// star contact us section 
$("#contact").on("click",function(){
    $('#mydata').addClass('d-none')
    $('#RowData').removeClass('d-flex').addClass("d-none")
    $('#myareas').removeClass('d-flex').addClass("d-none")
    $('#mysearch').removeClass('d-flex').addClass("d-none")
    $('#mycate').addClass("d-none")
    $('#mycontact').removeClass('d-none').addClass("d-flex")
})
let submitBtn= document.getElementById("submitBtn") 
 let nameInput=document.getElementById("nameInput") 
 nameInput.addEventListener("blur",validateName) 
 function validateName() { 
      
     let reg=/^[A-Z][a-z]{2,7}( )?([A-za-z]{3,7})?$/ 
     if (reg.test(nameInput.value)==true) { 
         document.getElementById("nameAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("nameAlert").classList.replace("d-none","d-block") 
         return false 
     } 
      
 } 
 let emailInput=document.getElementById("emailInput")  
 emailInput.addEventListener("blur",validateEmail) 
 function validateEmail() { 
      
     let reg=/^[a-z]{3,10}@[a-z]{2,10}\.[a-z]{2,4}$/ 
     if (reg.test(emailInput.value)==true) { 
         document.getElementById("emailAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("emailAlert").classList.replace("d-none","d-block") 
         return false 
     } 
     
 } 
 let phoneInput=document.getElementById("phoneInput") 
 phoneInput.addEventListener("blur",validatePhone) 
 function validatePhone() { 
      
     let reg=/^(010|011|012|015)[0-9]{8}$/ 
     if (reg.test(phoneInput.value)==true) { 
         document.getElementById("phoneAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("phoneAlert").classList.replace("d-none","d-block") 
         return false 
     }   
 } 
 let ageInput=document.getElementById("ageInput") 
 ageInput.addEventListener("blur",validateAge) 
 function validateAge() { 
      
     let reg=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/ 
     if (reg.test(ageInput.value)==true) { 
         document.getElementById("ageAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("ageAlert").classList.replace("d-none","d-block") 
         return false 
     } 
 } 
 let passwordInput=document.getElementById("passwordInput") 
 passwordInput.addEventListener("blur",validatePass) 
 function validatePass() {  
     let reg=/^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/ 
     if (reg.test(passwordInput.value)==true) { 
         document.getElementById("passwordAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("passwordAlert").classList.replace("d-none","d-block") 
         return false 
     }  
 } 
 let repasswordInput=document.getElementById("repasswordInput") 
 repasswordInput.addEventListener("blur",validateRePass) 
 function validateRePass() { 
      
     let reg=/^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/ 
     if (reg.test(repasswordInput.value)==true &&(document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value)==true) { 
         document.getElementById("repasswordAlert").classList.replace("d-block","d-none") 
        return true 
     } 
     else{ 
         document.getElementById("repasswordAlert").classList.replace("d-none","d-block") 
         return false 
     }  
 }  
 function val() { 
     if (validateRePass() ==true&&validatePass()==true &&validateAge()==true&&validatePhone()==true&&validateEmail()==true&&validateName()==true) { 
         document.getElementById("submitBtn").removeAttribute("disabled") 
         } else { 
         document.getElementById("submitBtn").setAttribute("disabled", true)  
         } 
 } 
 repasswordInput.addEventListener("keyup",val) 
// end contact us section 

// start search section 
$("#search").on("click",function(){
    $('#mydata').addClass('d-none')
    $('#mycontact').removeClass('d-flex').addClass("d-none")
    $('#RowData').removeClass('d-flex').addClass("d-none")
    $('#mycate').addClass("d-none")
    $('#mysearch').addClass('d-flex').removeClass("d-none")
})
// start areas section
$("#areas").on("click",function(){
    $('#mydata').addClass('d-none')
    $('#mycontact').removeClass('d-flex').addClass("d-none")
    $('#mying').removeClass('d-flex').addClass("d-none")
    $('#mysearch').removeClass('d-flex').addClass("d-none")
    $('#mycate').addClass("d-none")
    $('#myareas').removeClass('d-none').addClass("d-flex")
    showAreasAtHome()
})
    
function showAreasAtHome(){
        getDataofArea()
        cartona=``;
        areaData.forEach((el)=>{
           cartona+=`
           
           <div class="col-md-3 cusItem getStrArea" strArea="${el.strArea}" >
           <div class="home-meals " >
               <div class="container text-center custome-color">
               <i class="fa-solid fa-house-laptop fa-4x text-center"></i>
               
               <h3 class="pt-1">${el.strArea}</h3>
               </div>
               </div>
           </div>
       </div>
     
         `
         
        })
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        
     
        getStrArea()
        
   
     }
let areaData=[]
async function getDataofArea(){
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
   let result= await data.json();
   areaData=result.meals;
}
getDataofArea()
function getStrArea(){
    let StrArea=Array.from( document.querySelectorAll(".getStrArea"))
    StrArea.forEach((el)=>{
      el.addEventListener("click",function (e) {
       let itemDate=this.getAttribute("strArea")
      getAreaResult(itemDate)

       })
    })
    
    
}
let ArData=[]
async function getAreaResult(x) {
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
    let result= await data.json();
    ArData=result.meals.splice(0,20);

    showAreaAtHome()
    
}
function showAreaAtHome(){

        cartona=``;
        ArData.forEach((el)=>{
           cartona+=`
           
           <div class="col-md-3 cusAreaItem getStrCategory" AreaId="${el.idMeal}"  data-bs-toggle="modal" data-bs-target="#exampleModal">
           <div class="home-meals position-relative rounded-2 overflow-hidden" >
               <img src="${el.strMealThumb}" class="w-100" alt="">
               <div class="position-absolute name-of-meal d-flex align-items-center">
               <h3 class="special-font">${el.strMeal}</h3>
               </div>
           </div>
       </div>
     
         `
         
        })
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        
        getAreaItems()
        
   
     }

function getAreaItems() {
        let item= Array.from( document.querySelectorAll(".cusAreaItem"))
        item.forEach((el)=>{
            el.addEventListener("click",function(){
                let id=this.getAttribute("AreaId")
            })
        })
    
    
    }
    // end areas section