import * as PIXI from 'pixi.js'
import PIXISound from 'pixi-sound';
import colliderContainerFromSvg from '../../utils/colliderContainerFromSvg';

import store from '@/store';

import createExtraNPCs from './createExtraNPCs';
import createGirlfriends from './createGirlfriends';
import createItems from './createItems';

export default class {
    constructor(levelManager) {
        this.mapScale = 3;

        this.player = {
            x: 1000,
            y: 1850,
        }

        this.goals = {
            originalGirlfriend: {
                spoken: false,
                collectedItems: false,
                gaveItems: false,
                brokeUp: false
            },
            newGirlfriend: {
                name: false,
                gaveItems: false,
                collectedItems: false,
                promDate: false
            }
        }

        this.levelManager = levelManager;

        this.store = levelManager.store;

        // Recieve store mutation events
        const unsubscribe = this.store.subscribe((mutation, state) => {

            // If item was collected
            if (mutation.type == "collectedItem") {
                if (this.store.state.items.some(item => item.name == "pen")) this.goals.originalGirlfriend.collectedItems = true;


                if (this.goals.newGirlfriend.name == "pine") {
                    if (this.store.state.items.some(item => item.name == "paper")) this.goals.newGirlfriend.collectedItems = true;
                }
                if (this.goals.newGirlfriend.name == "pea") {
                    if (this.store.state.items.some(item => item.name == "book")) this.goals.newGirlfriend.collectedItems = true;
                }
                if (this.goals.newGirlfriend.name == "coco") {
                    if (this.store.state.items.some(item => item.name == "basketball")) this.goals.newGirlfriend.collectedItems = true;
                }
            }
        })

        const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/Floors.svg"), { scale: this.mapScale });
        const floorTexture = PIXI.Texture.from(floorResource);
        this.floor = PIXI.Sprite.from(floorTexture);

        const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/Walls.svg"), { scale: this.mapScale });
        const wallTexture = PIXI.Texture.from(wallResource);
        this.walls = PIXI.Sprite.from(wallTexture);

        this.wallColliders = colliderContainerFromSvg(require("!!raw-loader!@/assets/map/Walls.svg").default, this.mapScale);

        this.gridSize = 9 * this.mapScale;


        // Main Containers
        this.bottom = new PIXI.Container();
        this.top = new PIXI.Container();

        // Sub containers
        this.itemsContainer = new PIXI.Container();
        this.charactersContainer = new PIXI.Container();

        this.items = [];
        this.characters = [];


        this.bottom.addChild(this.floor);
        this.bottom.addChild(this.itemsContainer);
        this.bottom.addChild(this.charactersContainer);
        this.top.addChild(this.walls);
        this.top.addChild(this.wallColliders);

        this.addItems();
        this.addCharacters();

        // Background sound
        this.soundtrack = PIXISound.Sound.from({
            url: require("@/assets/audio/school.mp3"),
            autoPlay: true,
            volume: 0.25,
            loop: true,
            complete: function () {
                console.log('Sound finished');
            }
        });

    }



    addItems() {

        const items = createItems(this.gridSize);


        this.items = this.items.concat(items)
        this.itemsContainer.addChild(...items.map(item => item.sprite));
    }

    addCharacters() {

        const randomNPCs = createExtraNPCs(this.store, this.goals, this.gridSize, this.levelManager)

        const girlfriends = createGirlfriends(this.store, this.goals, this.gridSize, this.levelManager)

        this.characters = this.characters.concat([...girlfriends, ...randomNPCs])
        this.charactersContainer.addChild(...girlfriends.map(gf => gf.sprite), ...randomNPCs.map(npc => npc.sprite));
    }


}

