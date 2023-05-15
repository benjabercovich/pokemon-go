<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  </head>
  <div>
    <input v-model="searchTerm" placeholder="Search" />
    <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <div @click="showPokemonDetails(pokemon.name)">
        {{ pokemon.name }}
        <button @click.stop="toggleFavorite(pokemon)" :class="{ 'favorite': isFavorite(pokemon) }">
          {{ isFavorite(pokemon) ? 'Eliminar de favoritos' : 'Agregar a favoritos' }}
        </button>
      </div>
    </div>
    <div>
      <button class="start-button" @click="showFavorites = false">All</button>
      <button class="start-button" @click="showFavorites = true">Favorites</button>
    </div>
    <ModalPokemon v-if="selectedPokemon" 
      @close="selectedPokemon = null" 
      @toggle-favorite="toggleFavorite(selectedPokemon)" 
      :is-favorite="isFavorite(selectedPokemon)"
      @share="sharePokemonDetails"
    >
      <template #header>
        <h1>{{ selectedPokemon.name }}</h1>
      </template>
      <template #body>
        <p>Peso: {{ selectedPokemon.weight }}</p>
        <p>Altura: {{ selectedPokemon.height }}</p>
        <p>Tipo: {{ selectedPokemon.types && selectedPokemon.types.length > 0 ? selectedPokemon.types.map(type => type && type.type ? type.type.name : '').join(', ') : '' }}</p>
      </template>
    </ModalPokemon>
    </div>

</template>

<script>
import ModalPokemon from "./ModalPokemon.vue";

export default {
  components: {
    ModalPokemon,
  },
  data() {
    return {
      pokemons: [],
      favorites: [],
      searchTerm: "",
      showFavorites: false,
      selectedPokemon: null,
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
      this.fetchPokemonDetails(name);
    },
    fetchPokemonDetails(name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
          this.selectedPokemon = data;
          this.$modal.show('pokemon-details');
        })
        .catch((error) => console.error(error));
    },
    sharePokemonDetails() {
      const pokemonDetails = `${this.selectedPokemon.name}, ${this.selectedPokemon.height}, ${this.selectedPokemon.weight}, ${this.selectedPokemon.types.map(type => type.type.name).join(", ")}`;
      navigator.clipboard.writeText(pokemonDetails).then(() => {
        alert("Detalles del Pokemon copiados al portapapeles!");
      }, () => {
        alert("Error al copiar al portapapeles");
      });
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

.start-button:hover{
        background: #C00E20;
    }
.start-button{
        padding: 11px 23px;
        position: relative;
        border: none;
        max-width:100%;  
        height: auto; 
        background: #F22539;
        border-radius: 60px;
        font-style: normal;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 15px;
        line-height: 22px;}
</style>
