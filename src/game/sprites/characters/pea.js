import * as PIXI from 'pixi.js'

export default class {
    constructor({x, y, gridSize, interact}) {
        this.sprite = PIXI.Sprite.from(require("@/assets/characters/pea.svg"));
        // this.sprite.width = gridSize * 2;
        // this.sprite.height = gridSize * 2;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        //this.sprite.tint = 0xFF00FF;

        this.interact = interact ? interact : () => undefined;
    }

}