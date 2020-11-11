import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'student',
            x: 34,
            y: 68,
            gridSize: gridSize,
            image: require("@/assets/characters/coco.svg"),
            interact: () => console.log("lol")
        })
    ]
}