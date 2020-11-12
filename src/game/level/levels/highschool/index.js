import * as PIXI from 'pixi.js'
import PIXISound from 'pixi-sound';
import colliderContainerFromSvg from '../../utils/colliderContainerFromSvg';

import { Locker, Collectable } from '@/game/items'

import createExtraNPCs from './createExtraNPCs';
import createGirlfriends from './createGirlfriends';
import createCollectables from './createCollectables';
import createKillerItems from './createKillerItems';
import createInteractiveItem from './createInteractiveItems';

export default class {
    constructor(levelManager) {
        this.mapScale = 3;

        this.player = {
            x: 1000,
            y: 2400,
        }

        this.goals = {
            originalGirlfriend: {
                spoken: false,
                collectedItems: false,
                gaveItems: false,
                recievedNotes: false,
                brokeUp: false
            },
            newGirlfriend: {
                name: false, // Potential promdatename
                promDate: false // Girl has accepted you as a prom date
            },
            // Emo
            pine: {
                collectedItems: false,
                gaveItems: false,
                solvedProblem: false,
                rejected: false
            },
            // Blonde
            coco: {
                collectedItems: false,
                gaveItems: false,
                openedLocker: false,
                rejected: false
            },
            // Normie
            pea: {
                collectedItems: false,
                gaveItems: false,
                rejected: false
            }
        }

        this.levelManager = levelManager;

        this.store = levelManager.store;

        // Recieve store mutation events
        const unsubscribe = this.store.subscribe((mutation, state) => {

            // If item was collected
            if (mutation.type == "collectedItem") {

                // Check if user has collected all of Hazel's Items
                if (this.store.state.items.some(item => item.name == "pen")
                    && this.store.state.items.some(item => item.name == "ruler")
                    && this.store.state.items.some(item => item.name == "notes")) {
                    this.goals.originalGirlfriend.collectedItems = true;
                }

                // Check if user has collected all of pines items
                if (this.store.state.items.some(item => item.name == "book")) {
                    this.goals.pine.collectedItems = true;
                }

                // Check if user has collected all of cocos items
                if (this.store.state.items.some(item => item.name == "wallet")
                    && this.store.state.items.some(item => item.name == "phone")) {
                    this.goals.coco.collectedItems = true;
                }

                // Check if user has collected all of peas items
                if (this.store.state.items.some(item => item.name == "basketball")
                    && this.store.state.items.some(item => item.name == "jersey")) {
                    this.goals.pea.collectedItems = true;
                }
            }
            else if (mutation.type == "solvedMathProblem") {
                this.goals.pine.solvedProblem = true;
            }
            else if (mutation.type == "rejected") {
                this.goals.newGirlfriend.name = false;
                this.goals[mutation.payload].rejected = true;
            }
            else if (mutation.type == "chosenPromdate") {
                this.goals.newGirlfriend.promDate = true;
                this.goals.newGirlfriend.name = mutation.payload ?? this.goals.newGirlfriend.name;
            }
            else if (mutation.type == "solvedComboLock") {
                this.goals.coco.openedLocker = true;
                //Open locker
                this.locker.open();
                // Remove combo lock sprite
                this.charactersContainer.removeChild(this.characters.find(x => x.name == 'combo-lock')?.sprite)
                this.characters = this.characters.filter(x => x.name != 'combo-lock')
                // Show Wallet
                const wallet = new Collectable({
                    x: 33, y: 86.5, gridSize: this.gridSize, name: "wallet", image: require("@/assets/items/wallet.svg?data")
                })
                this.items.push(wallet)
                this.itemsContainer.addChild(wallet.sprite);
            }
        })

        // const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/Floors.svg?data"), { scale: this.mapScale });
        // const floorTexture = PIXI.Texture.from(floorResource);
        // this.floor = PIXI.Sprite.from(floorTexture);

        // const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/Walls.svg?data"), { scale: this.mapScale });
        // const wallTexture = PIXI.Texture.from(wallResource);
        // this.walls = PIXI.Sprite.from(wallTexture);

        const schoolResource = new PIXI.resources.SVGResource(require("@/assets/map/school.svg?data"), { scale: this.mapScale });
        const schoolTexture = PIXI.Texture.from(schoolResource);
        this.floor = PIXI.Sprite.from(schoolTexture);

        this.wallColliders = colliderContainerFromSvg(require("!!raw-loader!@/assets/map/school-colliders.svg").default, this.mapScale);

        this.gridSize = 9 * this.mapScale;

        // Locker object that opens
        this.locker = new Locker({ x: 29, y: 83, gridSize: this.gridSize });
        this.locker.close();


        // Main Containers
        this.bottom = new PIXI.Container();
        this.top = new PIXI.Container();

        // Sub containers
        this.itemsContainer = new PIXI.Container();
        this.charactersContainer = new PIXI.Container();

        this.items = [];
        this.characters = [];

        this.objectsWithUpdateFunctions = [];


        this.bottom.addChild(this.floor);
        this.bottom.addChild(this.locker.sprite);

        // this.top.addChild(this.walls);
        this.top.addChild(this.wallColliders);
        this.top.addChild(this.charactersContainer);
        this.top.addChild(this.itemsContainer);

        this.addItems();
        this.addCharacters();

        // Background sound
        this.soundtrack = PIXISound.Sound.from({
            url: require("@/assets/audio/school.mp3"),
            // autoPlay: true,
            volume: 0.25,
            loop: true,
            complete: function () {
                console.log('Sound finished');
            }
        });

        this.boingSound = PIXISound.Sound.from({
            url: require("@/assets/audio/boing.mp3"),
            volume: 0.5,
            preload: true
        });

    }



    addItems() {

        const items = createCollectables(this.gridSize);
        const killers = createKillerItems(this.gridSize);


        this.items = this.items.concat([...items, ...killers])
        this.itemsContainer.addChild(...items.map(item => item.sprite), ...killers.map(item => item.sprite));

        // Add any objects with update functions to our list for inclusion in the main update loop
        this.objectsWithUpdateFunctions = this.objectsWithUpdateFunctions.concat(this.items.filter(item => item.update != undefined))
    }

    addCharacters() {

        const randomNPCs = createExtraNPCs(this.store, this.goals, this.gridSize, this.levelManager)

        const girlfriends = createGirlfriends(this.store, this.goals, this.gridSize, this.levelManager)

        // Interactive Items act like characters for pragmatic reasons
        const interactableItems = createInteractiveItem(this.store, this.goals, this.gridSize, this.levelManager)

        this.characters = this.characters.concat([...girlfriends, ...randomNPCs,
        ...interactableItems
        ])
        this.charactersContainer.addChild(
            ...girlfriends.map(gf => gf.sprite),
            ...randomNPCs.map(npc => npc.sprite),
            ...interactableItems.map(item => item.sprite)
        );
    }

    update(delta) {
        this.objectsWithUpdateFunctions.forEach(object => object.update(delta))
    }

    respawn() {
        this.boingSound.play();
    }


}

