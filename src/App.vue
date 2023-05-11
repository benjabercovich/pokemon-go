<template>
  <div id="app">
    <ListaPokemones />
  </div>
</template>

<script>
import ListaPokemones from "./components/ListaPokemones.vue";

export default {
  components: {
    ListaPokemones,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



