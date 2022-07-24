var path,boy,cash,diamonds,jwellery,sword,boyb,car1,pc,bp,lc
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,boybImg,car1Img,pcImg,bpImg,lcImg
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,boybG,pcG,bpG,lcG

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
 // boyImg = loadAnimation("Runner-1.png","Runner-2.png");
 car1Img= loadImage("car1.png")
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
 boybImg = loadImage("boyb.png");
pcImg = loadImage("pc.png")
bpImg = loadImage("bp.png")
lcImg = loadImage("lc.png")
}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device 
createCanvas(windowWidth,windowHeight)
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
//boy = createSprite(width/2,height-20,20,20);
//boy.addAnimation("SahilRunning",boyImg);
//boy.scale=0.08;
car = createSprite(width/2,height-20,20,20)
car.addImage("car1",car1Img)
car.scale=0.2
car.setCollider("rectangle",0,0,500,1000)
    car.debug = false

  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
boybG=new Group();
pcG=new Group()
bpG=new Group()
lcG=new Group()

}

function draw() {

  if(gameState===PLAY){
  background(0);
  car.x = World.mouseX;
 // boy.y= World.mouseY;
  
  edges= createEdgeSprites();
 // boy.collide(edges);
 car.collide(edges)

 path.velocityY = +(4 + 3* treasureCollection/500)

  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createBoyb();
    createPc()
    createBp()
    createLc()

    if (cashG.isTouching(car)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(car)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(car)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else if (boybG.isTouching(car)){
      boybG.destroyEach();
      treasureCollection= treasureCollection -100
    }else if (bpG.isTouching(pcG||lcG||boybG||cashG||diamondsG||jwelleryG||swordGroup)){
      bpG.destroyEach()
  }else if (lcG.isTouching(bpG||pcG||boybG||cashG||diamondsG||jwelleryG||swordGroup)){
    lcG.destroyEach()
  }
else if ( pcG.isTouching(bpG||boybG||cashG||diamondsG||jwelleryG||swordGroup)){
  pcG.destroyEach()
}else if (cashG.isTouching(pcG||lcG||boybG||bpG||diamondsG||jwelleryG||swordGroup)){
  cashG.destroyEach()
}else if (boybG.isTouching(pcG||lcG||bpG||cashG||diamondsG||jwelleryG||swordGroup)){
  boybG.destroyEach()
}else if (diamondsG.isTouching(pcG||lcG||boybG||cashG||bpg||jwelleryG||swordGroup)){
  diamondsG.destroyEach()
}else if (jwelleryG.isTouching(pcG||lcG||boybG||cashG||diamondsG||bpG||swordGroup)){
  jwelleryG.destroyEach()
}
else if ( swordGroup.isTouching(pcG||lcG||boybG||cashG||diamondsG||jwelleryG||bpG)){
swordGroup.destroyEach()
 }else{
      if(swordGroup.isTouching(car)||
      pcG.isTouching(car)||
      bpG.isTouching(car)||
      lcG.isTouching(car)) {
        gameState=END;
        
        car.addAnimation("car1",endImg);
        car.x=width/2;
        car.y=height/2;
        car.scale=0.8;
        
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        boybG.destroyEach();
        pcG.destroyEach()
        bpG.destroyEach()
        lcG.destroyEach()
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        boybG.setVelocityYEach(0);
        pcG.setVelocityYEach(0)
        bpG.setVelocityYEach(0)
        lcG.setVelocityYEach(0)
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 === 0) {
   // Modify the positions of cash 
    var cash = createSprite(Math.round(random(windowWidth,windowHeight),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY =  +(5 + 3* treasureCollection/500)
  cash.lifetime = 1000;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 === 0) {
       // Modify the positions of diamonds 

    var diamonds = createSprite(Math.round(random(width+50,height+800),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY =  +(5 + 3* treasureCollection/500);
  diamonds.lifetime = 1000;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 === 0) {
    //   Modify the positions of jwellery to make them spawn throughout the available screen size.

    var jwellery = createSprite(Math.round(random(width-150, height-300),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = +(5 + 3* treasureCollection/500);
  jwellery.lifetime = 1000;
  jwelleryG.add(jwellery);
  }
}

function createBoyb(){
  if(World.frameCount % 300 === 0){
  var boyb = createSprite(Math.round(random(width+150,height-1500),40,10,10));
  boyb.addImage(boybImg);
  boyb.scale=0.2;
  boyb.velocityY= +(4 + 3* treasureCollection/500);
  boyb.lifetime = 1000;
  boybG.add(boyb);
  
  }
  }

function createSword(){
  if (World.frameCount % 530 === 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var sword = createSprite(Math.round(random(width+50,height- 500),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY =  +(5 + 3* treasureCollection/500);
  sword.lifetime = 1000;
  swordGroup.add(sword);
  }
}

function createPc(){
  if(World.frameCount % 250===0){
    var pc = createSprite(Math.round(random(width+100,height-1000),40,10,10))
    pc.addImage(pcImg)
    pc.scale=0.4
    pc.velocityY = +(6+ 3* treasureCollection/300)
    pc.lifetime = 1000
    pcG.add(pc)
    pc.setCollider("rectangle",0,0,200,600)
    pc.debug = false

  }
}
 
function createBp(){
  if(World.frameCount % 150===0){
  var bp = createSprite(Math.round(random(width+150,height-800),20,20,20))
  bp.addImage(bpImg)
bp.scale=0.4
bp.velocityY = +(3+ 3* treasureCollection/300)
bp.lifetime = 1000
bpG.add(bp)
bp.setCollider("rectangle",0,0,200,400)
bp.debug = false


}}

function createLc(){
  if(World.frameCount % 200===0){
  var lc = createSprite(Math.round(random(width+150,height-700),20,20,20))
  lc.addImage(lcImg)
lc.scale=0.4
lc.velocityY = +(5+ 3* treasureCollection/400)
lc.lifetime = 1000
lcG.add(lc)
lc.setCollider("rectangle",0,0,200,400)
lc.debug = false


}}

















