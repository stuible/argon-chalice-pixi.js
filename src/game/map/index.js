import * as PIXI from 'pixi.js'
import { parse } from 'svg-parser';
import parseSvgTransform from '../helpers/parseSvgTransform';

export default class {
    constructor() {
        this.mapScale = 3;

        const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/Floor.svg"), { scale: this.mapScale });
        const floorTexture = PIXI.Texture.from(floorResource);
        this.floor = PIXI.Sprite.from(floorTexture);

        const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/Walls.svg"), { scale: this.mapScale });
        const wallTexture = PIXI.Texture.from(wallResource);
        this.walls = PIXI.Sprite.from(wallTexture);

        this.wallColliders = this.generateCollidersFromSvg();

        this.gridSize = 9 * this.mapScale;


        this.bottom = new PIXI.Container();
        this.top = new PIXI.Container();


        this.bottom.addChild(this.floor);
        this.top.addChild(this.walls);
        this.top.addChild(this.wallColliders);

    }

    generateCollidersFromSvg() {
        const wallColliderContainer = new PIXI.Container();
        let wallSvgString = require("!!raw-loader!@/assets/map/Walls.svg").default
        //console.log(wallSvgString)
        const parsedSvg = parse(wallSvgString);
        //console.log(parsedSvg.children[0].children)
        const svgElements = parsedSvg.children[0].children;
        const svgRects = svgElements.filter(element => element.tagName == "rect")
        // console.log(svgRects)

        svgRects.forEach(rect => {
            const wall = PIXI.Sprite.from(PIXI.Texture.WHITE);
            wall.width = rect.properties.width * this.mapScale;
            wall.height = rect.properties.height * this.mapScale;
            wall.y = rect.properties.y * this.mapScale;
            wall.x = rect.properties.x * this.mapScale;
            wall.tint = 0xFF0000;

            if (rect.properties.transform) {

                const rectTransform = parseSvgTransform(rect.properties.transform);
                console.log(rectTransform)

                if (rectTransform.translate) {
                    // console.log(rectTransform.translate)
                    // wall.x += rectTransform.translate[0] * this.mapScale
                    // wall.y += rectTransform.translate[1] * this.mapScale

                    wall.tint = 0x00FF00;
                    // console.log(wall)
                }

                if (rectTransform.rotate) {
                    if (rectTransform.rotate == 90) {
                        // wall.anchor.set(0.5);
                        wall.width = rect.properties.height * this.mapScale;
                        wall.height = rect.properties.width * this.mapScale;
                        wall.x = (rect.properties.x * this.mapScale) + ((rect.properties.width * this.mapScale) / 2) - ((rect.properties.height * this.mapScale) / 2);
                        wall.y = (rect.properties.y * this.mapScale) - ((rect.properties.width * this.mapScale) / 2) + ((rect.properties.height * this.mapScale) / 2);;
                    }
                    else {
                        console.error("Unhandled Rotation")
                        return
                    }

                }
                // return
            }
            // else return

            wall.visible = false;
            wallColliderContainer.addChild(wall);
        })

        return wallColliderContainer;
    }
}