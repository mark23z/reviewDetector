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
    /* if(busted.classList.contains("good")) (busted.classList.remove("good"));
    if(busted.classList.contains("bad")) (busted.classList.remove("bad")); */

}
btn.addEventListener("click", buttonLoader);


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
//ab hier Kommunikation mit Python ermöglichen
//var xxhttp = new XMLHttpRequest();

function sendToPyhton(){
    const url = "http://127.0.0.1:8000/predict";
    console.log("Text Value is:" + reviewText.value);
    console.log("Star Value is:" + stars.value);

    //var textSend = JSON.stringify(reviewText.value);
    //var textFinally = JSON.parse(textSend);
    textSend = reviewText.value;
    ratingSend = stars.value;

    textAndRatingSend = textSend + "^°" + ratingSend;
    console.log("Together:" + textAndRatingSend);
    var xxhttp = new XMLHttpRequest();
    //varList = new Array(textSend, ratingSend);
    /* for(var x = 0; x < 2; x++){
        xxhttp.open("POST", url, true);
        xxhttp.setRequestHeader("Content-type", "application/x-www-from-urlencoded");
        xxhttp.send(varList[x]);
    }  */
    xxhttp.open("POST", "http://127.0.0.1:8000/predict", true);
    xxhttp.setRequestHeader("Content-type", "application/x-www-from-urlencoded")
    
    xxhttp.send(textAndRatingSend);
    //xxhttp.send("text=" + textSend + "&rating=" + ratingSend);
    
    xxhttp.onload = function(){
        try{
        var dataReply = JSON.parse(this.responseText);
        console.log(dataReply)
        if(btn.classList.contains("button--loading")){
            btn.classList.remove("button--loading");
        }
        busted.classList.remove("real1")
        busted.classList.remove("real2")
        busted.classList.remove("real3")
        busted.classList.remove("fake3")
        busted.classList.remove("fake2")
        busted.classList.remove("fake1")
        if(dataReply == "real1") busted.classList.add("real1"); 
        if(dataReply == "real2") busted.classList.add("real2");
        if(dataReply == "real3") busted.classList.add("real3");
        if(dataReply == "fake3") busted.classList.add("fake3");
        if(dataReply == "fake2") busted.classList.add("fake2");
        if(dataReply == "fake1") busted.classList.add("fake1");
        
        //True = good
        //False = bad
        }
        catch (error){
            console.log('Error parsing JSON:', error, this.responseText)
        }
        
    }
    
    /* xxhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("w");
        }
    }; */
    };
btn.addEventListener("click", sendToPyhton);

//Dem Status Label das "Real" oder "Fake" anhängen
/* function changeStatus(){
    if(dataReply === true) busted.classList.add("good")
    if(dataReply === false) busted.classList.add("fake")

}
btn.addEventListener("click", changeStatus); */

//1 Ansatz: Flask Server
/* btn.addEventListener("click", function(e) {
    fetch('http://localhost:8000/predict?text='+reviewText.value+'&rating='+stars.value, {
        mode: 'no-cors'
    })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log("Ergebnis:"+myJson.result);
    });
}) */


//2 Ansatz: PythonShell (import Python shell geht nicht in JS, nur in Node, Chrome unterstützt kein Node)
/* const {PythonShell} = require('python-shell');

let options = {
    scriptPath: "C:\Users\Mark\Desktop\reviewDetector-main\python\Kommentarprufung.py",
    args:["I broke my old Radioshack and bought the new one. I did not need a Radioshack. I am very happy with the product and the quality of the product. I would definitely recommend this product to anyone.", 5.0]
};

var result;

PythonShell.run("Kommentarprufung.py", options, (err,res) => {
    if (err) console.log(err);
    if (res) {
        console.log(res);
        //result = res;
    }
}); */




//3 Ansatz: Ähnliche wie Python shell, auch hier funktioniert require nicht
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
