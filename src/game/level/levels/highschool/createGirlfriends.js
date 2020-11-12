import { Hazelnut, Pine, Coco, Pea } from '@/game/sprites'

export default function (store, goals, gridSize, levelManager) {

    // -------------------------------------
    // HAZEL
    // -------------------------------------

    const hazelnut = new Hazelnut({
        x: 42, y: 85, gridSize: gridSize, interact: () => {

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
                    { name: 'Hazel', message: "It’s not much! I just totally forgot a few things today" },
                    { name: 'Hazel', message: "I need a PEN, a RULER and Chester's NOTES, I know you guys are friends!" },
                    { action: () => goals.originalGirlfriend.spoken = true }
                ])
            }
            else if (!goals.originalGirlfriend.collectedItems) {
                store.commit("addDialogue", { name: 'Hazel', message: "Thank you for offering to find a PEN, RULER and those NOTES Chester took.  I saw him by the other lockers!" },);
            }
            else if (goals.originalGirlfriend.collectedItems && !goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Hazel', message: "OMG Thank you so much for getting that stuff" },
                    {
                        action: () => {
                            store.commit("removeItem", "pen")
                            store.commit("removeItem", "ruler")
                            store.commit("removeItem", "notes")
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
        x: 73, y: 57, gridSize: gridSize, interact: () => {
            if (!goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Pine', message: "Hey ${player}, you still dating Hazel?" }
                ]);
            }
            else if (goals.originalGirlfriend.brokeUp && !goals.newGirlfriend.name) {
                store.commit("addDialogue", [
                    { name: 'Pine', message: "Oh hey, ${player}! Rumor has it you and Hazel broke up.  I'm so sorry" },
                    { name: 'Pine', message: "My boyfriend recently broke up with me so I know what it's like... It sucks..." },
                    {
                        name: 'Pine', question: "This may be a bad time but could you look around for my math textbook, I'm freaking out trying to find it", answers: [
                            {
                                answer: "Sure Pine!",
                                action: () => {
                                    goals.newGirlfriend.name = 'pine'
                                    store.commit("addDialogue", [
                                        { name: 'Pine', message: "OMG Amazing, I know I must have left it in a classroom but I can't find it anywhere" },
                                        { name: 'Pine', message: "I need this textbook for my math class, I'm going to fail without it!" },
                                    ]);
                                }
                            },
                            {
                                answer: "I'm pretty busy but I'll let you know",
                                action: () => {
                                    store.commit("addDialogue", [
                                        { name: 'Pine', message: "Oh okay... see you around then." }
                                    ]);
                                }
                            }
                        ]
                    },
                ]);
            }
            // Player has begun to do tasks for pine, trying to become her BF
            else if (goals.newGirlfriend.name == 'pine') {
                if (!goals.pine.collectedItems) {
                    console.log(goals)
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "I really need to find that missing book!!!!!!" },
                    ]);
                }
                else if (goals.pine.collectedItems && !goals.pine.gaveItems) {
                    store.commit("addDialogue", [
                        { name: 'Pine', message: "OMG THANK YOU!!!!!" },
                        { name: 'Pine', message: "Now at least I have a chance in hell at passing this math course..." },
                        {
                            action: () => {
                                goals.pine.gaveItems = true
                            }
                        },
                        { name: 'Pine', message: "Bytheway, I have absolutely no idea what's going on with these last 2 questions, could you maybe have a look? 😜" },
                        {
                            action: () => {
                                store.commit("showMathProblem")
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
        x: 64, y: 74, gridSize: gridSize, interact: () => {
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
        x: 58, y: 80, gridSize: gridSize, interact: () => {
            if (!goals.originalGirlfriend.brokeUp) {
                store.commit("addDialogue", [
                    { name: 'Pea', message: "Hi ${player}! I hope you're having a great day!" }
                ]);
            }
            else if (!goals.newGirlfriend.name) {
                store.commit("addDialogue", [
                    { name: 'Pea', message: "${player}!!!! Oh Hazel just broke up with you?? that really really sucks I'm sorry" },
                    { name: 'Pea', message: "Hey I really want to make you feel better but basketball practice starts soon and I've lost my BASKETBALL and JERSEY..." },
                    {
                        name: 'Pea', question: "Is there any chance you could help me find them???", answers: [
                            {
                                answer: "Of Course Pea!",
                                action: () => {
                                    goals.newGirlfriend.name = 'pea'
                                    store.commit("addDialogue", [
                                        { name: 'Pea', message: "The BASKETBALL must be in the gym but people were playing dodgeball so I couldn't check" },
                                        { name: 'Pea', message: "The JERSEY has to be in the school because I never took it home, I hope I didn't leave it outside..." },
                                    ]);
                                }
                            },
                            {
                                answer: "I Really have to get to class, sorry!",
                                action: () => {
                                    store.commit("addDialogue", [
                                        { name: 'Pea', message: "It's okay, I Understand." }
                                    ]);
                                }
                            }
                        ]
                    },
                ]);
            }
            else if (goals.newGirlfriend.name == 'pea') {

                if (!goals.pea.collectedItems) {
                    store.commit("addDialogue", [
                        { name: 'Pea', message: "Any luck with the BASKETBALL and JERSEY ?  I haven't seen them anywhere!! 😭" },
                    ]);
                }
                else if (goals.pea.collectedItems && !goals.pea.gaveItems) {
                    store.commit("addDialogue", [
                        { name: 'Pea', message: "OMG THANK YOU SO MUCH 🤩" },
                        {
                            action: () => {
                                goals.pea.gaveItems = true
                            }
                        },
                        {
                            name: "Pea",
                            message: "Soooooo... ☺️",
                        },
                        {
                            name: "Pea",
                            question: "This is a little soon I know, but I don't have a prom date. Would you want to go with me?",
                            answers: [
                                {
                                    answer: "Absolutely!",
                                    action: () =>
                                        store.commit("addDialogue", [
                                            {
                                                name: "Pea",
                                                message: "Incredible, I can't wait 😻",
                                            },
                                            {
                                                name: "Pea",
                                                message: "I'll see you right after basketball practice 😜"
                                            },
                                            {
                                                action: () => store.commit("chosenPromdate", "pea")
                                            }
                                        ]),
                                },
                                {
                                    answer: "I'd rather we just be friends",
                                    action: () =>
                                        store.commit("addDialogue", [
                                            {
                                                name: "Pea",
                                                message: "That's totally cool, I'll see you around",
                                            },
                                            {
                                                action: () => store.commit("rejected", "pea"),
                                            },
                                        ]),
                                }
                            ]
                        }

                    ])

                }
            }
        }
    })

    return [hazelnut, coco, pea, pine]
}