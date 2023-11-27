import { hello } from './helper.js'

const btn = document.getElementById("detect");
const stars = document.getElementById("stars");
const reviewText = document.getElementById("reviewText");
const busted = document.getElementById("busted");

//Die Ladeanimation des Buttons 
function buttonLoader(){
    if(btn.classList.contains("button--loading")){
        btn.classList.remove("button--loading");
    }else{
        btn.classList.add("button--loading");
    

}
}
btn.addEventListener("click", buttonLoader);


//Dem Status Label das "Real" oder "Fake" anhängen
function changeStatus(){
    busted.classList.add("good")

}
btn.addEventListener("click", changeStatus);

//Nur Zahlen von 1-5 in dem Star-Input erlauben
function changeNumber(){
    if(stars.value > 5){
        stars.value = null;
    }else if(stars.value < 1){
        stars.value = null;
    }
    console.log("hallo");
}
stars.addEventListener("keyup", changeNumber);

//Den Button aktivieren, wenn überall der Input erfüllt ist
function enableButton(){
    if(stars.value != "" && stars.value != ""){
        btn.disabled = false;
    }else{
        btn.disabled = true;
    }

}
stars.addEventListener("change", enableButton);

//Den Button aktivieren, wenn überall der Input erfüllt ist
function enableField(){
    if(reviewText.value != "" && stars.value != ""){
        btn.disabled = false;
    }else{
        btn.disabled = true;
    }

}
reviewText.addEventListener("change", enableField);               


//ab hier Kommunikation mit Python ermöglichen
const spawn = require('child_process');
//für string:
const text_to_pass_in = reviewText.value;
const stars_to_pass_in = stars.value;

console.log("Data sent to python:", text_to_pass_in);
const python_process = spawn('python', ['C:\Users\Mark\Desktop\reviewDetector-main\python\test.ipynb',
 text_to_pass_in, stars_to_pass_in]);

python_process.stdout.on('data', (data) => {
    console.log('Data received', data.toString());
});
