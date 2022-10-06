img = "";
state = "";
objects = [];

function preload(){
    img = loadImage('bed2.jpg');
}

function setup(){
    canvas = createCanvas(650, 480);
    canvas.center();
 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting objects";

}
function draw(){
    image(img, 0, 0, 650, 480) ;

    if(state != ""){

        objectDetector.detect(img, gotResult);
        for(i = 0; i<objects.length ; i++){
            document.getElementById("status").innerHTML =  "Status : Object detected";

            document.getElementById("number_of_objects").innerHTML = "There is one big object in the image and cocossd model has detected  - "+ objects.length + " of them";
            fill(0, 255, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y+15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x + 35, objects[i].y + 35, objects[i].width + 290, objects[i].height + 130);
        }
    }

}
function modelLoaded(){
    console.log("ModelLoaded");
    state = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
