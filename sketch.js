//variables
var ground;
var ironMan, ultron;
var ironManImg1, ironManImg2, ultronImg1, ultronImg2,spaceImg,spaceImg2;
var edges;
var gameState="serve";
var ultronsGroup;
var life=2;
var score=0;
var restart, restartImg;

function preload(){
  //loaded the images
  spaceImg = loadImage("spaceImg.png");
  spaceImg2 = loadImage("spaceImg2.png");

  ironManImg1 = loadImage("ironman1.png");
  ironManImg2 = loadImage("ironman2.png");

  ultronImg1 = loadImage("ultron1.png");
  ultronImg2 = loadImage("ultron2.png");

  restartImg = loadImage("restart.png");
}

function setup() {
  //created the canvas
  createCanvas(1000,550);
  //created the objects and added images
  ground = createSprite(350, 275, 200, 20);
  ironMan = createSprite(100,280,20,10);
  ironMan.addImage("ironManFlying",ironManImg1);
  ground.addImage("bgImg",spaceImg2);
ground.scale=2.0;
  ground.velocityX = -6;

  //adjusting the background
  ground.scale=ground.scale+0.5;
  var edges = createEdgeSprites();
  ultronsGroup=new Group();
  restart = createSprite(500,300);
  restart.addImage("resetImg",restartImg);
  restart.visible=false;
}

function draw() { 
  //setting the background
  background(spaceImg2);  
 
  drawSprites();

  textSize(20);
  fill("white")
  text("Score: "+ score, 500,150);

if(keyCode===32 && gameState==="serve"){
  gameState = "play";
}

if(gameState==="serve"){
  fill("white")
  text("Press UP and DOWN key to control IronMan.",100,300)
  text(" Do not touch the ultron bots and make it as far as you can.",100,320)
    text(" You will get 5 lives to destroy Ultron. Press SPACE bar to continue. All the best gamer!",200,350);
    ironMan.visible=true    

}

console.log(gameState);

  if(gameState==="play"){
 //adding velocity to ground making it infinite
    ground.velocityX = -4;
    score=score+Math.round(frameRate()/100);
    if(ground.x<0){
      ground.x = 700;
    }
    
    restart.visible=false;
    /* if(ironMan.isTouching(edges)){
       ironMan.x=50;
       ironMan.y=280;yy
    }*/


      //controls for ironMan
    if(keyDown(UP_ARROW)){
      ironMan.y = ironMan.y-4
    }
    if(keyDown(DOWN_ARROW)){
      ironMan.y = ironMan.y+4
    }
    //call the functions
    spawnUltrons();

    if(ultronsGroup.isTouching(ironMan)){
     // ironMan.destroy();
      gameState="end";
      life=life-1;
  
      ultronsGroup.setVelocityEach(0);
    }

  }
else if(gameState==="end"){
  ground.velocityX=0;
  ultronsGroup.destroyEach();
  restart.visible=true;
  restart.scale = 0.2;
ironMan.visible = false;
if(life===0){
  restart.visible = false;
  gameState="over";
}
}
if(mousePressedOver(restart)&& gameState==="end"){
  reset();
}
if(gameState==="over"){
  ground.velocityX=0;
  ironMan.destroy()
  restart.destroy()
  ultronsGroup.destroyEach()
}
  
  textSize(18)
  fill("white")
  text("Lives:"+ life, 500,100)

}
//function to spawn ultrons randomly
function spawnUltrons(){
  if(frameCount%120===0){
    ultron = createSprite(1000,300,20,20);
    ultron.addImage("ultronFlying",ultronImg1);
    ultron.velocityX = -4
    ultron.y = Math.round(random(50,500));
    ultron.lifetime=250;
    ultronsGroup.add(ultron);
  }
}

function reset(){
gameState="play";
ironMan.visible=true;
restart.visble=false;
score=0;
}