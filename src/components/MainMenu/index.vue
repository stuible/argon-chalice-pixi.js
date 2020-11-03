<template>
  <div id="main-menu">
    <div class="title">Macademia High</div>
    <button @click="$store.commit('startGame')">Start Game</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#main-menu {
  height: 100%;
  background-color: #2a3536;

  .title {
      font-size: 2em;
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