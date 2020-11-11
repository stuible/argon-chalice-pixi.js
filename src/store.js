// Global State
import { createStore } from 'vuex'

import PIXISound from 'pixi-sound';

export default createStore({
    state() {
        return {
            gameOver: false,
            gameStarted: false,
            gamePaused: false,
            playerName: "Player",
            score: 0,
            dialog: [],
            items: [],
            showMathProblem: false,
            dialogSound: PIXISound.Sound.from({
                url: require("@/assets/audio/dialog.mp3"),
                // autoPlay: true,
                volume: 0.3,
                loop: false,
                preload: true
            })
        }
    },
    mutations: {
        addDialogue(state, dialog) {
            if (Array.isArray(dialog)) {
                state.dialog = state.dialog.concat(dialog);
            }
            else if (typeof dialog === 'object' && dialog !== null) {
                state.dialog.push(dialog);
            }
        },
        nextDialog(state) {
            state.dialog.shift()
        },
        startGame(state) {
            state.gameStarted = true;
        },
        setName(state, name) {
            state.playerName = name;
        },
        pauseGame(state) {
            state.gamePaused = true;
        },
        resumeGame(state) {
            state.gamePaused = false;
        },
        collectedItem(state, item) {
            state.items.push(item)
        },
        removeItem(state, itemName) {
            state.items = state.items.filter(x => x.name !== itemName);
        },
        showMathProblem(state){
            state.showMathProblem = true;
        },
        solvedMathProblem(state){
            state.showMathProblem = false;
        },
        // Empty action used to communicate rejections
        rejected(state, payload){
    
        },
        // Empty action used to trigger actions in game
        actionEvent(state) {

        }
    },
    getters: {
        // doneTodos: state => {
        //     return state.todos.filter(todo => todo.done)
        // }
    }
})
