var trex,trex_running,trex_colided;
var ground,ground_i,ground_iv;
var cloud,cloud_i,CloudsGroups;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,ObstaclesGroup;
var count=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var highscore =0;
var x =0;
var restart,restart_i,gameOver,gameOver_i;
var jump,die,checkpoint;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_colided=loadAnimation("trex_collided.png")
  ground_i=loadImage("ground2.png");
  cloud_i=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  restart_i=loadImage("restart.png")
  gameOver_i=loadImage("gameOver.png")
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_colided)
  trex.scale=0.5;
  trex.setCollider("circle",0,0,40);        
  
  ground=createSprite(300,180,600,20);
  ground.addImage("ground1",ground_i)
  ground.velocityX=-5;

  
  ground_iv=createSprite(300,190,600,20);
  ground_iv.visible=false;
  
  gameOver = createSprite(300,80);
  restart = createSprite(300,120);

gameOver.addImage("gameOver",gameOver_i);
gameOver.scale = 0.5;
restart.addImage("restart",restart_i);
restart.scale = 0.5;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
}

function draw() {
  background(255);
   //display score
  text("Score: "+ count, 500, 50);
  if (x==1) {
    text("highscore: "+ highscore, 500, 80);
  }
  if (gameState==PLAY){
  
    gameOver.visible=false;
    restart.visible=false;
  if (keyDown("space")&&trex.y>150 ){
    trex.velocityY=-13;
    jump.play();
  }
  trex.velocityY=trex.velocityY+0.8;
  
  if(ground.x<0){
  ground.x=600;
  }
    if (frameCount % 5==0) {
        count=count+1;
        if (count % 100==0&&count>0) {
       checkpoint.play();
        ground.velocityX=ground.velocityX-1;
    }
      }
    if(ObstaclesGroup.isTouching(trex)){
      die.play();
      gameState = END;
    }
  spawnObstacles();
  spawnClouds();
  }

  else if(gameState==END){
   //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_colided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  
  trex.collide(ground_iv);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round (random (80,120));
    cloud.addImage("cloud",cloud_i);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break;
      case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
      case 6:obstacle.addImage(ob6);
      break;
    }
          
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200 ;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset() {
  gameState=PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  if (count>highscore) {
    highscore=count;
  }
  x=1
  
  count=0;
  trex.x=50;
trex.y=180;
  ground.velocityX = -6;

}
