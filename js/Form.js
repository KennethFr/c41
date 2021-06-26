class Form{
    constructor(){
    this.title = createElement('h1');
    this.input = createInput("Enter Name")
    this.button = createButton("Start");
    this.greeting = createElement('h1');
    this.reset = createButton("restart")
    } 
    hide(){
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }
    display(){
        this.title.position(displayWidth/2,50);
        this.title.style("font-size",'50px')
        this.title.style('color',"magenta")
        this.title.html('Car Racing Game');
        this.input.position(displayWidth/2,displayHeight/2);
        this.input.style('background',"teal")
        this.reset.position(displayWidth-100,50)
        this.button.position(displayWidth/2+50,displayHeight/2+100);
        this.button.mousePressed(()=>{
            player.name = this.input.value();
            this.input.hide()
            this.button.hide()
            playerCount+=1
            player.index=playerCount
            player.update()
            player.updateCount(playerCount)
            this.greeting.position(displayWidth/2,displayHeight/2-200)
            this.greeting.html("Welcome "+ player.name)
        })
        this.reset.mousePressed(()=>{
            database.ref('/').set({
                gameState:0,
                playerCount:0,
                players:null,
                finishedPlayer:0
            })
        })
    }
}