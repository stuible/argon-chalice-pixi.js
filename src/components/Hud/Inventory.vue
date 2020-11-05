<template>
  <div id="inventory">
      <div class="title">Inventory</div>
    <ul>
      <li v-for="(item, key) in $store.state.items" v-bind:key="key">
        <img :src="item.image" alt="" />
        <div>{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#inventory {
    background-color: rgba(255, 255, 255, 0.685);
    padding: 1em;
    max-width: 300px;
    border-radius: 1em;
    margin: 1em;

    .title {
        margin-bottom: 1em;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;

        li {
          flex-grow: 1;
        }

        img {
            width: 2em;
        }
    }
}
</style>