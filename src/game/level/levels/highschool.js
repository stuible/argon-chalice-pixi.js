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

                if (this.store.state.items.some(item => item.name == "pen"))

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
            x: 27, y: 40, gridSize: this.gridSize, name: "basketball", image: require("@/assets/items/basketball.svg")
        })
        const book = new Collectable({
            x: 92, y: 39, gridSize: this.gridSize, name: "book", image: require("@/assets/items/book.svg")
        })
        const paper = new Collectable({
            x: 115, y: 45, gridSize: this.gridSize, name: "paper", image: require("@/assets/items/paper.svg")
        })
        const phone = new Collectable({
            x: 125, y: 70, gridSize: this.gridSize, name: "phone", image: require("@/assets/items/phone.svg")
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
                        { name: 'Hazel', message: "It’s not much! Can you get me a pen !? I totally forgot mine so that’s why I’m asking you!" },
                        { action: () => this.goals.originalGirlfriend.spoken = true }
                    ])
                }
                else if (!this.goals.originalGirlfriend.collectedItems) {
                    store.commit("addDialogue", { name: 'Hazel', message: "Thank you for offering to find a PEN for me :)" },);
                }
                else if (this.goals.originalGirlfriend.collectedItems && !this.goals.originalGirlfriend.brokeUp) {
                    store.commit("addDialogue", [
                        { name: 'Hazel', message: "OMG Thank you so much for the pen!" },
                        {
                            action: () => {
                                store.commit("removeItem", "pen")
                                this.goals.originalGirlfriend.gaveItems = true;
                            }
                        },
                        { name: 'Hazel', message: "I was thinking about it last night and I realize you don’t really care about me… We should break up. You only get stuff for me when I ask you to? You never show initiative! We’re over!" },
                        {
                            action: () => {
                                this.goals.originalGirlfriend.brokeUp = true;
                            }
                        },
                    ]);
                }
                else if (this.goals.originalGirlfriend.brokeUp) {
                    store.commit("addDialogue", { name: 'Hazel', message: "Let's give eachother some space, I don't want to talk right now..." },);
                }

            }
        })

        this.characters.push(hazelnut);
        this.charactersContainer.addChild(hazelnut.sprite);

        const pine = new Pine({
            x: 50, y: 68, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.brokeUp) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "Hey ${player}, you still dating Hazel?" }
                    ]);
                }
                else if (this.goals.originalGirlfriend.brokeUp && !this.goals.newGirlfriend.name) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "Oh hey, ${player}! Rumor has it you and Hazel broke up.  I'm so sorry" },
                        {
                            name: 'Pine', question: "Would you want to hang out some time?", answers: [
                                {
                                    answer: "Sure Pine!",
                                    action: () => {
                                        this.goals.newGirlfriend.name = 'pine'
                                        store.commit("addDialogue", [
                                            { name: 'Pine', message: "OMG Cool, see you soon!!!" },
                                            { name: 'Pine', message: "BTW, I'm missing my paper that's due after lunch, I really need to find it" },
                                            { name: 'Pine', message: "Have you seen it!?" },
                                        ]);
                                    }
                                },
                                {
                                    answer: "I'm pretty busy but I'll let you know",
                                    action: () => {
                                        store.commit("addDialogue", [
                                            { name: 'Pine', message: "Aww okay... see you around then." }
                                        ]);
                                    }
                                }
                            ]
                        },
                    ]);
                }
                else if (this.goals.newGirlfriend.name == 'pine') {
                    if (!this.goals.newGirlfriend.collectedItems) {
                        store.commit("addDialogue", [
                            { name: 'Pine', message: "I really need to find that missing paper!!!!!!" },
                        ]);
                    }
                    else if (this.goals.newGirlfriend.collectedItems && !this.goals.newGirlfriend.gaveItems) {
                        store.commit("addDialogue", [
                            { name: 'Pine', message: "OMG THANK YOU, Let's go to Prom!" },
                            {
                                action: () => {
                                    this.goals.newGirlfriend.gaveItems = true
                                    this.goals.newGirlfriend.promDate = true
                                    this.levelManager.load('prom')
                                }
                            },
                        ]);
                    }

                }

            }
        })
        this.characters.push(pine);
        this.charactersContainer.addChild(pine.sprite);

        const coco = new Coco({
            x: 55, y: 58, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.brokeUp) {
                    store.commit("addDialogue", [
                        { name: 'Coco', message: "Hi ${player}! Are you really still dating Hazel???????" }
                    ]);
                }
                else if (!this.goals.newGirlfriend.name) {
                    store.commit("addDialogue", [

                        {
                            name: 'Coco', question: "${player}! It must be tough for you right now, want to hang out?", answers: [
                                {
                                    answer: "Sure Coco!",
                                    action: () => {
                                        this.goals.newGirlfriend.name = 'coco'
                                        store.commit("addDialogue", [
                                            { name: 'Coco', message: "Amazing!!!!!, see you soon!!! <3" },
                                            { name: 'Pea', message: "BTW, Have you seen my basketball?  It means a lot to me and I can't find it!" },
                                        ]);
                                    }
                                },
                                {
                                    answer: "I'm pretty busy but I'll let you know",
                                    action: () => {
                                        store.commit("addDialogue", [
                                            { name: 'Coco', message: "Really?? That sucks... see you around then..." }
                                        ]);
                                    }
                                }
                            ]
                        },
                    ]);
                }
                else if (this.goals.newGirlfriend.name == 'coco') {
                    if (!this.goals.newGirlfriend.collectedItems) {
                        store.commit("addDialogue", [
                            { name: 'Coco', message: "I really need to find my basketball!!!!!!" },
                        ]);
                    }
                    else if (this.goals.newGirlfriend.collectedItems && !this.goals.newGirlfriend.gaveItems) {
                        store.commit("addDialogue", [
                            { name: 'Coco', message: "OMG THANK YOU, Let's go to Prom!" },
                            {
                                action: () => {
                                    this.goals.newGirlfriend.gaveItems = true
                                    this.goals.newGirlfriend.promDate = true
                                    this.levelManager.load('prom')
                                }
                            },
                        ]);
                    }

                }
            }
        })
        this.characters.push(coco);
        this.charactersContainer.addChild(coco.sprite);


        const pea = new Pea({
            x: 86, y: 53, gridSize: this.gridSize, interact: () => {
                if (!this.goals.originalGirlfriend.brokeUp) {
                    store.commit("addDialogue", [
                        { name: 'Pea', message: "Hi ${player}! I hope you're having a great day!" }
                    ]);
                }
                else if (!this.goals.newGirlfriend.name) {
                    store.commit("addDialogue", [

                        {
                            name: 'Pea', question: "${player}!! I herad about hazel, that sucks, want to chill?", answers: [
                                {
                                    answer: "OK Pea!",
                                    action: () => {
                                        this.goals.newGirlfriend.name = 'pea'
                                        store.commit("addDialogue", [
                                            { name: 'Pea', message: "YESSSSSS!!!! I can't wait!!!!!!!" },
                                            { name: 'Pea', message: "BTW, could you please get find my book?  I have no idea where i left it!" },
                                            {
                                                // action: () => this.goals.originalGirlfriend.brokeUp = true
                                            }
                                        ]);
                                    }
                                },
                                {
                                    answer: "I'm a little busy but maybe later",
                                    action: () => {
                                        store.commit("addDialogue", [
                                            { name: 'Pea', message: ":(((((((((((((((((((" }
                                        ]);
                                    }
                                }
                            ]
                        },
                    ]);
                }
                else if (this.goals.newGirlfriend.name == 'pea') {

                    if (!this.goals.newGirlfriend.collectedItems) {
                        store.commit("addDialogue", [
                            { name: 'Pea', message: "I really need to find my Book!  Where is it!?" },
                        ]);
                    }
                    else if (this.goals.newGirlfriend.collectedItems && !this.goals.newGirlfriend.gaveItems) {
                        store.commit("addDialogue", [
                            { name: 'Pea', message: "OMG THANK YOU, Let's go to Prom!" },
                            {
                                action: () => {
                                    this.goals.newGirlfriend.gaveItems = true
                                    this.goals.newGirlfriend.promDate = true
                                    this.levelManager.load('prom')
                                }
                            },
                        ]);
                    }
                }
            }
        })
        this.characters.push(pea);
        this.charactersContainer.addChild(pea.sprite);
    }


}

