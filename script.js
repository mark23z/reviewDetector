const btn = document.getElementById("detect");

function buttonLoader(){
    if(btn.classList.contains("button--loading")){
        btn.classList.remove("button--loading");
    }else{
        btn.classList.add("button--loading");
    

}
}


btn.addEventListener("click", buttonLoader);

