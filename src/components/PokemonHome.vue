<template>
    <div>
      <h1>Bienvenido a la Pokédex!</h1>
      <button @click="goToPokemonList">Get Started</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PokemonHome',
    methods: {
      goToPokemonList() {
        this.$router.push({ name: 'ListaPokemones' });
      }
    }
  }
  </script>
  
  