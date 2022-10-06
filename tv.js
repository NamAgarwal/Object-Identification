Status = "";
objects = [];

function preload(){
    img = loadImage("]television.jpg");
 }
 
function setup(){
    canvas = createCanvas(640, 480);
    canvas.center();
     
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects";
}
function draw(){
    image(img, 0, 0, 640, 480);

    if(Status == true){
        for (i = 0; i< objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";

            document.getElementById("number_of_objects").innerHTML = "There is one big object in the image and cocossd model has detected  - "+ objects.length + " of them";

            percent = floor(objects[i].confidence * 100);
            fill('red');
            text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
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