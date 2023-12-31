Status = "";
TVandAc_image = "";
objects = [];

function preload(){
    TVandAc_image = loadImage("TV and Ac.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}


function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(TVandAc_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(TVandAc_image,0,0,640,350);
    if(Status !="")
    {
     for(i = 0; i < objects.length; i++)
     {
         document.getElementById("status").innerHTML = "Status : object dectected";
 
         fill("#FF0000");
         percent = floor(objects[i].confindence * 100);
         text(objects[i].label +" " + percent + "%", objects[i].x + objects[i].y);
         noFill();
         stroke("#FF0000");
         rect(objects[i].x, objects[i].y, objects[i].width,  objects[i].height);
     }
    }
}