// Global State
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            gameOver: false,
            gameStarted: true,
            paused: false,
            score: 0,
            dialog: []
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
        }
    }
})
