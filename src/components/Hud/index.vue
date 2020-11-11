<template>
  <div id="HUD">
    <inventory></inventory>
    <math-problems v-if="$store.state.showMathProblem"/>
  </div>
</template>

<script>
import Inventory from "./Inventory";
import MathProblems from "./MathProblems";
export default {
  components: {
    Inventory,
    MathProblems,
  },
};
</script>

<style>
</style>