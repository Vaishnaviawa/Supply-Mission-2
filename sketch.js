//variables for the sprites, bodies, images
var helicopterIMG, helicopterSprite;
var packageIMG, packageSprite, packageBody;
var ground;
var dropZone1, dropZone2, dropZone3;

//constants for engine, world, bodies, body
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	//loading respective images
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");

}

function setup() {
	//create a canvas
	createCanvas(800, 700);
	
	//rect mode center
	rectMode(CENTER);
	
	//creating a package sprite
	packageSprite = createSprite(width/2, 80, 10, 10);
	//adding image
	packageSprite.addImage(packageIMG);
	//reducing the size
	packageSprite.scale = 0.15;

	//creating a helicopter sprite
	helicopterSprite = createSprite(width/2, 200, 10,10);
	//adding image
	helicopterSprite.addImage(helicopterIMG);
	//reducing the size
	helicopterSprite.scale = 0.6;

	//creating a ground sprite
	groundSprite = createSprite(width/2, height-35, width,10);
	//adding colour
	groundSprite.shapeColor = color(255);

	//creating an engine
	engine = Engine.create();
	//adding world to the engine
	world = engine.world;

	//creating a circular package body with restitution and isStatic set to true
	packageBody = Bodies.circle(width/2,200,20,{restitution : 0.3 , isStatic : true});
	//adding the body to world
	World.add(world,packageBody);
	
	//creating a rectangular body for ground with isStatic set to true
	ground = Bodies.rectangle(width/2,650,width,15,{isStatic : true});
	//adding the body to world
 	World.add(world,ground);

	//creating the pieces that will join together to form the dropzone
	dropZone1 = new Dropzone(400,650,200,20);
	dropZone2 = new Dropzone(310,610,20,100);
	dropZone3 = new Dropzone(490,610,20,100);
	
	//updating the engine
	Engine.run(engine);
  
}

function draw() {
  
  //set background color to black
  background(0);
  
  //matching the position of the package SPRITE to the package BODY
  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;
  
  //calling the keyPressed() function
  keyPressed();
  
  //displaying the dropzone pieces
  dropZone1.display();
  dropZone2.display();
  dropZone3.display();
 
  //drawing the sprites
  drawSprites();

}

function keyPressed() {
 
	//if the down arrow is pressed, change the isStatic property of the package body to false
	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(packageBody, false);
	}  
}