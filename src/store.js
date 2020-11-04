// Global State
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            gameOver: false,
            gameStarted: false,
            gamePaused: false,
            playerName: "Player",
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
        setName(state, name){
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
        }
    },
    getters: {
        // doneTodos: state => {
        //     return state.todos.filter(todo => todo.done)
        // }
    }
})
