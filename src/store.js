// Global State
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            gameOver: false,
            gameStarted: true,
            paused: false,
            score: 0
        }
    }
})
