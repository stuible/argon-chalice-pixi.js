import * as PIXI from 'pixi.js'

export default class {
    constructor({ startX, startY, endX, gridSize, speed }) {
        this.startX = startX < endX ? startX * gridSize : endX * gridSize;
        this.endX = startX < endX ? endX * gridSize : startX * gridSize;
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.sprite.width = gridSize * 1;
        this.sprite.height = gridSize * 1;
        this.sprite.x = startX * gridSize;
        this.sprite.y = startY * gridSize;
        this.name = "dodgeball";
        this.sprite.tint = 0xFF0000;

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