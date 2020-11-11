import * as PIXI from 'pixi.js'

export default class {
    constructor({ x, y, gridSize, name, image }) {
        this.image = image;
        this.sprite = PIXI.Sprite.from(image);
        const aspectRatio = this.sprite.width / this.sprite.height;
        this.sprite.width = gridSize * 1;
        this.sprite.height = (gridSize * 1) / aspectRatio;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        this.name = name;
        // this.sprite.tint = 0xFF0000;

    }

    get type() {
        return "object"
    }

}