import * as PIXI from 'pixi.js'

export default class {
    constructor({ gridSize, x, y }) {


        const spriteResource = new PIXI.resources.SVGResource(require("@/assets/items/openlocker.svg?data"), { height: gridSize * 4.4 });
        const spriteTexture = PIXI.Texture.from(spriteResource);

        this.sprite = PIXI.Sprite.from(spriteTexture);
        this.sprite.x = x * gridSize;
        this.sprite.y = y * gridSize;
        this.name = "locker";



    }

    get type() {
        return "locker"
    }

    open() {
        this.sprite.visible = true;
    }

    close() {
        this.sprite.visible = false;
    }



}