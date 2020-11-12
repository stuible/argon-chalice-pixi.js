import * as PIXI from 'pixi.js'
import PIXISound from 'pixi-sound'
import colliderContainerFromSvg from '../utils/colliderContainerFromSvg';

import { Hazelnut, Pine, Coco, Pea } from '@/game/sprites'

export default class {
    constructor(levelManager) {
        this.levelManager = levelManager;
        this.store = levelManager.store;
        this.mapScale = 3;

        this.player = {
            x: 850,
            y: 525,
        }

        const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/prom.svg"), { scale: 1.5 });
        const floorTexture = PIXI.Texture.from(floorResource);
        this.floor = PIXI.Sprite.from(floorTexture);

        // const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/hospital/hospital-walls.svg"), { scale: this.mapScale });
        // const wallTexture = PIXI.Texture.from(wallResource);
        // this.walls = PIXI.Sprite.from(wallTexture);

        // const itemsResource = new PIXI.resources.SVGResource(require("@/assets/map/hospital/hospital-items.svg"), { scale: this.mapScale });
        // const itemsTexture = PIXI.Texture.from(itemsResource);
        // this.itemSpirte = PIXI.Sprite.from(itemsTexture);

        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.anchor.set(0.5)
        this.background.width = 5000;
        this.background.height = 5000;
        this.background.tint = 0x103E0E;

        // this.wallColliders = colliderContainerFromSvg(require("!!raw-loader!@/assets/map/hospital/hospital-colliders.svg").default, this.mapScale);

        this.gridSize = 9 * this.mapScale;


        // Main Containers
        this.bottom = new PIXI.Container();
        this.top = new PIXI.Container();

        // Sub containers
        this.itemsContainer = new PIXI.Container();
        this.charactersContainer = new PIXI.Container();

        this.items = [];
        this.characters = [];

        this.bottom.addChild(this.background);
        this.bottom.addChild(this.floor);
        // this.bottom.addChild(this.itemSpirte);
        // this.bottom.addChild(this.itemsContainer);
        this.bottom.addChild(this.charactersContainer);
        // this.top.addChild(this.walls);
        // this.top.addChild(this.wallColliders);

        // this.addItems();
        this.addCharacters();
        this.addDialog();

        // Background sound
        this.soundtrack = PIXISound.Sound.from({
            url: require("@/assets/audio/prom_2.mp3"),
            autoPlay: true,
            volume: 0.25,
            loop: true,
            complete: function () {
                console.log('Sound finished');
            }
        });

    }

    update(delta) {

    }

    addItems() {
        // const item = new Thing({ x: 25, y: 42, gridSize: this.gridSize })
        // this.items.push(item);
        // this.itemsContainer.addChild(item.sprite);
    }

    addCharacters() {
        Pine, Coco, Pea
        if (this.store.state.promDate == 'pine') {
            const pine = new Pine({
                x: 32, y: 18, gridSize: this.gridSize
            })
            this.charactersContainer.addChild(pine.sprite);
        }
        else if (this.store.state.promDate == 'coco') {
            const coco = new Coco({
                x: 32, y: 18, gridSize: this.gridSize
            })
            this.charactersContainer.addChild(coco.sprite);
        }
        else if (this.store.state.promDate == 'pea') {
            const pea = new Pea({
                x: 32, y: 18, gridSize: this.gridSize
            })
            this.charactersContainer.addChild(pea.sprite);
        }
    }

    addDialog() {
        this.levelManager.store.commit("addDialogue", [
            {
                name: 'Principal Nut',
                message: `Welcome to Prom Everybody`
            },
            {
                name: this.store.state.promDate,
                message: `What a special night 💝`
            },
            {
                name: 'Grandpa Wal',
                message: "I'm so proud of you ${player}!  That is a very nice girlfrield you have!"
            },
            {
                name: '${player}',
                message: `Thank you Gramps, her name is ${this.store.state.promDate}`
            },
            {
                name: 'Grandpa Wal',
                message: "And a great name indeed!!!"
            },
            {
                name: 'THE END',
                message: ``
            },
            {
                action: () => this.generateEndingMessage()
            }
        ])


    }

    generateEndingMessage() {
        return this.levelManager.store.commit("addDialogue", [{
            name: 'THE END',
            message: ``
        },
        {
            action: () => this.generateEndingMessage()
        }])
    }


}