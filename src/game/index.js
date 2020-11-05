import * as PIXI from 'pixi.js'
import keyboard from './controls/keyboard'

import Level from './level'

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
    let spacebar = keyboard(" ");

    // Camera
    const camera = new Camera(app);

    // Map
    const level = new Level("hospital", store);
    // const level = new Level("prom", store);

    // Player
    const player = level.player;

    // Add elements to stage
    app.stage.addChild(level.bottom);
    app.stage.addChild(player.hitbox); // Hitbox has to be added to the stage in order for collition detection to work (aparently)
    app.stage.addChild(level.top);
    app.stage.addChild(player.sprite);

    // Setup callack function for spacebar (Main action button)
    spacebar.press = () => {
        console.log("Pressed space bar")
        if (!store.state.gameStarted) return

        if (store.state.dialog.length > 0) {
            store.commit("nextDialog");
            return;
        }

        level.action();
    }

    app.ticker.add((delta) => {

        if (store.state.gamePaused || !store.state.gameStarted) return;

        // Follow player with "camera"
        camera.moveToward(player);

        // Let level know this is a new frame
        level.update(delta);

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