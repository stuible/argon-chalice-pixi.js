import * as PIXI from 'pixi.js'

export default class {
    constructor({x, y, gridSize, interact}) {
        this.sprite = PIXI.Sprite.from(require("@/assets/characters/hazelnut.svg?data"));
        // this.sprite.width = gridSize * 2;
        // this.sprite.height = gridSize * 2;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        //this.sprite.tint = 0xFF00FF;

        // let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

        this.interact = interact ? interact : () => undefined;
    }

}