import * as PIXI from 'pixi.js'
import colliderContainerFromSvg from '../utils/colliderContainerFromSvg';

import { Thing, Collectable } from '../../items'
import { Person, Hazelnut, Pine, Coco, Pea } from '../../sprites'
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
                collectedItems: false,
                complete: false
            }
        }

        this.store = levelManager.store;

        // Recieve store mutation events
        const unsubscribe = this.store.subscribe((mutation, state) => {
            // If item was collected
            if (mutation.type == "collectedItem") {
                if (this.store.state.items.some(item => item.name == "pen")) this.goals.originalGirlfriend.collectedItems = true;
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
        // const item = new Thing({
        //     x: 25, y: 42, gridSize: this.gridSize, interact: () => {
        //         console.log("you are near the thing")
        //     }
        // })
        // this.items.push(item);
        // this.itemsContainer.addChild(item.sprite);

        const pen = new Collectable({
            x: 25, y: 80, gridSize: this.gridSize, name: "pen", image: require("@/assets/items/pen.svg")
        })
        const basketball = new Collectable({
            x: 27, y: 80, gridSize: this.gridSize, name: "basketball", image: require("@/assets/items/basketball.svg")
        })
        const book = new Collectable({
            x: 29, y: 80, gridSize: this.gridSize, name: "book", image: require("@/assets/items/book.svg")
        })
        const paper = new Collectable({
            x: 105, y: 80, gridSize: this.gridSize, name: "paper", image: require("@/assets/items/paper.svg")
        })
        const phone = new Collectable({
            x: 25, y: 50, gridSize: this.gridSize, name: "phone", image: require("@/assets/items/phone.svg")
        })


        this.items = this.items.concat([pen, basketball, book, paper, phone])
        this.itemsContainer.addChild(pen.sprite, basketball.sprite, book.sprite, paper.sprite, phone.sprite);
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
                        { name: 'Hazel', message: "Good morning ${player}. Hope your Saturday was fun.  Without me." },
                        { name: 'Hazel', message: "… I’m not mad really, I just wished we spent more time together, y’know? We’ve already been dating for a week and I-- I don’t know, I feel a bit neglected ?" },
                        { name: '${player}', message: "I’m sorry, Hazel but I let you know that I visit my grandfather every weekend.We can always go out together after or on Sundays?" },
                        { name: 'Hazel', message: "Well... actuall... Can you get me a few things ? It’s small things, I promise!" },
                        {
                            name: 'Hazel', question: "Can you collect them for me ? So I know you’re willing to do things for me ?", answers: [
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
                        { name: 'Hazel', message: "Yay! It’s not much! Can you get me a pen, a ruler and Wally’s notes? I know you guys are best friends and I forgot to take my own 3: so that’s why I’m asking you!" },
                        { action: () => this.goals.originalGirlfriend.spoken = true }
                    ])
                }
                else if (!this.goals.originalGirlfriend.collectedItems) {
                    store.commit("addDialogue", { name: 'Hazel', message: "Thank you for offering to find a PEN for me :)" },);
                }
                else if (this.goals.originalGirlfriend.collectedItems) {
                    store.commit("addDialogue", [
                        { name: 'Hazel', message: "OMG Thank you so much for the pen!" },
                        {
                            action: () => {
                                store.commit("removeItem", "pen")
                                this.goals.originalGirlfriend.complete = true;
                            }
                        }
                    ]);
                }

            }
        })

        this.characters.push(hazelnut);
        this.charactersContainer.addChild(hazelnut.sprite);

        const pine = new Pine({
            x: 50, y: 68, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.complete) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "Hey ${player}, you still dating Hazel?" }
                    ]);
                }

            }
        })
        this.characters.push(pine);
        this.charactersContainer.addChild(pine.sprite);

        const coco = new Coco({
            x: 55, y: 58, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.complete) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "Hi ${player}! Are you really still dating Hazel???????" }
                    ]);
                }
            }
        })
        this.characters.push(coco);
        this.charactersContainer.addChild(coco.sprite);


        const pea = new Pea({
            x: 86, y: 53, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.complete) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "Hi ${player}! I hope you're having a great day!" }
                    ]);
                }
            }
        })
        this.characters.push(pea);
        this.charactersContainer.addChild(pea.sprite);
    }


}

