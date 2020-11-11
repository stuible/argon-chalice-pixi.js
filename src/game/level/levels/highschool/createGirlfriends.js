import { Hazelnut, Pine, Coco, Pea } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {

    // -------------------------------------
    // HAZEL
    // -------------------------------------

    const hazelnut = new Hazelnut({
        x: 31, y: 68, gridSize: gridSize, interact: () => {

            if (!goals.originalGirlfriend.spoken && !goals.originalGirlfriend.collectedItems) {
                store.commit("addDialogue", [
                    { name: 'Hazel', message: "Good morning ${player}. Hope your Saturday was fun.  Without me." },
                    { name: 'Hazel', message: "… I’m not mad really, I just wished we spent more time together, y’know? We’ve already been dating for a week and I-- I don’t know, I feel a bit neglected ?" },
                    { name: '${player}', message: "I’m sorry, Hazel but I let you know that I visit my grandfather every weekend.We can always go out together after or on Sundays?" },
                    { name: 'Hazel', message: "Well... actuall... Can you get me a few things ? It’s small things, I promise!" },
                    {
                        name: 'Hazel', question: "Can you collect them for me ? So I know you’re willing to do things for me ?", answers: [
                            {
                                answer: "Of course!",
                                action: () => console.log("You answered Right")
                            },
                            {
                                answer: "What kind of things? ",
                                action: () => console.log("You answered Wrong")
                            }
                        ]
                    },
                    { name: 'Hazel', message: "It’s not much! Can you get me a pen !? I totally forgot mine so that’s why I’m asking you!" },
                    { action: () => goals.originalGirlfriend.spoken = true }
                ])
            }
            else if (!goals.originalGirlfriend.collectedItems) {
                store.commit("addDialogue", { name: 'Hazel', message: "Thank you for offering to find a PEN for me :)" },);
            }
            else if (goals.originalGirlfriend.collectedItems && !goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Hazel', message: "OMG Thank you so much for the pen!" },
                    {
                        action: () => {
                            store.commit("removeItem", "pen")
                            goals.originalGirlfriend.gaveItems = true;
                        }
                    },
                    { name: 'Hazel', message: "I was thinking about it last night and I realize you don’t really care about me… We should break up. You only get stuff for me when I ask you to? You never show initiative! We’re over!" },
                    {
                        action: () => {
                            goals.originalGirlfriend.brokeUp = true;
                        }
                    },
                ]);
            }
            else if (goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", { name: 'Hazel', message: "Let's give eachother some space, I don't want to talk right now..." },);
            }

        }
    })

    // -------------------------------------
    // PINE
    // -------------------------------------

    const pine = new Pine({
        x: 50, y: 68, gridSize: gridSize, interact: () => {
            if (!goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Pine', message: "Hey ${player}, you still dating Hazel?" }
                ]);
            }
            else if (goals.originalGirlfriend.brokeUp && !goals.newGirlfriend.name) {
                store.commit("addDialogue", [
                    { name: 'Pine', message: "Oh hey, ${player}! Rumor has it you and Hazel broke up.  I'm so sorry" },
                    {
                        name: 'Pine', question: "Would you want to hang out some time?", answers: [
                            {
                                answer: "Sure Pine!",
                                action: () => {
                                    goals.newGirlfriend.name = 'pine'
                                    store.commit("addDialogue", [
                                        { name: 'Pine', message: "OMG Cool, see you soon!!!" },
                                        { name: 'Pine', message: "BTW, I'm missing my paper that's due after lunch, I really need to find it" },
                                        { name: 'Pine', message: "Have you seen it!?" },
                                    ]);
                                }
                            },
                            {
                                answer: "I'm pretty busy but I'll let you know",
                                action: () => {
                                    store.commit("addDialogue", [
                                        { name: 'Pine', message: "Aww okay... see you around then." }
                                    ]);
                                }
                            }
                        ]
                    },
                ]);
            }
            else if (goals.newGirlfriend.name == 'pine') {
                if (!goals.newGirlfriend.collectedItems) {
                    console.log(goals)
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "I really need to find that missing paper!!!!!!" },
                    ]);
                }
                else if (goals.newGirlfriend.collectedItems && !goals.newGirlfriend.gaveItems) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "OMG THANK YOU, Let's go to Prom!" },
                        {
                            action: () => {
                                goals.newGirlfriend.gaveItems = true
                                goals.newGirlfriend.promDate = true
                                levelManager.load('prom')
                            }
                        },
                    ]);
                }

            }

        }
    })

    // -------------------------------------
    // COCO
    // -------------------------------------

    const coco = new Coco({
        x: 55, y: 58, gridSize: gridSize, interact: () => {
            if (!goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Coco', message: "Hi ${player}! Are you really still dating Hazel???????" }
                ]);
            }
            else if (!goals.newGirlfriend.name) {
                store.commit("addDialogue", [

                    {
                        name: 'Coco', question: "${player}! It must be tough for you right now, want to hang out?", answers: [
                            {
                                answer: "Sure Coco!",
                                action: () => {
                                    goals.newGirlfriend.name = 'coco'
                                    store.commit("addDialogue", [
                                        { name: 'Coco', message: "Amazing!!!!!, see you soon!!! <3" },
                                        { name: 'Pea', message: "BTW, Have you seen my basketball?  It means a lot to me and I can't find it!" },
                                    ]);
                                }
                            },
                            {
                                answer: "I'm pretty busy but I'll let you know",
                                action: () => {
                                    store.commit("addDialogue", [
                                        { name: 'Coco', message: "Really?? That sucks... see you around then..." }
                                    ]);
                                }
                            }
                        ]
                    },
                ]);
            }
            else if (goals.newGirlfriend.name == 'coco') {
                if (!goals.newGirlfriend.collectedItems) {
                    store.commit("addDialogue", [
                        { name: 'Coco', message: "I really need to find my basketball!!!!!!" },
                    ]);
                }
                else if (goals.newGirlfriend.collectedItems && !goals.newGirlfriend.gaveItems) {
                    store.commit("addDialogue", [
                        { name: 'Coco', message: "OMG THANK YOU, Let's go to Prom!" },
                        {
                            action: () => {
                                goals.newGirlfriend.gaveItems = true
                                goals.newGirlfriend.promDate = true
                                levelManager.load('prom')
                            }
                        },
                    ]);
                }

            }
        }
    })

    // -------------------------------------
    // PEA
    // -------------------------------------

    const pea = new Pea({
        x: 86, y: 53, gridSize: gridSize, interact: () => {
            if (!goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Pea', message: "Hi ${player}! I hope you're having a great day!" }
                ]);
            }
            else if (!goals.newGirlfriend.name) {
                store.commit("addDialogue", [

                    {
                        name: 'Pea', question: "${player}!! I herad about hazel, that sucks, want to chill?", answers: [
                            {
                                answer: "OK Pea!",
                                action: () => {
                                    goals.newGirlfriend.name = 'pea'
                                    store.commit("addDialogue", [
                                        { name: 'Pea', message: "YESSSSSS!!!! I can't wait!!!!!!!" },
                                        { name: 'Pea', message: "BTW, could you please get find my book?  I have no idea where i left it!" },
                                        {
                                            // action: () => goals.originalGirlfriend.brokeUp = true
                                        }
                                    ]);
                                }
                            },
                            {
                                answer: "I'm a little busy but maybe later",
                                action: () => {
                                    store.commit("addDialogue", [
                                        { name: 'Pea', message: ":(((((((((((((((((((" }
                                    ]);
                                }
                            }
                        ]
                    },
                ]);
            }
            else if (goals.newGirlfriend.name == 'pea') {

                if (!goals.newGirlfriend.collectedItems) {
                    store.commit("addDialogue", [
                        { name: 'Pea', message: "I really need to find my Book!  Where is it!?" },
                    ]);
                }
                else if (goals.newGirlfriend.collectedItems && !goals.newGirlfriend.gaveItems) {
                    store.commit("addDialogue", [
                        { name: 'Pea', message: "OMG THANK YOU, Let's go to Prom!" },
                        {
                            action: () => {
                                goals.newGirlfriend.gaveItems = true
                                goals.newGirlfriend.promDate = true
                                levelManager.load('prom')
                            }
                        },
                    ]);
                }
            }
        }
    })

    return [hazelnut, coco, pea]
}