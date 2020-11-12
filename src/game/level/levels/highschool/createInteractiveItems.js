import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'combo-note',
            x: 25,
            y: 63,
            scale: 10,
            gridSize: gridSize,
            image: require("@/assets/items/locker-note.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Note', message: "It says: 36-26-14.  I wonder what it means?" },)
        }),
    ]
}