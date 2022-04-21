import Drawable from "./Drawable.js"
import Block from "./Block.js"

export default class Snake extends Drawable {
    constructor(worldWidth, worldHeight) {
        // x en y best veelvouden van size van blok !!
        // omdat dit niet makkelijk/leesbaar op te vragen is in één regeltje, x en y opnieuw instellen na super()
        super(0, 0, worldWidth, worldHeight);
        this.blocksize = 20;
        this.x = this.blocksize * Math.floor((worldWidth / 4 + (Math.random() * worldWidth / 2)) / this.blocksize);
        this.y = this.blocksize * Math.floor((worldHeight / 4 + (Math.random() * worldHeight / 2)) / this.blocksize);
        this.body = [];
        for (let i = 0; i < 5; i++) {
            this.body.push(new Block(this.x, this.y, worldWidth, worldHeight, this.blocksize));
        }
        this.dx = 0;
        this.dy = 0;
        let keuze = Math.random();
        if (keuze < 0.5) {
            this.dx = (Math.floor(Math.random()) * 2 - 1) * this.blocksize;
        } else {
            this.dy = (Math.floor(Math.random()) * 2 - 1) * this.blocksize;
        }
        //this.move();
        // We bewegen de snake al 1 stap vooruit; anders zou 'intersectsSelf' ons van in het begin parten spelen!
        // Tenzij dit gebeurt in de gameloop VOOR er getest wordt op intersectsSelf, dan hoeft 'this.move()' er niet te staan.
    }

    // let op! dx en dy hebben hier al rekening gehouden met this.blocksize; dus zijn veelvoud van this.blocksize

    draw(ctxt) {
        for (let bl of this.body) {  // "in" is voor "index"!!! gebruik "of"!
            bl.draw(ctxt);
        }
    }

    // als snake aan de rand komt, zal ze crashen -> wordt elders gecontroleerd
    move() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        this.body[0].x += this.dx;
        this.body[0].y += this.dy;
        this.x = this.body[0].x;
        this.y = this.body[0].y;
    }


    setDirection(dx, dy) {
        if (dx * this.dx >= 0 && dy * this.dy >= 0) {
            this.dx = this.blocksize * dx;
            this.dy = this.blocksize * dy;
        }
    }

    // laat de slang ACHTERAAN groeien, anders heb je last met 'intersectsSelf' !!
    grow(number = 5) {
        let index = this.body.length - 1;
        for (let i = 0; i < number; i++) {
            this.body.push(new Block(this.body[index].x, this.body[index].y, this.worldWidth, this.worldHeight));
        }
    }

    intersectsSelf() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    crashesIntoWall() {
        return this.body[0].x < 0 || this.body[0].x >= this.worldWidth || this.body[0].y < 0 || this.body[0].y >= this.worldHeight;
    }

    loadPropsFromJSON(json) {
        this.worldWidth = json["worldWidth"];
        this.worldHeight = json["worldHeight"];
        this.blocksize = json["blocksize"];
        this.dx = json["dx"];
        this.dy = json["dy"];
        this.x = json["x"];
        this.y = json["y"];

        // if the snake of the saved game is longer than the current snake, blocks need to be added
        // if the snake of the saved game is shorter thatn the current snake, blocks need to removed
        while(json["body"].length > this.body.length){
            this.body.push(new Block(0, 0, this.worldWidth, this.worldHeight, this.blocksize));
        }
        while(json["body"].length < this.body.length){
            this.body.pop();
        }

        for (let i = 0; i < json["body"].length; i++) {
            this.body[i].x = json["body"][i].x;
            this.body[i].y = json["body"][i].y;
            this.body[i].wordlWidth = json["body"][i].wordlWidth;
            this.body[i].worldHeight = json["body"][i].worldHeight;
            this.body[i].size = json["body"][i].size;
        }
    }
}