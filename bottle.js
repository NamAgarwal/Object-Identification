Status = "";
objects = [];

function preload(){
    img = loadImage("bottle.jpg");
 }
 
function setup(){
    canvas = createCanvas(350, 400);
    canvas.center();
     
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects";
}
function draw(){
    image(img, 0, 0, 350, 400);

    if(Status == true){
        for (i = 0; i< objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";

            document.getElementById("number_of_objects").innerHTML = "There is one big object in the image and cocossd model has detected  - "+ objects.length + " of them";

            percent = floor(objects[i].confidence * 100);
            fill('red');
            text(objects[i].label + " "+ percent + "%", objects[i].x -225, objects[i].y -285);
            noFill();
            stroke('red');
            rect(objects[i].x - 225, objects[i].y -280, objects[i].width -100, objects[i].height -750);
        }

    }
}
function modelLoaded(){
    console.log("Model is ready");
    Status = true;
    detector.detect(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}