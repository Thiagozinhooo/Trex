var play=1;
var jogando=play;
var dnd=0;
var obstaculos1,obstaculos2,obstaculos3,obstaculos4,obstaculos5;
var clouds,cloudsMoving
var soloInv;
var solo,soloImage
var trex ,trex_running ,trexCollided;
var groupNuvens;
var groupCactos;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadAnimation("trex_collided.png");
  soloImage = loadImage("ground2.png");
  cloudsMoving = loadImage("cloud.png");
  obstaculos1 = loadImage("obstacle1.png");
  obstaculos2 = loadImage("obstacle2.png");
  obstaculos3 = loadImage("obstacle3.png");
  obstaculos4 = loadImage("obstacle4.png");
  obstaculos5 = loadImage("obstacle5.png");
  obstaculos6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);

  groupCactos=new Group();

  groupNuvens=new Group();
  
  solo = createSprite(300,195,600,20);
  solo.addImage("ground", soloImage);
  solo.velocityX = -5;
  solo.x=solo.width/2;
  soloInv = createSprite(200,200,600,3);
  soloInv.visible=false;

  trex = createSprite(50,190,600,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morto", trexCollided);
  trex.scale = 0.5; 
}

function draw(){ 
  background("gWhite")

  if(jogando===play){
    trex.changeAnimation("running", trex_running);
    if(solo.x<0){
      solo.x=solo.width/2;

    }
 
    if(keyDown ("space")&&trex.y>=170){
     trex.velocityY=-10

    }

    nuvens();

    cactos();

    trex.velocityY=trex.velocityY+0.8;

   trex.collide (soloInv);

   if(groupCactos.isTouching(trex)){
     jogando=end;
   }
  }

  else if(jogando===end){
    solo.velocityX=0;

    trex.velocityY=0;
    trex.changeAnimation("morto",trexCollided);

    groupNuvens.setLifetimeEach(-1);
    groupNuvens.setVelocityXEach(0);

    groupCactos.setLifetimeEach(-1);
    groupCactos.setLifetimeEach(0);
  }

  drawSprites();
}



function nuvens(){

  if(frameCount%60===0){
    clouds = createSprite(600,20,10,10);
    clouds.addImage ("cloud", cloudsMoving);
    clouds.scale = 0.5;
    clouds.velocityX=-2;
    clouds.y=Math.round(random(20,150));
    trex.depth=clouds.depth;
    trex.depth=trex.depth+1;
    clouds.lifetime=350;
    groupNuvens.add(clouds);
  }
}

function cactos(){
  
  if(frameCount%60===0){
    var obstaculo = createSprite(600,175,10,10);
    obstaculo.velocityX=-5;
    var sorteio = Math.round(random(1,6));
    switch(sorteio){
      case 1: obstaculo.addImage(obstaculos1);
        break;
      case 2: obstaculo.addImage(obstaculos2);
        break;
      case 3: obstaculo.addImage(obstaculos3);
        break;
      case 4: obstaculo.addImage(obstaculos4);
        break;
      case 5: obstaculo.addImage(obstaculos5);
        break;
      case 6: obstaculo.addImage(obstaculos6);
        break;
    
      default:break;
    }
  obstaculo.scale=0.6;
  obstaculo.lifetime=300;
  groupCactos.add(obstaculo);
  }
}