import * as PIXI from 'pixi.js'
import keyboard from './controls/keyboard'

import Map from './map'

import { Player } from './sprites';

import Camera from './camera';

export default function (store) {
    const app = new PIXI.Application({
        // width: 1080,
        // height: 720,
        resizeTo: document.querySelector('#game'),
        backgroundColor: 0xffffff,
        // view: document.querySelector('#game')
    });

    store.commit("addDialogue", { name: 'Josh', question: "This is a question", answers: [
        {
            answer: "Right",
            action: () => console.log("You answered Right")
        },
        {
            answer: "Wrong",
            action: () => console.log("You answered Wrong")
        }
    ] })
    store.commit("addDialogue", { name: 'Josh', message: "heheheheheeh" })
    store.commit("addDialogue", [
        { name: 'Josh', message: "It's me again heheheheheeh" },
        { name: 'Josh', message: "Still me heheheheheeh!!!!!!!!!!" },
        { name: 'Josh', message: "Okay last time" },
        { name: 'John', message: "I'm actually Josh in disguise" },
    ])


    //Key Inputs
    let downKey = keyboard("ArrowDown");
    let upKey = keyboard("ArrowUp");
    let leftKey = keyboard("ArrowLeft");
    let rightKey = keyboard("ArrowRight");
    let spacebar = keyboard(" ");

    // Camera
    const camera = new Camera(app);

    // Map
    const map = new Map();

    // Player
    const player = new Player({ speed: 3, state: store.state, walls: map.wallColliders.children });

    // Add elements to stage
    app.stage.addChild(map.bottom);
    app.stage.addChild(player.sprite);
    app.stage.addChild(player.hitbox); // Hitbox has to be added to the stage in order for collition detection to work (aparently)
    app.stage.addChild(map.top);

    // Setup callack function for spacebar (Main action button)
    spacebar.press = () => {
        console.log("Pressed space bar")
        store.commit("nextDialog");
    }

    app.ticker.add((delta) => {

        if (store.state.paused || !store.state.gameStarted) return;

        // Follow player with "camera"
        camera.moveToward(player);

        // Let player know this is a new frame
        player.update(delta, store.state.playerSpeed);

        // let playerClone = player.hitbox;

        if (downKey.isDown) {
            player.move("down");
        }
        if (upKey.isDown) {
            player.move("up");
        }
        if (leftKey.isDown) {
            player.move("left");
        }
        if (rightKey.isDown) {
            player.move("right");
        }

    });

    return app;
}