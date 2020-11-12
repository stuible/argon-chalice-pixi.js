<template>
  <div id="HUD">
    <inventory></inventory>
    <math-problems v-if="$store.state.showMathProblem"/>
    <combo-lock v-if="$store.state.showComboLock" />
  </div>
</template>

<script>
import Inventory from "./Inventory";
import MathProblems from "./MathProblems";
import ComboLock from "./ComboLock";

export default {
  components: {
    Inventory,
    MathProblems,
    ComboLock
  },
};
</script>

<style>
</style>