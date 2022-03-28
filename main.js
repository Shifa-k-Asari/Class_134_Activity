img = "";
status = "";
objects = [];

function preload()
{
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i<objects.length; i++)
        {
            fill("#FF0000");
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_object_length").innerHTML = "Number of objects detected are : " + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}