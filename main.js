Status = "";
objects = [];
audio = "";

function preload() {
    audio = loadSound("transiberian_orchestra.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(500, 315);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 640, 420);
    if(Status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            if(objects[i].label=="person") {
                audio.stop();
            }
            else {
                audio.play();
            }
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("notification").innerHTML = "Number of Objects detected are : " + objects.length;
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}