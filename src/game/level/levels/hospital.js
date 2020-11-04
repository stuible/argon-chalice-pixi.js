import * as PIXI from 'pixi.js'
import colliderContainerFromSvg from '../utils/colliderContainerFromSvg';

import { Thing } from '../../items'
import { Person } from '../../sprites'

export default class {
    constructor(levelManager) {
        this.levelManager = levelManager;
        this.mapScale = 3;

        this.player = {
            x: 500,
            y: 300,
        }

        // const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/Floor.svg"), { scale: this.mapScale });
        const floorTexture = PIXI.Texture.from(require("@/assets/map/Hospital.jpg"));
        this.floor = PIXI.Sprite.from(floorTexture);

        // const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/Walls.svg"), { scale: this.mapScale });
        // const wallTexture = PIXI.Texture.from(wallResource);
        // this.walls = PIXI.Sprite.from(wallTexture);

        // this.wallColliders = colliderContainerFromSvg(require("!!raw-loader!@/assets/map/Walls.svg").default, this.mapScale);

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
        // this.bottom.addChild(this.itemsContainer);
        // this.bottom.addChild(this.charactersContainer);
        // this.top.addChild(this.walls);
        // this.top.addChild(this.wallColliders);

        // this.addItems();
        // this.addCharacters();
        this.addDialog();

    }

    addItems() {
        const item = new Thing({ x: 25, y: 42, gridSize: this.gridSize })
        this.items.push(item);
        this.itemsContainer.addChild(item.sprite);
    }

    addCharacters() {
        const person = new Person({ x: 30, y: 45, gridSize: this.gridSize })

        person.interact = () => {
            store.commit("addDialogue", { name: 'Bob', message: "Hi!  I'm Bob, the purple square!" })
        }

        this.characters.push(person);
        this.charactersContainer.addChild(person.sprite);
    }

    addDialog() {
        this.levelManager.store.commit("addDialogue", [
            {
                name: '${player}',
                message: `Hi Grandpa! How’re you feeling? I ran into the nurse earlier and she told me to ask you about it. 
                Mom made you some soup so if you can hold it down, take a sip?`
            },
            {
                name: 'Grandpa',
                message: `it’s looking grim. I still got some fight left in me. I won’t kick the bucket just yet!`
            },
            {
                name: 'Grandpa',
                message: `By the way isn’t this your last year in high school?`
            },
            {
                name: '${player}',
                message: `*Nods*`
            },
            {
                name: 'Grandpa',
                message: `Grandpa: I wish I finished high school… I was drafted to fight in the army, you know. 
                Lost a lot of my youth there…. Say, \${player}, can you fulfill one of my wishes?`
            },
            {
                name: 'Grandpa', question: "Can you enjoy your high school prom with a partner for me? Take a few photographs…. Take someone out… ", answers: [
                    {
                        answer: "Yes",
                        action: () => console.log("You answered Right")
                    },
                    {
                        answer: "Of Course!",
                        action: () => console.log("You answered Wrong")
                    }
                ]
            },
            {
                name: '${player}',
                message: `Of course Grandpa. It’s not a problem, I actually have a girlfriend, you just haven’t met her yet! 
                Prom’s in a week so look forward to my stories!`
            },
            { name: 'Grampa', action: () => { this.levelManager.load('highschool') } }
        ])


    }


}