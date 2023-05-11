<template>
  <div>
    <input v-model="searchTerm" placeholder="Buscar por nombre..." />
    <div>
      <button @click="showFavorites = false">Todos</button>
      <button @click="showFavorites = true">Favoritos</button>
    </div>
    <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <div @click="showPokemonDetails(pokemon.name)">
        {{ pokemon.name }}
        <button @click.stop="toggleFavorite(pokemon)" :class="{ 'favorite': isFavorite(pokemon) }">
          {{ isFavorite(pokemon) ? 'Eliminar de favoritos' : 'Agregar a favoritos' }}
        </button>
      </div>
    </div>
    </div>

</template>

<script>


export default {

  data() {
    return {
      pokemons: [],
      favorites: [],
      searchTerm: "",
      showFavorites: false,
    };
  },
  created() {
    this.loadPokemons();
    this.loadFavorites();
  },
  methods: {
    loadPokemons() {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then((data) => {
          this.pokemons = data.results;
        })
        .catch((error) => console.error(error));
    },
    loadFavorites() {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    },
    toggleFavorite(pokemon) {
      const index = this.favorites.findIndex((favorite) => favorite.name === pokemon.name);
      if (index === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    isFavorite(pokemon) {
      return this.favorites.some((favorite) => favorite.name === pokemon.name);
    },
    showPokemonDetails(name) {
      const pokemon = this.pokemons.find((pokemon) => pokemon.name === name);
      this.$router.push({ name: "pokemon-details", params: { name: pokemon.name } });
    },
    removeFavorite(pokemon) {
      this.favorites = this.favorites.filter((favorite) => favorite.name !== pokemon.name);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
  computed: {
    filteredPokemons() {
      const pokemonsToFilter = this.showFavorites ? this.favorites : this.pokemons;
      
      return pokemonsToFilter.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.favorite {
  background-color: yellow;
}
</style>
