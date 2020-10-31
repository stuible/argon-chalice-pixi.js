<template>
  <div class="dialog-box" v-if="currentMessage">
    <!-- Name of Charactor Speaking -->
    <div class="name" v-if="currentMessage.name">{{ currentMessage.name }}</div>
    <!-- General Message -->
    <div class="message" v-if="isMessage">{{ currentMessage.message }}</div>
    <!-- User Answerable Question -->
    <div class="question" v-else-if="isQuestion">
      {{ currentMessage.question }}
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

    <button @click="nextMessage()">Next</button>
  </div>
</template>

<script>
export default {
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
  },
  methods: {
    nextMessage() {
      this.$store.commit("removeDialog");
    },
    runAnswerAction(action) {
      action();
      this.nextMessage();
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
}
</style>