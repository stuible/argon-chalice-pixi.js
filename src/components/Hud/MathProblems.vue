<template>
  <div id="blackboard">
    <h2>Solve for X</h2>
    <div v-for="(question, index) in questions" :key="index" class="question">
      <label :for="index">{{ question.q }}</label>
      <div class="answer">
        x =
        <input
          type="number"
          :name="index"
          :id="'math-q-' + index"
          v-model="question.userAnswer"
          :class="{ wrong: question.correct === false }"
        />
      </div>
    </div>
    <button @click="checkAnswers">Check Answers</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    questions: [
      {
        q: "18-4x= 5x",
        a: 2,
        userAnswer: "",
        correct: undefined,
      },
      {
        q: "x+(3x-2) = 18",
        a: 5,
        userAnswer: "",
        correct: undefined,
      },
    ],
  }),
  methods: {
    async checkAnswers() {
      await this.$store.commit("nextDialog");
      let allCorrect = true;
      this.questions.forEach((q) => {
        if (String(q.a) === String(q.userAnswer)) {
          //User is correct
          q.correct = true;
        } else {
          q.correct = false;
          allCorrect = false;
        }
      });

      if (allCorrect) {
        this.$store.commit("solvedMathProblem");
        this.$store.commit("addDialogue", [
          {
            name: "Pine",
            message: "AHHH Of Course!!!! That makes so much sense!!!!",
          },
          {
            name: "Pine",
            message: "Thank you so much 😍",
          },
          {
            name: "Pine",
            message: "......... 👉👈",
          },
          {
            name: "Pine",
            message:
              "Hey... I really appreciate everything you've done for me lately, and I know we both don't have prom dates",
          },
          {
            name: "Pine",
            question: "Would you want to go to prom with me?",
            answers: [
              {
                answer: "Yes Absolutely!!",
                action: () =>
                  this.$store.commit("addDialogue", {
                    name: "Pine",
                    message: "OMG Cool, let's do this thing 😻",
                  }),
              },
              {
                answer: "I see you more as a friend",
                action: () =>
                  this.$store.commit("addDialogue", [
                    {
                      name: "Pine",
                      message: "Ohh... OK... See you around, friend?",
                    },
                    {
                      action: () => this.$store.commit("rejected", "pine"),
                    },
                  ]),
              },
            ],
          },
        ]);
      } else {
        if (this.$store.state.dialog.length == 0)
          this.$store.commit("addDialogue", {
            name: "Pine",
            message: "Hmmmm that doesn't seem quite right??",
          });
      }
    },
  },
};
</script>

<style lang="scss">
#blackboard {
  background-color: #437d41;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 2em 1em 2em;
  border: 1em solid #c8c8c8;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  text-align: left;
  color: white;

  label {
    color: white;
  }

  .question {
    margin-bottom: 2em;
  }

  .answer {
    float: right;
    color: white;
    font-weight: bold;
  }

  input {
    background: none;
    border: solid white 2px;
    padding: 0.5em;
    color: white;
    font-weight: bold;
    font-size: 0.7em;

    &.wrong {
      border-color: rgb(138, 0, 0);
    }
  }

  button {
    cursor: pointer;
    background: white;
    padding: 1em;
    border-radius: 4px;
    border: none;
    margin-bottom: 1em;
    font-weight: bold;

    &:hover {
      background: #f8edbf;
    }
  }
}
</style>