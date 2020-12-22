
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY = 1;
var score = 0;
var END = 0;    
var gameState = PLAY;
var player;
var ground
function preload()
{
	
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;
	
	trex = createSprite(50,180,20,50);
  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);

  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,100);
 
  gameOver.scale = 0.5;
  
  restart = createSprite(300,140);
 
  restart.scale = 0.5;
  
  gameOver.visible = false;
restart.visible = false;
	text("Score: "+ score, 500,50);
  
	if(gameState === PLAY){
	  
	
	score = score + Math.round(getFrameRate()/60);
   
	
	if(keyDown("space")) {
	  player.velocityY = -10;
	}
	
	player.velocityY = player.velocityY + 0.8;
	
	if (ground.x < 0){
	  ground.x = ground.width/2;
	}
	
	player.collide(invisibleGround);
	spawnClouds();
	spawnObstacles();
	  
		if(obstaclesGroup.isTouching(player)){
		gameState = END;
	  }
	}
	 else if(gameState === END) {
	  gameOver.visible = true;
	  restart.visible = true;
	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  
  drawSprites();
 
}
function reset(){
	gameState = PLAY;
	
	gameOver.visible = false;
	restart.visible = false;
	
	obstaclesGroup.destroyEach();
	cloudsGroup.destroyEach();
	

	
	score = 0;
	
  }
function spawnObstacles() {
	if(frameCount % 60 === 0) {
	  var obstacle = createSprite(600,165,10,40);
	  obstacle.velocityX = -(6+3*score/100);
	  
	  //generate random obstacles
	  var rand = Math.round(random(1,6));
	  switch(rand) {
		case 1: obstacle.addImage(obstacle1);
				break;
		case 2: obstacle.addImage(obstacle2);
				break;
		case 3: obstacle.addImage(obstacle3);
				break;
		case 4: obstacle.addImage(obstacle4);
				break;
		case 5: obstacle.addImage(obstacle5);
				break;
		case 6: obstacle.addImage(obstacle6);
				break;
		default: break;
	  }
	  
	  //assign scale and lifetime to the obstacle           
	  obstacle.scale = 0.5;
	  obstacle.lifetime = 300;
	  //add each obstacle to the group
	  obstaclesGroup.add(obstacle);
	}
}
}
