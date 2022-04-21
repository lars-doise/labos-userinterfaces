import Drawable from "./Drawable.js"

export default class Food extends Drawable {

    constructor(worldWidth, worldHeight, imageTitle, score, size = 30) {
        super(Math.floor(Math.random() * (worldWidth - size)), Math.floor(Math.random() * (worldHeight - size)), worldWidth, worldHeight);
        this.size = size;
        this.score = score;
        this.image = new Image(imageTitle);
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.src = imageTitle;
    }

    draw(ctxt) {
        if(this.loaded){
            ctxt.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }

    // Simpele methode, maar vraagt meer rekenwerk: ga na of één van de hoekpunten van het huidige object
    // binnen de gegeven rechthoek ligt.
    // Slimmere methode: ga na of voor beide assen (x zowel als y) geldt dat
    // het maximum van de linkerposities kleiner is dan het minimum van de rechterposities.
    // (Dit is de negatie van 'disjunct' zijn:
    // dan is het minimum van de rechterposities kleiner dan het maximum van de linkerposities, voor x of y.)
    intersects(x, y, dx, dy) {
        return Math.max(x, this.x) < Math.min(x + dx, this.x + this.size) && Math.max(y, this.y) < Math.min(y + dy, this.y + this.size);
    }

    toString() {
        return "(" + this.x + "," + this.y + ")";
    }

    reposition() {
        this.x = Math.floor(Math.random() * (this.worldWidth - this.size));
        this.y = Math.floor(Math.random() * (this.worldHeight - this.size));
    }

    loadPropsFromJSON(json){
        this.x = json["x"];
        this.y = json["y"];
        this.score = json["score"];
        this.size = json["size"];
    }
}