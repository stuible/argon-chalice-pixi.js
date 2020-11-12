import * as PIXI from 'pixi.js'

export default class {
    constructor({ x, y, gridSize, name, image, }) {

        const spriteResource = new PIXI.resources.SVGResource(image, { height: gridSize, width: gridSize });
        const spriteTexture = PIXI.Texture.from(spriteResource);

        this.image = image;
        this.sprite = PIXI.Sprite.from(spriteTexture);
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        this.name = name;
        // this.sprite.tint = 0xFF0000;

    }

    collected(store) {
        // console.log({ name: this.name, image: this.image })
        store.commit('collectedItem', { name: this.name, image: this.image });
    }

    get type() {
        return "collectable"
    }

}