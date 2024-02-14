function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet")
}
function clearCanvas(){
    background("white");
}
function draw(){
    strokeWeight(11);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("prediccion").innerHTML = 'Prediccion: '+results[0].label;
    document.getElementById("confiabilidad").innerHTML = 'Seguridad: '+Math.round(results[0].confidence*100)+"%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}