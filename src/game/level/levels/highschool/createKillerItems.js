import { Item, Dodgeball } from '@/game/items'

export default function (gridSize) {

    return [
        new Dodgeball({
            startX: 21, startY: 50, endX: 48, gridSize: gridSize,  speed: 7
        }),
        new Dodgeball({
            startX: 21, startY: 54, endX: 48, gridSize: gridSize,  speed: 8.1
        }),
    ]

}