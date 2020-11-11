import * as PIXI from 'pixi.js'

export default class {
    constructor({ x, y, gridSize, name, image, interact }) {
        this.image = image;
        this.sprite = PIXI.Sprite.from(image);
        // const aspectRatio = this.sprite.width / this.sprite.height;
        this.sprite.scale.set(1);
        // this.sprite.width = gridSize * 1.5;
        // this.sprite.height = (gridSize * 1.5) / aspectRatio;
        this.sprite.y = y * gridSize;
        this.sprite.x = x * gridSize;
        this.name = name;
        
        this.interact = interact ? interact : () => undefined;

    }

    // collected(store) {
    //     console.log({ name: this.name, image: this.image })
    //     store.commit('collectedItem', { name: this.name, image: this.image });
    // }

    // get type() {
    //     return "collectable"
    // }

}