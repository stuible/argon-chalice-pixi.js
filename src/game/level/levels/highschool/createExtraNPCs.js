import { NPC } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {
    return [
        new NPC({
            name: 'greenshirtnpc',
            x: 142,
            y: 78,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-1.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Garland', message: "Hey ${player}" },)
        }),
        new NPC({
            name: 'chester',
            x: 73,
            y: 74,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-2.svg?data"),
            interact: () => {
                // If the player doens't have the notes yet
                if (!goals.originalGirlfriend.recievedNotes && goals.originalGirlfriend.spoken) {
                    store.commit("addDialogue", [
                        { name: 'Chester', message: "Oh hey ${player}!  What's up!  How's your gramps doing?" },
                        { name: 'Player', message: "He's dong about the same, still in good spirits though!" },
                        { name: 'Player', message: "~Hey man, Hazel's asked me to grab some notes off of you, would you happen to have them?" },
                        { name: 'Chester', message: "For sure!" },
                        { name: 'Chester', message: " *Hands over notes*" },
                        { action: () => store.commit('collectedItem', { name: "notes", image: require("@/assets/items/paper.svg?data") }) },
                        { name: 'Chester', message: "BTW - How is Hazel? she's been acting a little off lately..." },

                    ])
                    goals.originalGirlfriend.recievedNotes = true;
                }
                // If they do have the notes
                else {
                    store.commit("addDialogue", [
                        { name: 'Chester', message: "Hey ${player}!  Keep on keepin on!" },

                    ])
                }

            }
        }),
        new NPC({
            name: 'whitehoody',
            x: 136,
            y: 76,
            gridSize: gridSize,
            image: require("@/assets/characters/npc-3.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Bobby', message: "Sup yo?" },)
        }),
        new NPC({
            name: 'jane',
            x: 83,
            y: 66.5,
            scale: 0.175,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-1.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Jane', message: "I wonder who dropped that ruler..." },)
        }),
        new NPC({
            name: 'sittingdownmustardshirt',
            x: 105,
            y: 66.5,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-2.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Chloro', message: "Oh Hey ${player}, You see that jersey that someone left out on the tennis courts?" },)
        }),
        new NPC({
            name: 'sittingdownmustardshirtlonghair',
            x: 47.1,
            y: 98.8,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-3.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Bromo', message: "Hmmmmm I have no idea what these symbols mean" },)
        }),
        new NPC({
            name: 'sittingdowngreenshirt',
            x: 100.1,
            y: 88,
            scale: 0.17,
            gridSize: gridSize,
            image: require("@/assets/characters/sitting-student-4.svg?data"),
            interact: () => store.commit("addDialogue", { name: 'Floro', message: "Somebody lost their phone in the drama room, I can't beleive nobody has stolen it yet!" },)
        })
    ]
}