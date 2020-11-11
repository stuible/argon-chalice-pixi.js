import { Collectable } from '@/game/items'

export default function (gridSize) {

    return [
        new Collectable({
            x: 25, y: 80, gridSize: gridSize, name: "pen", image: require("@/assets/items/pen.svg")
        }),
        new Collectable({
            x: 27, y: 40, gridSize: gridSize, name: "basketball", image: require("@/assets/items/basketball.svg")
        }),
        new Collectable({
            x: 92, y: 39, gridSize: gridSize, name: "book", image: require("@/assets/items/book.svg")
        }),
        new Collectable({
            x: 115, y: 45, gridSize: gridSize, name: "paper", image: require("@/assets/items/paper.svg")
        }),
        new Collectable({
            x: 125, y: 70, gridSize: gridSize, name: "phone", image: require("@/assets/items/phone.svg")
        })
    ]

}