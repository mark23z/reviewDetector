const btn = document.getElementById("detect");
const stars = document.getElementById("stars");

function buttonLoader(){
    if(btn.classList.contains("button--loading")){
        btn.classList.remove("button--loading");
    }else{
        btn.classList.add("button--loading");
    

}
}


btn.addEventListener("click", buttonLoader);

const busted = document.getElementById("busted");

function changeStatus(){
    busted.classList.add("good")

}

btn.addEventListener("click", changeStatus);

function changeNumber(){
    if(stars.value > 5){
        stars.value = null;
    }else if(stars.value < 1){
        stars.value = null;
    }
    console.log("hallo");
}

stars.addEventListener("keyup", changeNumber);
