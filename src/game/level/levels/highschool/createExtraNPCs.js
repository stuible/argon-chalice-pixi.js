import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'greenshirtnpc',
            x: 73,
            y: 60,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-1.svg"),
            interact: () => store.commit("addDialogue", { name: 'Garland', message: "Hey ${player}" },)
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
            name: 'whitehoody',
            x: 45,
            y: 68,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-3.svg"),
            interact: () => store.commit("addDialogue", { name: 'Bobby', message: "Sup yo?" },)
        }),
        new NPC({
            name: 'jane',
            x: 39,
            y: 78,
            scale: 0.175,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-1.svg"),
            interact: () => store.commit("addDialogue", { name: 'Jane', message: "..." },)
        }),
        new NPC({
            name: 'sittingdownmustardshirt',
            x: 43,
            y: 81,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-2.svg"),
            interact: () => store.commit("addDialogue", { name: 'Chloro', message: "Little busy right busy right now ${player}, talk later?" },)
        }),
        new NPC({
            name: 'sittingdownmustardshirt',
            x: 80,
            y: 40,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-3.svg"),
            interact: () => store.commit("addDialogue", { name: 'Bromo', message: "Hmmmmm I have no idea what these symbols mean" },)
        }),
        new NPC({
            name: 'sittingdownmustardshirt',
            x: 78,
            y: 44,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-4.svg"),
            interact: () => store.commit("addDialogue", { name: 'Floro', message: "I'm soooo lost" },)
        })
    ]
}