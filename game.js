var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


// load images

var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bg.src = "pics/bg.png";
bird.src = "pics/bird.png";
fg.src = "pics/fg.png";
pipeNorth.src = "pics/pipeNorth.png";
pipeSouth.src = "pics/pipeSouth.png";

//sounds..
var fly = new Audio();
var score = new Audio();

fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";


//some variables

var gap = 85;
var constant = pipeNorth.height + gap;

var bx = 10;
var by = 180;
var gravity = 1;

var points = 0;

// pipe coordinates
var pipe = []

pipe[0]={
    x : cvs.width,
    y : 0
}


// on keydown ..

addEventListener('keydown',moveup);
function moveup(){
    by -= 25;
    fly.play();
}

// drawing images 
function draw(){

    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

        if(pipe[i].x == 135){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }

        //detect collision..
        if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width&&(by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y + constant) || by + bird.height >= cvs.height - fg.height){
            location.reload();//relaod page
        }
        
        if(pipe[i].x == 5){
            points++;
            score.play();
        }

    }
    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,bx,by);

    by += gravity;

    ctx.fillStyle = 'red';
    ctx.font = '20px Verdana';
    ctx.fillText('Score: ' + points,10,cvs.height-fg.height + 50);
    

    requestAnimationFrame(draw);

}

draw();
