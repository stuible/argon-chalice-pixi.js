<template>
  <dialog-box :messages="$store.state.dialog"/>
  <div ref="gameView" id="game-view"></div>
</template>

<script>
import Game from "./game/index";
import DialogBox from "./components/DialogBox";

export default {
  name: "Game",
  components: {
    DialogBox
  },
  mounted() {
    const game = new Game(this.$store);
    this.$refs.gameView.appendChild(game.view);
  },
};
</script>

<style>
#game {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#game-view {
  height: 500px;
}
</style>
