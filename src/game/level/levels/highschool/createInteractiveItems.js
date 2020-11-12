import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'combo-note',
            x: 25,
            y: 63,
            scale: 10,
            gridSize: gridSize,
            image: require("@/assets/items/locker-note.svg"),
            interact: () => store.commit("addDialogue", { name: 'Note', message: "I am a note" },)
        }),
    ]
}