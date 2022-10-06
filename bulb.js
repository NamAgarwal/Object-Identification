Status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("bulb.jpg");
}

function setup(){
    canvas = createCanvas(340, 440);
    canvas.center();

    detector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function draw(){
    image(img, 0, 0, 340, 440);
    if(Status == true){
        for(i = 0; i<objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";
            document.getElementById("number_of_objects").innerHTML = "There is one big object in the image and cocossd model has detected  - "+ objects.length + " of them";

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x -240, objects[i].y - 150);
            noFill();
            stroke('red');
            rect(objects[i].x - 240, objects[i].y - 150, objects[i].width - 175, objects[i].height - 260);
        }
    }
}
function modeLoaded(){
    Status = true;
    console.log("Model is ready");
    detector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}