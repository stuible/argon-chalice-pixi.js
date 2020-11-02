<template>
  <div class="typewriter">
    {{ currentText }}<span style="opacity: 0">{{ currentInvisibleText }}</span>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data: () => ({
    // currentText: '',
    textIndex: 1,
    inetrval: undefined
  }),
  mounted() {
    this.interval = setInterval(this.incrementTextIndex, (1 / this.characterArray.length) * 500);
  },
  computed: {
    characterArray() {
      return this.$props.text.split("");
    },
    currentText() {
      return this.characterArray.slice(0, this.textIndex).join("");
    },
    currentInvisibleText() {
      return this.characterArray.slice(this.textIndex, this.characterArray.length).join("");
    },
  },
  watch: {
    text() {
      this.textIndex = 1;
      clearInterval(this.interval);
      this.interval = setInterval(this.incrementTextIndex, (1 / this.characterArray.length) * 500);
    },
  },
  methods: {
      incrementTextIndex(){
          if (this.characterArray.length > this.textIndex) this.textIndex++;
          else  {
              console.log('clearn interval')
              clearInterval(this.interval);
          }
      }
  },
};
</script>

<style lang="scss">
</style>