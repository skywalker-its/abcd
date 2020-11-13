var play=1;
var end=0;
var serve=2;
var gamestate=serve;
var back,backimg,back2img;
var player,playerimg;
var invig;
var enemygroup,enemyimg;
var kills,killsimg;
var kills2;
var bulletimg,bullet,bulletgroup;
var releasebullet;
var backsound,killingsound;
function preload(){
  backimg=loadImage("backimg.png");
  playerimg=loadAnimation("20201111_135222.png","20201111_135414.png","20201111_135451.png","20201111_135551.png","20201111_135638.png","20201111_135805.png","20201111_135855.png","20201111_140033.png","20201111_140119.png","20201111_140156.png","20201111_140227.png","20201111_140357.png","20201111_140443.png");
  back2img=loadImage("back2.png")
  enemyimg=loadImage("20201111_132025.png");
  killsimg=loadImage("lh72f11p5jo31.png");
  bulletimg=loadImage("20201111_162241.png");
 // backsound=loadSound("AudioCutter_Bazanji - Fed Up (Remix No Copyright Music) [South America Trap].mp3");
  
}
function setup(){
  createCanvas(600,600);
  back=createSprite(200,300,600,600);
  back.addImage(backimg);
  back.scale=0.8;
  
  player=createSprite(70,440,600,600);
  player.addAnimation("running",playerimg);
  player.scale=0.25;
  
  kills=createSprite(350,50,10,10);
  kills.addImage(killsimg);
  kills.scale=0.03;
  invig=createSprite(300,520,600,15);
  
  kills2=0;
  enemygroup= new Group();
  bulletgroup=new Group();
}
function draw(){
 
  if(gamestate===serve){
   background("black");
   back.visible=false;
   player.visible=false;
   invig.visible=false;
   kills.visible=false;
   textSize(10);
   fill("cyan");
   text("YOU HAVE ONLY 2 LIVES TRY TO SURVIVE FOR LONG.PRESS SPACE TO JUMP AND K TO SHOOT.PRESS R TO PLAY.",10,300);
   if(keyDown("r")){
     gamestate=play;
   }
   
 }else if(gamestate===play){
  back.visible=true;
   player.visible=true;
   kills.visible=true;
   back.velocityX=-3;
   
  if(back.x<0){
    var img=Math.round(random(1,2));
    switch(img){
      case 1:back.addImage(back2img);
        break; 
        
        
    }
    
    back.x=200;
  }
   if(keyDown("space")&&player.y>=380){
     player.velocityY=-12;
   }
   player.velocityY=player.velocityY+0.8;
  player.collide(invig);
  invig.visible=false;
  spawnenemy();
  if(keyDown("k")){
   releasebullet=createbullet();
  }
  if (bulletgroup.isTouching(enemygroup)){
    kills2=kills2+1;
    enemygroup.destroyEach();
    bulletgroup.destroyEach();
    
  } 
   
  if(enemygroup.isTouching(player)) {
    gamestate=end;
  }
   
 } else if(gamestate===end){
   out();
 }
   
  
 
   drawSprites();
  textSize(20);
  text("KILLS:     "+kills2,450,30);
}





function spawnenemy(){
  if(frameCount%250===0){
    enemy=createSprite(400,470,10,10);
    enemy.addImage(enemyimg);
    enemy.scale=0.2;
    enemy.x=Math.round(random(450,500));
    enemy.velocityX=-2;
    enemy.lifetime=300;
    enemy.collide(invig);
    enemygroup.add(enemy);
  }
}

function createbullet(){
  bullet=createSprite(80,100,20,20);
  bullet.scale=0.04;
  bullet.velocityX=3;
  bullet.addImage(bulletimg);
  bullet.y=player.y;
  bulletgroup.add(bullet);
}

function out(){
  gamestate=end;
  background("blue");
  player.visible=false;
  enemygroup.visible=false;
  back.visible=false;
  enemygroup.destroyEach();
  player.destroy();
  back.destroy();
  kills.destroy();
  fill("red");
  text("SORRY YOU DIDN'T GOT CHICKEN DINNER",100,300);
}