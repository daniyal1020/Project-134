objects = [];
video = '';
Status = '';
function preload(){
    video = createVideo('video.gif');
    video.hide();
}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    
}
function draw(){
    image(video, 0, 0, 300, 300);
    if(Status != ""){
        object_detector.detect(video, gotResult);

     for(i = 0; i < objects.length; i++){
        document.getElementById('status').innerHTML = 'Status: Baby Found';


        fill('red');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "  " + percent + '%' , objects[i].x + 15, objects[i].y + 15 );
        noFill();
        stroke('red');
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }  
    }
    else{
        document.getElementById('status').innerHTML = 'Status: Baby Not Found';

    }
}
function start(){
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
}
function modelLoaded(){
    Status = true;
    console.log('Model is Loaded.');
    video.loop();
    video.volume(1);
    video.speed(1);
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}