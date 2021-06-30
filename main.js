song = "";
SLW = 0;
SRW = 0;
LWX = 0;
LWY = 0;
RWX = 0;
RWY = 0;
function preload(){
    song = loadSound('music1.mp3');
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill('#033');
    stroke('#022');
    if(SLW > 0.2){
        circle(LWX,LWY,20);
        INLWY = floor(Number(LWY));
        volume = INLWY/500;
        document.getElementById('volume').innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
    if(SRW > 0.2){
        circle(RWX,RWY,20);
        if(RWY >0 && RWY <=100){
            song.rate(0.5);
            document.getElementById('speed').innerHTML = "Speed: 0.5x";
        }
        else if(RWY > 100 && RWY <= 200){
            song.rate(1);
            document.getElementById('speed').innerHTML = "Speed: 1x";
        }
        else if(RWY > 200 && RWY <= 300){
            song.rate(1.5);
            document.getElementById('speed').innerHTML = "Speed: 1.5x";
        }
        else if(RWY > 300 && RWY <= 400){
            song.rate(2);
            document.getElementById('speed').innerHTML = "Speed: 2x";
        }
        else if(RWY > 400 && RWY <= 500){
            song.rate(2.5);
            document.getElementById('speed').innerHTML = "Speed: 2.5x";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('poseNet Intialized!');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("Right Wrist - "+ RWX + "," + RWY);
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log('Left Wrist - '+ LWX+ ", " + LWY);
        SLW = results[0].pose.keypoints[9].score;
        SRW = results[0].pose.keypoints[10].score;
    }
}
function stop(){
    song.pause();
}