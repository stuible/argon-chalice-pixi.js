import { Highschool, Hospital } from './levels';
import { Player } from '../sprites';

import * as PIXI from 'pixi.js'

export default class {
    constructor(levelName, store) {
        this.store = store;
        this.level;
        this.top = new PIXI.Container();
        this.bottom = new PIXI.Container();

        this.player = new Player({
            speed: 3,
            state: store.state,
            walls: this.level?.wallColliders ? level.level.wallColliders.children : []
        });

        // If game has alread been started, load the level
        if (this.store.state.gameStarted) this.load(levelName)

        // Recieve store mutation events
        const unsubscribe = this.store.subscribe((mutation, state) => {
            // If game is being started, load the level
            if (mutation.type == "startGame") {
                this.load(levelName)
            }
        })
    }

    // Main update loop function
    update(delta) {
        this.player.update(delta);

        // Check if player is near any items
        for (const [index, item] of this.level.items.entries()) {
            if (this.player.isTouching(item.sprite)) {
                // If item is a collectable, collect and remove it
                if (item.type == "collectable") {
                    //let store know we collected an item
                    item.collected(this.store);
                    // Remove item
                    this.removeItem(index)
                    break;
                }
            }
        }

    }

    // User initiated action (pressed action button)
    action() {
        this.level.characters.forEach(character => {
            if (this.player.isNear(character.sprite)) {
                character.interact();
            }
        })
    }

    // Loads new level
    load(levelName) {
        if (levelName == 'hospital') {
            this.destoyLevel();
            this.level = new Hospital(this);
            this.updatePlayer();
            this.top.addChild(this.level.top);
            this.bottom.addChild(this.level.bottom);

        }
        else if (levelName == 'highschool') {
            this.destoyLevel();
            this.level = new Highschool(this);
            this.updatePlayer();
            this.top.addChild(this.level.top);
            this.bottom.addChild(this.level.bottom);
        }
    }

    destoyLevel() {
        while (this.top.children[0]) {
            this.top.removeChild(this.top.children[0]);
        }
        while (this.bottom.children[0]) {
            this.bottom.removeChild(this.bottom.children[0]);
        }
    }

    updatePlayer() {
        // Update player Walls
        this.player.walls = this.level?.wallColliders?.children ? this.level.wallColliders.children : []
        // Update Player position
        this.player.x = this.level?.player?.x ? this.level?.player?.x : this.player.x;
        this.player.y = this.level?.player?.y ? this.level?.player?.y : this.player.y;
    }

    removeItem(index) {
        const item = this.level.items[index].sprite;
        this.level.itemsContainer.removeChild(item);
        this.level.items.splice(index, 1);
    }


}