<template>
  <div id="game-wrapper">
    <!-- <div id="ui-wrapper"></div> -->
    <div ref="gameView" id="game-view"></div>
    <div id="dialog-box-wrapper">
      <dialog-box :messages="$store.state.dialog" />
    </div>
  </div>
</template>

<script>
import Game from "./game/index";
import DialogBox from "./components/DialogBox";

export default {
  name: "Game",
  components: {
    DialogBox,
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

#dialog-box-wrapper {
  position: absolute;
  bottom: 1em;
  width: 100%;
}

#game-wrapper {
  position: relative;
}

#game-view {
  height: 500px;
}
</style>
