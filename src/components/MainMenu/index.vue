<template>
  <div id="main-menu">
    <div class="title">Macademia High</div>
    <p class="tagline">Welcome to Macademia High, where things are absolutely nuts 🌰</p>
    <button @click="$store.commit('startGame')">Start Game</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#main-menu {
  height: 100%;
  background-color: #a6e9db;
  padding: 4em;

  .title {
      font-size: 2em;
      margin-bottom: 1em;
  }

  .tagline {
      font-size: 1.15em;
      margin-bottom: 5em;
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