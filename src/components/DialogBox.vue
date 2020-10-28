<template>
  <div id="dialogue" v-if="currentMessage">
      <div class="name">{{currentMessage.name}}</div>
      <div class="message">{{currentMessage.text}}</div>
      <button @click="nextMessage()">Next</button>
  </div>
</template>

<script>
export default {
    props: ['messages'],
    computed: {
        currentMessage(){
            return this.messages[0];
        }
    },
    methods: {
        nextMessage(){
            this.$store.commit("removeDialog");
        }
    }
}
</script>

<style lang="scss">
#dialogue {
    border: 2px solid rgb(119, 119, 119);
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