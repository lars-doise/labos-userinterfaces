import Food from "./Food.js"

export default class MovingFood extends Food {
    constructor(worldWidth, worldHeight, imageTitle, score, size = 30, move_freq = 25) {
        super(worldWidth, worldHeight, imageTitle, score, size);

        this.move_freq = move_freq;
        this.move_counter = 0;
    }

    draw(ctxt) {
        if (++this.move_counter === this.move_freq) {
            this.move_counter = 0;
            this.reposition();
        }
        super.draw(ctxt);
    }

}