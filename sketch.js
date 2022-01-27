var ground,groundImage;
var spaceship,spaceshipImage,beam,beamImage;
var invisible1,invisible2;
var blastImage1,blastImage2;
var meteroite,meteoriteImage;

function preload() {
    groundImage = loadImage("space.png");
    spaceshipImage = loadImage("spaceship.png");
    blastImage1 = loadImage("blast.jpg");
    blastImage2 = loadImage("blast - Copy.jpg");
    meteoriteImage = loadImage("Meteorit.png");
    beamImage = loadImage("beam.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    ground = createSprite(680,-500,windowWidth,windowHeight);
    ground.addImage(groundImage);
    ground.scale = 10;
    ground.velocityY = 20;

    spaceship = createSprite(700,540,10,10);
    spaceship.addImage(spaceshipImage);
    spaceship.scale = 0.5;

    invisible1 = createSprite(10,350,10,1000);
    invisible1.visible = false;

    invisible2 = createSprite(1355,200,10,1000);
    invisible2.visible = false;
  
    meteroites = new Group();
    beams = new Group();
}

function draw() {
    background("white");

   if(ground.y > 1150){
      ground.y = ground.height/1000;
     }

   if(keyDown(RIGHT_ARROW)){
      spaceship.position.x = spaceship.position.x + 10;
      }

   if(keyDown(LEFT_ARROW)){
      spaceship.position.x = spaceship.position.x - 10;
      }

      spaceship.collide(invisible1);
      spaceship.collide(invisible2);

   if (keyDown("space")) {
        createBeam();
   }

   select_meteroite = Math.round(random(1,4));

   if (World.frameCount % 10 == 0) {
   
   if (select_meteroite == 1) {
       meteroiteMove();
   }
      } 

   beams.isTouching(meteroites,removeM);    
   if(beams.collide(meteroites)){
     beams.destroyEach();
   }
  
      drawSprites();  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  }

  function createBeam() {
    beam = createSprite(700, 450, 20, 50);
    beam.addImage(beamImage);
    beam.x = spaceship.x;
    beam.y = 450;
    beam.velocityY = -4;
    beam.lifetime = 150;
    beam.scale = 0.05;
    beams.add(beam);
  }

 function meteroiteMove(){
    meteroite = createSprite(Math.round(random(50, 1300)),0, 0, 0);
    meteroite.addImage(meteoriteImage);
    meteroite.velocityY = 5;
    meteroite.lifetime = 600;
    meteroite.scale = 0.08;
    meteroites.add(meteroite);
} 

  function removeM(sprite,meteroite){
    meteroite.remove();  
  }

  function removeB(sprites,beam){
    beam.remove();
  }