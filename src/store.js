// Global State
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            gameOver: false,
            gameStarted: false,
            gamePaused: false,
            score: 0,
            dialog: [],
            items: []
        }
    },
    mutations: {
        addDialogue(state, dialog) {
            if (Array.isArray(dialog)) {
                state.dialog = state.dialog.concat(dialog);
            }
            else if(typeof dialog === 'object' && dialog !== null){
                state.dialog.push(dialog);
            }
        },
        nextDialog(state){
            state.dialog.shift()
        },
        startGame(state){
            state.gameStarted = true;
        },
        pauseGame(state){
            state.gamePaused = true;
        },
        resumeGame(state){
            state.gamePaused = false;
        }
    }
})
