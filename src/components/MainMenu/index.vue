<template>
  <div id="main-menu">
    <div class="title">Macademia High</div>
    <p class="tagline">
      Welcome to Macademia High, where things are absolutely nuts! 🌰
    </p>
    <div class="controls">
      <div>
        <img src="@/assets/icons/keyboard.svg" alt="" />
        <div>Move with arrow keys</div>
      </div>
      <div>
        <img src="@/assets/icons/space-bar.svg" alt="" />
        <div>Interact wih Space bar</div>
      </div>
    </div>
    <p>Enroll Now!</p>
    <div id="enrollment">
      <label for="studentname">Name</label>
      <input type="text" id="studentname" v-model="playerName" />
    </div>
    <button @click="startGame()">Start Game</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    playerName: "Player",
  }),
  methods: {
    startGame() {
      this.$store.commit("setName", this.playerName);
      this.$store.commit("startGame");
    },
  },
};
</script>

<style lang="scss">
#enrollment {
  margin-bottom: 2em;

  label {
    margin-right: 1em;
  }
}

#main-menu {
  height: 100%;
  background-color: #a6e9db;
  padding: 4em;

  .title {
    font-size: 2em;
    margin-bottom: 1em;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    >div {
      margin: 1em;
    }
    img {
      width: 5em;
    }
  }

  .tagline {
    font-size: 1.15em;
    // margin-bottom: 5em;
  }

  button {
    padding: 1em;
    background-color: black;
    border: none;
    color: white;
    font-size: 0.85em;
    border-radius: 0.5em;
  }
}
</style>