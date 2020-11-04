<template>
  <div class="dialog-box" v-if="currentMessage">
    <!-- Name of Charactor Speaking -->
    <div class="name" v-if="currentMessage.name">{{ currentMessageName }}</div>
    <!-- General Message -->
    <div class="message" v-if="isMessage">
      <typer :text="currentMessageText"></typer>
    </div>
    <!-- User Answerable Question -->
    <div class="question" v-else-if="isQuestion">
      <typer :text="currentQuestionText"></typer>
    </div>
    <div class="answers" v-if="isQuestion">
      <button
        v-for="(answer, key) in currentMessage.answers"
        v-bind:key="key"
        @click="runAnswerAction(answer.action)"
      >
        {{ answer.answer }}
      </button>
    </div>

    <button @click="nextMessage()">[ Press Spacebar ]</button>
  </div>
</template>

<script>
import fillTemplate from "es6-dynamic-template";

import Typer from "./Typer";
export default {
  components: {
    Typer,
  },
  props: ["messages"],
  computed: {
    currentMessage() {
      return this.messages[0];
    },
    isMessage() {
      return "message" in this.currentMessage;
    },
    isQuestion() {
      return "question" in this.currentMessage;
    },
    currentMessageName() {
      return fillTemplate(this.currentMessage.name, {
        player: this.$store.state.playerName,
      });
    },
    currentMessageText() {
      return fillTemplate(this.currentMessage.message, {
        player: this.$store.state.playerName,
      });
    },
    currentQuestionText() {
      return fillTemplate(this.currentMessage.question, {
        player: this.$store.state.playerName,
      });
    },
  },
  methods: {
    nextMessage() {
      this.$store.commit("nextDialog");
    },
    runAnswerAction(action) {
      action();
      this.nextMessage();
    },
  },
  watch: {
    async currentMessage() {
      if (this.currentMessage && this.currentMessage.action) {
        await this.currentMessage.action();
        this.nextMessage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-box {
  border: 2px solid rgb(119, 119, 119);
  background-color: rgba(255, 255, 255, 0.671);
  padding: 1em;
  max-width: 25em;
  margin: 0 auto;
  text-align: left;
  border-radius: 0.5em;
  .name {
    font-weight: bold;
    font-size: 1.25em;
  }
  .message {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    // border-right: 0.15em solid orange; /* The typwriter cursor */
    // white-space: nowrap; /* Keeps the content on a single line */
    // margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.05em; /* Adjust as needed */
    animation: typing 3.5s steps(40, end);
  }
}
</style>