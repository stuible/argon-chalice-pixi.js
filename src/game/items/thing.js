import * as PIXI from 'pixi.js'

export default class {
    constructor({x, y, gridSize, interact}) {
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.sprite.width = gridSize * 2;
        this.sprite.height = gridSize * 2;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        this.sprite.tint = 0xFF0000;

        this.interact = interact ? interact : () => undefined;
    }
}