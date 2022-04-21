import Drawable from "./Drawable.js"

export default class Block extends Drawable {
    constructor(x, y, worldWidth, worldHeight, blockSize = 20) {
        super(x, y, worldWidth, worldHeight);
        this.size = blockSize;
    }

    draw(ctxt) {
        ctxt.fillRect(this.x, this.y, this.size, this.size);
    }

}