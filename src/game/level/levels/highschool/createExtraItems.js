import { Item } from '@/game/items'

export default function (gridSize) {

    return [
        new Item({
            x: 25, y: 80, gridSize: gridSize, name: "pen", image: require("@/assets/items/pen.svg")
        }),
    ]

}