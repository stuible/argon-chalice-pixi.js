import * as PIXI from 'pixi.js'
import keyboard from './controls/keyboard'

import { Player, Antlion } from './sprites';

import Camera from './camera';

export default function (store) {
    const app = new PIXI.Application({
        // width: 1080,
        // height: 720,
        resizeTo: document.querySelector('#game'),
        backgroundColor: 0xffffff,
        // view: document.querySelector('#game')
    });


    //Key Inputs
    let downKey = keyboard("ArrowDown");
    let upKey = keyboard("ArrowUp");
    let leftKey = keyboard("ArrowLeft");
    let rightKey = keyboard("ArrowRight");

    // Camera
    const camera = new Camera(app);

    // Player
    const player = new Player({ speed: store.state.playerSpeed, state: store.state });

    // Add elements to stage
    app.stage.addChild(player.sprite);
    app.stage.addChild(player.hitbox); // Hitbox has to be added to the stage in order for collition detection to work (aparently)

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