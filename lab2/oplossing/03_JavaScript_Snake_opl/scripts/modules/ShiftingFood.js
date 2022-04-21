import Food from "./Food.js"

export default class ShiftingFood extends Food {
    constructor(worldWidth, worldHeight, imageTitle, score, size = 30, move_freq = 100) {
        super(worldWidth, worldHeight, imageTitle, score, size);

        this.move_freq = move_freq;
        this.updateDirection();
    }

    draw(ctxt){
        // check if food has reached the border
        if(this.dx !== 0){
            if(this.x <= this.size){
                this.dx = 1;
            }
            else if(this.x >= (this.worldWidth - this.size)){
                this.dx = -1;
            }
        }
        else if(this.dy !== 0){
            if(this.y <= this.size){
                this.dy = 1;
            }
            else if(this.y >= (this.worldHeight - this.size)){
                this.dy = -1;
            }
        }

        // move the food
        this.x += this.dx * (this.size / 2);
        this.y += this.dy * (this.size / 2);

        super.draw(ctxt);
    }

    reposition() {
        super.reposition();
        this.updateDirection();
    }

    updateDirection(){
        this.dx = 0;
        this.dy = 0;

        // get a random direction
        let keuze = Math.random();
        if(keuze < 0.25){
            this.dx = 1;
        }
        else if(keuze < 0.5){
            this.dx = -1;
        }
        else if(keuze < 0.75){
            this.dy = 1;
        }
        else{
            this.dy = -1;
        }
    }

    loadPropsFromJSON(json){
        super.loadPropsFromJSON(json);
        this.dx = json["dx"];
        this.dy = json["dy"];
    }
}