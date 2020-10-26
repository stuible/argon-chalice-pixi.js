import { createApp } from 'vue'
import store from './store'
import Game from './Game.vue'

const game = createApp(Game)

game.use(store);
game.mount('#game')