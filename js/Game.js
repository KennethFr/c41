class Game{
    constructor(){

    }
    getState(){
        var gameRef=database.ref('gameState')
        gameRef.on('value',(data)=>{
            gameState=data.val()
        })
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })
    }
    async start(){
        if(gameState===0){
            player=new Player()
            var playerref=await database.ref('playerCount').once('value')
            if (playerref.exists()){
                playerCount=playerref.val()
                player.getCount()
            }
            form= new Form()
            form.display()
        }
        car1=createSprite(100,200)
        car1.addImage(carImg1)
        car2=createSprite(200,200)
        car2.addImage(carImg2)
        car3=createSprite(300,200)
        car3.addImage(carImg3)
        car4=createSprite(400,200)
        car4.addImage(carImg4)
        cars=[car1,car2,car3,car4]
    }
    play(){
        form.hide()
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
        textSize(30)
        Player.getPlayerInfo()
        player.getFinishedPlayers()
        if (allPlayers!==undefined){
            var position=100
            var x=220;
            var y=0;
            var index=0;
            for(var plr in allPlayers){
                index=index+1;
                x=x+220;
                y=displayHeight-allPlayers[plr].distance;
                cars[index-1].x=x
                cars[index-1].y=y
                if (plr==='player'+player.index){
                    cars[index-1].shapeColor="blue"
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y
                    fill('red')
                    ellipse(x,y,80,100)
                }else{
                    fill('black')
                }
                  text (allPlayers[plr].name+ ':'+allPlayers[plr].distance,cars[index-1].x,cars[index-1].y+80)
//                position+=50
            }
        }
        if (player.distance>4400 && finishedPlayer<=4 && flag===false){
//            gameState=2
            Player.updateFinishedPlayers()
            player.rank=finishedPlayer
            player.update()
            flag=true;
        }
        if (keyIsDown(UP_ARROW)&& player.index!==null && flag===false){
            player.distance+=30
            player.update()
        }
        drawSprites();
    }
    end(){
        console.log("You Reached The Finish Line")
        background(scoreImg)
        camera.position.x=0
        camera.position.y=0
        textSize(30)
        fill("black")
        text("You Reached The Finish Line",0,0)
        Player.getPlayerInfo()
        for(var plr in allPlayers){
            fill('black')
            if (allPlayers[plr].rank===1){
                text("First Place Is :"+ allPlayers[plr].name,0,50)
            }
            if (allPlayers[plr].rank===2){
                text("Second Place Is :"+ allPlayers[plr].name,0,100)
            }
            if (allPlayers[plr].rank===3){
                text("Third Place Is :"+ allPlayers[plr].name,0,150)
            }
            if (allPlayers[plr].rank===4){
                text("Fourth Place Is :"+ allPlayers[plr].name,0,200)
            }
        }
    }
}