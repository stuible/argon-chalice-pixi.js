import * as PIXI from 'pixi.js'

export default class {
    constructor({ x, y, gridSize, name, image }) {
        this.image = image;
        this.sprite = PIXI.Sprite.from(image);
        this.sprite.width = gridSize * 1;
        this.sprite.height = gridSize * 1;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        this.name = name;
        // this.sprite.tint = 0xFF0000;

    }

    collected(store) {
        console.log({ name: this.name, image: this.image })
        store.commit('collectedItem', { name: this.name, image: this.image });
    }

    get type() {
        return "collectable"
    }

}