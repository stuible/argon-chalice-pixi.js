import { Item, Dodgeball } from '@/game/items'

export default function (gridSize) {

    return [
        new Dodgeball({
            startX: 21, startY: 70, endX: 49, gridSize: gridSize,  speed: 7
        }),
        new Dodgeball({
            startX: 21, startY: 72, endX: 49, gridSize: gridSize,  speed: 8.1
        }),
        new Dodgeball({
            startX: 21, startY: 74, endX: 49, gridSize: gridSize,  speed: 12.3
        }),
        new Dodgeball({
            startX: 21, startY: 75.2, endX: 49, gridSize: gridSize,  speed: 12.9
        }),
    ]

}