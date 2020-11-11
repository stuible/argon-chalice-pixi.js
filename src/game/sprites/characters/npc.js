import * as PIXI from 'pixi.js'

export default class {
    constructor({ x, y, gridSize, name, image, interact, scale }) {

        const spriteResource = new PIXI.resources.SVGResource(image, { scale: scale ?? 1 });
        const spriteTexture = PIXI.Texture.from(spriteResource);

        this.image = image;
        this.sprite = PIXI.Sprite.from(spriteTexture);
        // const aspectRatio = this.sprite.width / this.sprite.height;
        this.sprite.scale.set(1);
        // this.sprite.width = this.sprite.width * (scale ?? 1);
        // this.sprite.height = this.sprite.height * (scale ?? 1);
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