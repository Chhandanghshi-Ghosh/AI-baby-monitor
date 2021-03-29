song= ""
pict=""
status=""
objects= []
function preload(){
    song = loadSound("Alarm.mp3");
}

function setup(){
    canvas= createCanvas(280,280);
    canvas.center();

    video= createCapture(VIDEO)
    video.size(280,280)
    video.hide()
    
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}

function modelLoaded(){
    console.log('Model Loaded!!!');
    status="true";
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results
}

function draw(){
    image(video,0,0,280,280 );
        if(status == "true"){
            r= random(255)
            g= random(255)
            b= random(255)
            objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("numberObject").innerHTML="Number of Objects Detected: " + objects.length;
            fill(r,g,b)
            text(objects[i].label,objects[i].x+15, objects[i].y+15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

        }
    
            
         
    }
    else {
        document.getElementById("status").innerHTML="Status: Object Not Detected";
        document.getElementById("numberObject").innerHTML="Baby Not Found";
        song.play()
    }
    }


