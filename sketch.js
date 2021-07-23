var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudGroup, cloudImage;
var o1,o2,o3,o4,o5,o6;
var score = 0;
var obstacleGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  // creating invisible ground
  invisibleGround = createSprite(200,190,400,20);
  invisibleGround.visible = false;

  //create ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  obstacleGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  background(180);
  fill(0);
  text(" Score " + score, 500,50);
  
 
  if(gameState === PLAY){
      //jumping the trex on space key press
  if(keyDown("space")&& trex.y > 155) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -5;
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  spawnclouds();
  spawnobstacles();
  score = score + Math.round(frameCount/130);
  
  if(obstacleGroup.isTouching(trex)){
    gameState = END;
  }
  }
  else if(gameState === END){
   ground.velocityX = 0;
   trex.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   trex.changeAnimation("collided", trex_collided);
  }


  
 

 //stop trex from falling down 
  trex.collide(invisibleGround);
  drawSprites();
}

 function spawnclouds(){
  if(frameCount% 80 == 0){
   cloud = createSprite(600,10);
   cloud.addImage("cloud", cloudImage);
   cloud.scale = 0.5;
   cloud.velocityX = -4;
   trex.depth = cloud.depth +1;

   cloud.y = Math.round(random(60,100));
   cloud.lifetime = 150;
   cloudGroup.add(cloud);
  }
 }

 function spawnobstacles(){
  if(frameCount% 100 == 0){
    var obstacle1 = createSprite(600,165);
    obstacle1.velocityX = -4;
    obstacle1.scale = 0.5;
    var r = Math.round(random(1,6));
    switch (r) {
      case 1: obstacle1.addImage(o1);
        break;
      case 2: obstacle1.addImage(o2);
        break;
      case 3: obstacle1.addImage(o3);
        break;
      case 4: obstacle1.addImage(o4);
        break;
      case 5: obstacle1.addImage(o5);
        break;
      case 6: obstacle1.addImage(o6);
        break;
      default: 
        break;
    }
    obstacle1.velocityX = -5;
    obstacle1.lifetime = 125;
    obstacleGroup.add(obstacle1);
  }




 }