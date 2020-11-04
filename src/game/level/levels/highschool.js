import * as PIXI from 'pixi.js'
import colliderContainerFromSvg from '../utils/colliderContainerFromSvg';

import { Thing, Collectable } from '../../items'
import { Person, Hazelnut } from '../../sprites'
import store from '../../../store';

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
                collectedItems: false
            }
        }

        this.store = levelManager.store;

        // Recieve store mutation events
        const unsubscribe = this.store.subscribe((mutation, state) => {
            // If item was collected
            if (mutation.type == "collectedItem") {
                if (this.store.state.items.some(item => item.name = "pen")) this.goals.originalGirlfriend.collectedItems = true;
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

    }



    addItems() {
        const item = new Thing({
            x: 25, y: 42, gridSize: this.gridSize, interact: () => {
                console.log("you are near the thing")
            }
        })
        this.items.push(item);
        this.itemsContainer.addChild(item.sprite);

        const pen = new Collectable({
            x: 25, y: 80, gridSize: this.gridSize, name: "pen", image: require("@/assets/items/pen.svg")
        })
        this.items.push(pen);
        this.itemsContainer.addChild(pen.sprite);
    }

    addCharacters() {
        const person = new Person({ x: 30, y: 45, gridSize: this.gridSize })

        person.interact = () => {
            store.commit("addDialogue", { name: 'Bob', message: "Hi!  I'm Bob, the purple square!" })
        }

        this.characters.push(person);
        this.charactersContainer.addChild(person.sprite);


        const hazelnut = new Hazelnut({
            x: 31, y: 68, gridSize: this.gridSize, interact: () => {

                if (!this.goals.originalGirlfriend.spoken && !this.goals.originalGirlfriend.collectedItems) {
                    store.commit("addDialogue", [
                        { name: 'Hazelnut', message: "Good morning[p]~~~Hope your Saturday was fun.Without me." },
                        { name: 'Hazelnut', message: "… I’m not mad really, I just wished we spent more time together, y’know ? We’ve already been dating for a week and I-- I don’t know, I feel a bit neglected ?" },
                        { name: 'Player', message: "I’m sorry, [Girlfriend] but I let you know that I visit my grandfather every weekend.We can always go out together after or on Sundays?" },
                        { name: 'Hazelnut', message: "Well… act~ually~~~Can you get me a few things ? It’s small things, I promise!" },
                        {
                            name: 'Hazelnut', question: "Can you collect them for me ? So I know you’re willing to do things for me ?", answers: [
                                {
                                    answer: "Of course!",
                                    action: () => console.log("You answered Right")
                                },
                                {
                                    answer: "What kind of things? ",
                                    action: () => console.log("You answered Wrong")
                                }
                            ]
                        },
                        { name: 'Hazelnut', message: "Yay! It’s not much! Can you get me a pen, a ruler and Wally’s notes? I know you guys are best friends and I forgot to take my own 3: so that’s why I’m asking you!" },
                        { action: () => this.goals.originalGirlfriend.spoken = true }
                    ])
                }
                else if (!this.goals.originalGirlfriend.collectedItems) {
                    store.commit("addDialogue", { name: 'Hazelnut', message: "Thank you for offering to find a PEN for me :)" },);
                }
                else if (this.goals.originalGirlfriend.collectedItems){
                    store.commit("addDialogue", { name: 'Hazelnut', message: "OMG Thank you so much for the pen!" },);
                }

            }
        })

        this.characters.push(hazelnut);
        this.charactersContainer.addChild(hazelnut.sprite);
    }


}

