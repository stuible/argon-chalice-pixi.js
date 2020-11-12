import { Collectable } from '@/game/items'

export default function (gridSize) {

    return [
        new Collectable({
            x: 39, y: 98.5, gridSize: gridSize, name: "pen", image: require("@/assets/items/pen.svg?data")
        }),
        new Collectable({
            x: 62, y: 98, gridSize: gridSize, name: "ruler", image: require("@/assets/items/ruler.svg?data")
        }),
        new Collectable({
            x: 27, y: 40, gridSize: gridSize, name: "basketball", image: require("@/assets/items/basketball.svg?data")
        }),
        new Collectable({
            x: 92, y: 39, gridSize: gridSize, name: "book", image: require("@/assets/items/book.svg?data")
        }),
        new Collectable({
            x: 115, y: 45, gridSize: gridSize, name: "paper", image: require("@/assets/items/paper.svg?data")
        }),
        new Collectable({
            x: 125, y: 70, gridSize: gridSize, name: "phone", image: require("@/assets/items/phone.svg?data")
        }),
        new Collectable({
            x: 27, y: 70, gridSize: gridSize, name: "jersey", image: require("@/assets/items/jersey.svg?data")
        })
    ]

}