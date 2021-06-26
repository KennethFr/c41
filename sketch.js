var database;
var form,player,game;
var gameState=0;
var playerCount=0;
var allPlayers=[]
var car1,car2,car3,car4,cars;
var carImg1,carImg2,carImg3,carImg4;
var trackImg;
var finishedPlayer=0;
var flag=false;
var scoreImg;

function setup(){
  createCanvas(displayWidth,displayHeight);
  database=firebase.database();
  game=new Game()
  game.getState()
  game.start() 
}
function preload(){
  welcomeImg=loadImage('Welcome.jpg')
  carImg1=loadImage('car1.png')
  carImg2=loadImage('car2.png')
  carImg3=loadImage('car3.png')
  carImg4=loadImage('car4.png')
  trackImg=loadImage('track.jpg')
  scoreImg=loadImage('Score.png')
}

function draw(){
  background(welcomeImg)
if (playerCount===4 && finishedPlayer===0){
  game.update(1)
}
if (gameState===1){
  clear()
  game.play()
}
if (finishedPlayer===4){
  game.update(2)
}
if (gameState===2 && finishedPlayer===4){
  game.end()
}
}