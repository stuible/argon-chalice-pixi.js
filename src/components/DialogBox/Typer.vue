<template>
  <div class="typewriter">{{ currentText }}</div>
</template>

<script>
export default {
  props: ["text"],
  data: () => ({
    // currentText: '',
    textIndex: 1,
  }),
  mounted() {
    setInterval(() => {
      if (this.characterArray.length > this.textIndex) this.textIndex++;
    }, 30);
  },
  computed: {
    characterArray() {
      return this.$props.text.split("");
    },
    currentText() {
      return this.characterArray.slice(0, this.textIndex).join("");
    },
  },
  watch: { 
      text(){
          this.textIndex = 1;
      }
  },
  methods: {},
};
</script>

<style lang="scss">
</style>