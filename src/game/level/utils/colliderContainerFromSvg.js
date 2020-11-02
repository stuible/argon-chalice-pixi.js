import * as PIXI from 'pixi.js'
import { parse } from 'svg-parser'
import parseSvgTransform from './parseSvgTransform';

export default function(svgString, scale = 1) {
    const wallColliderContainer = new PIXI.Container();
    let wallSvgString = svgString
    //console.log(wallSvgString)
    const parsedSvg = parse(wallSvgString);
    //console.log(parsedSvg.children[0].children)
    const svgElements = parsedSvg.children[0].children;
    const svgRects = svgElements.filter(element => element.tagName == "rect")
    // console.log(svgRects)

    svgRects.forEach(rect => {
        const wall = PIXI.Sprite.from(PIXI.Texture.WHITE);
        wall.width = rect.properties.width * scale;
        wall.height = rect.properties.height * scale;
        wall.y = rect.properties.y * scale;
        wall.x = rect.properties.x * scale;
        wall.tint = 0xFF0000;

        if (rect.properties.transform) {

            const rectTransform = parseSvgTransform(rect.properties.transform);
            console.log(rectTransform)

            // This doesn't seem to matter so it's ignored for now
            if (rectTransform.translate) {
                // console.log(rectTransform.translate)
                // wall.x += rectTransform.translate[0] * this.mapScale
                // wall.y += rectTransform.translate[1] * this.mapScale

                //wall.tint = 0x00FF00;
                // console.log(wall)
            }

            if (rectTransform.rotate) {
                if (rectTransform.rotate == 90) {
                    // wall.anchor.set(0.5);
                    wall.width = rect.properties.height * scale;
                    wall.height = rect.properties.width * scale;
                    wall.x = (rect.properties.x * scale) + ((rect.properties.width * scale) / 2) - ((rect.properties.height * scale) / 2);
                    wall.y = (rect.properties.y * scale) - ((rect.properties.width * scale) / 2) + ((rect.properties.height * scale) / 2);;
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