import * as PIXI from 'pixi.js'

export default class {
    constructor({ startX, startY, endX, gridSize, speed }) {
        this.startX = startX < endX ? startX * gridSize : endX * gridSize;
        this.endX = startX < endX ? endX * gridSize : startX * gridSize;


        const spriteResource = new PIXI.resources.SVGResource(require("@/assets/items/dodgeball.svg?data"), { height: gridSize * 1.3, width: gridSize * 1.3 });
        const spriteTexture = PIXI.Texture.from(spriteResource);

        this.sprite = PIXI.Sprite.from(spriteTexture);
        this.sprite.x = startX * gridSize;
        this.sprite.y = startY * gridSize;
        this.name = "dodgeball";

        this.speed = speed ?? 5;

        this.direction = startX < endX ? "right" : "left"

    }

    get type() {
        return "killer"
    }

    update() {
        if (this.direction == "right") this.sprite.x += this.speed;
        else if (this.direction == "left") this.sprite.x -= this.speed;

        // console.log(this.endX)
        // console.log(this.sprite.x)

        if (this.sprite.x < this.startX) this.direction = "right"
        if (this.sprite.x > this.endX) this.direction = "left"
    }

}