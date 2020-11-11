import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'student',
            x: 34,
            y: 68,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-1.svg"),
            interact: () => store.commit("addDialogue", { name: 'Student', message: "Sup" },)
        }),
        new NPC({
            name: 'student',
            x: 72,
            y: 52,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-2.svg"),
            interact: () => store.commit("addDialogue", { name: 'Johnny', message: "Sup" },)
        }),
        new NPC({
            name: 'student',
            x: 45,
            y: 68,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-3.svg"),
            interact: () => store.commit("addDialogue", { name: 'Bobby', message: "Sup" },)
        }),
        new NPC({
            name: 'jane',
            x: 39,
            y: 78,
            scale: 0.175,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-1.svg"),
            interact: () => store.commit("addDialogue", { name: 'Jane', message: "..." },)
        })
    ]
}