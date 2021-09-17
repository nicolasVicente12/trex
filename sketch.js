var trex;
var trexCorrendo;
var solo;
var imagemsolo;
var soloInvisivel;
var nuvem;
var nuvemImagem;
var pulo,morreu,checkPoint
var obstaculo;
var pontos=0;
var estado='jogar';
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6
var grupodeobstaculos,grupodenuvens;
var restarte,gameOver
var restarteImagem
var gameOverImagem

function reiniciar(){
  pontos=0
  estado='jogar'
  gameOver.visible=false
  restarte.visible=false
  
  grupodeobstaculos.destroyEach()
  grupodenuvens.destroyEach()
}


function criaNuvens() {
 
  if(frameCount%60===0){
 nuvem=createSprite(600,50,40,10)
         nuvem.velocityX=-3
nuvem.addImage(nuvemImagem)
 nuvem.y=   Math.round(random(10, 50));
    nuvem.depth= trex.depth
    trex.depth=trex.depth+1
   grupodenuvens.add(nuvem)
  }
  
}

function criaObstaculos() {
 
  if(frameCount%60===0){
 obstaculo=createSprite(600,172,10,50)
         obstaculo.velocityX=-(6+pontos/100)
         obstaculo.scale=0.7;
    grupodeobstaculos.add(obstaculo)
var numero=   Math.round(random(1, 6));  
    switch(numero){
      case 1: obstaculo.addImage(obstaculo1)    
        break 
          case 2: obstaculo.addImage(obstaculo2)    
        break
          case 3: obstaculo.addImage(obstaculo3)    
        break
          case 4: obstaculo.addImage(obstaculo4)    
        break
          case 5: obstaculo.addImage(obstaculo5)    
        break
          case 6: obstaculo.addImage(obstaculo6)    
        break
        default:break
        
  }  
        
     }
}

function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagemsolo=loadAnimation('ground2.png');
  nuvemImagem=loadImage('cloud.png')
  
  obstaculo1=loadImage('obstacle1.png');
  obstaculo2=loadImage('obstacle2.png');
  obstaculo3=loadImage('obstacle3.png');
  obstaculo4=loadImage('obstacle4.png');
  obstaculo5=loadImage('obstacle5.png');
  obstaculo6=loadImage('obstacle6.png');
  
  restarteImagem=loadImage('restart.png')
    gameOverImagem=loadImage('gameOver.png')
  
  pulo=loadSound('jump.mp3')
  morreu=loadSound('die.mp3')
  checkPoint=loadSound('checkPoint.mp3')
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.scale = 0.9; 
  trex.setCollider('circle',0,0,40)

  solo= createSprite(300,185,600,30)
  solo.addAnimation('solomovento',imagemsolo);
  
  soloInvisivel=createSprite(300,200,600,20);
  soloInvisivel.visible=false;
  
  var aleatorio = Math.round(random(1, 50));
  console.log(aleatorio);
  
  grupodeobstaculos=new Group()
  grupodenuvens=new Group()
  gameOver=createSprite(300,90,20,20)
  gameOver.addImage(gameOverImagem)
  gameOver.visible=false;
  restarte=createSprite(300,120,20,20)
  restarte.addImage(restarteImagem)
  restarte.visible=false
}
function draw(){
  background("white");
  
 text('pontuçao: '+pontos,30,20)  

  
 if(estado==='jogar') {
      pontos=pontos+Math.round(frameRate()/60);
     solo.velocityX=-(6+pontos/100)
     if(solo.x<0){
    solo.x=solo.width /2;
  }
   if (keyDown("space") && trex.y>70 ) {
    trex.velocityY = -12;
     pulo.play()
    }
  criaNuvens();
  criaObstaculos(); 
    if(grupodeobstaculos.isTouching(trex)){
  estado='perder'; 
      morreu.play()
       }
   
   if(pontos%100===0){
   checkPoint.play()
 }
 } else if(estado==='perder') {
   solo.velocityX=0
   
   grupodeobstaculos.setVelocityXEach(0)
      grupodenuvens.setVelocityXEach(0)

gameOver.visible=true
  restarte.visible=true
   
   if (mousePressedOver(restarte)){
 reiniciar()      
       }
 }
  
   trex.velocityY = trex.velocityY + 2;
  trex.collide(soloInvisivel);
  drawSprites();
}