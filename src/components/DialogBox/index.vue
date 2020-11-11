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
        :class="{ selected: selectedAnswer == key }"
        @click="runAnswerAction(answer.action)"
      >
        {{ answer.answer }}
      </button>
    </div>

    <button @click="nextMessage()" v-if="!isQuestion">
      [ Press Spacebar ]
    </button>
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
  data: () => ({
    selectedAnswer: 0,
  }),
  mounted() {
    // Setup dialog-related Event Listeners
    window.addEventListener("keydown", (event) => {
      // Switch between answers
      if (event.key == "ArrowRight") {
        this.nextAnswer();
      } else if (event.key == "ArrowLeft") {
        this.previousAnswer();
        // Handle Action button (spacer)
      } else if (event.key == " ") {
        // If no more dialog messages, send event to game
        console.log(this.currentMessage);
        if (this.currentMessage == undefined) this.$store.commit("actionEvent");
        // If there are, then run action and procees to next dialog
        else if (this.isQuestion) {
          this.runAnswerAction(
            this.currentMessage.answers[this.selectedAnswer].action
          );
        } else this.nextMessage();
      }
    });
  },
  computed: {
    currentMessage() {
      return this.messages[0];
    },
    isMessage() {
      return this.currentMessage ? "message" in this.currentMessage : false;
    },
    isQuestion() {
      return this.currentMessage ? "question" in this.currentMessage : false;
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
    nextAnswer() {
      if (!this.isQuestion) return;
      if (this.selectedAnswer < this.currentMessage.answers.length - 1) {
        this.selectedAnswer++;
      } else this.selectedAnswer = 0;
    },
    previousAnswer() {
      if (!this.isQuestion) return;
      if (this.selectedAnswer >= this.currentMessage.answers.length - 1) {
        this.selectedAnswer--;
      } else this.selectedAnswer = this.currentMessage.answers.length - 1;
    },
  },
  watch: {
    async currentMessage() {
      this.selectedAnswer = 0;
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

.answers {
  button {
    &.selected {
      background-color: red;
    }
  }
}
</style>