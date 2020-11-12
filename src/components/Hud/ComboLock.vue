<template>
  <div id="combo-lock">
    <div class="close-container">
      <button @click="$store.commit('hideComboLock')">x</button>
    </div>
    <img src="@/assets/items/lock.svg?data" class="lock-icon" />
    <div class="inputs">
      <input
        v-for="(c, index) in combo"
        :key="index"
        v-model="userInput[index]"
        type="number"
        name=""
        class="combo-input"
        @change="trimInputs"
      />
    </div>
    <button @click="checkCode" class="unlock-btn">Unlock</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    combo: ["36", "26", "14"],
    userInput: ["0", "0", "0"],
  }),
  methods: {
    trimInputs() {
      this.userInput = this.userInput.map((x) =>
        x.replace(/[^0-9]+/g, "").substring(0, 2)
      );
    },
    checkCode() {
      const wrongInputs = this.combo.filter(
        (x, index) => x != this.userInput[index]
      );

      // Correct Code
      if (wrongInputs.length === 0) {
        this.$store.commit("solvedComboLock");
        this.$store.commit("addDialogue", {
          name: "Player",
          message: "The lock slid open!  AND There's a wallet inside!",
        });
      }
      // Wrong Code
      else {
        if (this.$store.state.dialog.length == 0)
          this.$store.commit("addDialogue", {
            name: "Player",
            message: "Damn the lock won't budge with that combo...",
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#combo-lock {
  background-color: grey;
  max-width: 500px;
  margin: 0 auto;
  padding: 2em 2em 1em 2em;
  border: 1em solid darkgray;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  text-align: center;
  color: darkgrey;
}
.lock-icon {
  height: 100%;
  width: 5em;
  margin-bottom: 2em;
}
.inputs {
  margin-bottom: 1em;
}
.combo-input {
  width: 3em;
  font-size: 1.25em;
  margin: 0 1em;
}
.unlock-btn {
  background: #4845a4;
  padding: 1em;
  color: white;
  font-weight: bold;
  border: solid 2px #b4b3da;
  border-radius: 50%;
  height: 6em;
  width: 6em;
  cursor: pointer;

  &:hover {
    background: #495fb2;
  }
}
.close-container {
  position: relative;

  button {
    float: right;
    position: absolute;
    right: 0;
  }
}
</style>