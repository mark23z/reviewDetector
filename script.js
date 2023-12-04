//import {PythonShell} from '/python-shell.py';

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
    /* if(result > 0) */ busted.classList.add("fake")
    /* if(result < 0) busted.classList.add("good") */

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

var text = document.getElementById("reviewText").value;

function gibInfo(){
    console.log(reviewText.value)
}
btn.addEventListener("click", gibInfo);

btn.addEventListener("click", function(e) {
    fetch('http://127.0.0.1/predict?text='+reviewText.value+'&b='+stars.value)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log("Ergebnis:"+myJson.result);
    });
})

//const { PythonShell } = require("python-shell");

/* let options = {
    scriptPath: "C:\Users\Mark\Desktop\reviewDetector-main\python",
    args:["I broke my old Radioshack and bought the new one. I did not need a Radioshack. I am very happy with the product and the quality of the product. I would definitely recommend this product to anyone.", 5.0]
};

var result;

PythonShell.run("Modelle_laden_1.ipynb", options, (err,res) => {
    if (err) console.log(err);
    if (res) {
        result = res;
    }
}); */



//ab hier Kommunikation mit Python ermöglichen
//const spawn = require('child_process');
//für string:
//const text_to_pass_in = reviewText.value;
//const stars_to_pass_in = stars.value;

//console.log("Data sent to python:", text_to_pass_in);
//const python_process = spawn('python', ['C:\Users\Mark\Desktop\reviewDetector-main\python\test.ipynb',
// text_to_pass_in, stars_to_pass_in]);

//python_process.stdout.on('data', (data) => {
//    console.log('Data received', data.toString());
//});
