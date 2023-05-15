<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="https://icons.getbootstrap.com/">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- Bootstrap Icons CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" rel="stylesheet">
  </head>
  <body class="fondo">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="search">
            <i class="bi bi-search"></i>
          <input v-model="searchTerm" placeholder="  Search"/>
          </div>
          <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="pokemon-item">
            <div @click="showPokemonDetails(pokemon.name)" class="pokemon-rectangle pokemon-name">
              {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
              <button @click.stop="toggleFavorite(pokemon)" :class="['rounded-circle favorite-button', { 'favorite': isFavorite(pokemon) }]">
              <i class='bi-star-fill'></i>
            </button>
            </div>
          </div>
          <div v-if="filteredPokemons.length === 0">
            <h1>Uh Oh!</h1>
            <p>You got lost on your journey!</p>
            <button class="home-button" @click="resetSearch">Go back home</button>
          </div>
          <div class="bottom-bar">
            <button class="start-button" :class="{ active: !showFavorites }" @click="showFavorites = false">
              <i class="bi bi-list-ul"></i> All
            </button>
            <button class="start-button" :class="{ active: showFavorites }" @click="showFavorites = true">
              <i class="bi bi-star-fill"></i> Favorites
            </button>
          </div>
          <ModalPokemon v-if="selectedPokemon" 
            @close="selectedPokemon = null" 
            @toggle-favorite="toggleFavorite(selectedPokemon)" 
            :is-favorite="isFavorite(selectedPokemon)"
            @share="sharePokemonDetails"
          >
            <template #header>
              <h1>{{ selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1) }}</h1>
            </template>
            <template #body>
              <p>Name: {{ selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1) }}</p>
              <p>Weight: {{ selectedPokemon.weight }}</p>
              <p>Height: {{ selectedPokemon.height }}</p>
              <p>Types: {{ selectedPokemon.types && selectedPokemon.types.length > 0 ? selectedPokemon.types.map(type => type.type ? type.type.name : '').join(', ') : '' }}</p>
            </template>
          </ModalPokemon>
        </div>
      </div>
    </div>
  </body>
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
  watch: {
    favorites: {
      handler() {
        if (this.showFavorites && this.filteredPokemons.length === 0) {
          this.showFavorites = false;
        }
      },
      deep: true,
    },
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

    resetSearch() {
      this.searchTerm = "";
      this.showFavorites = false;
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

.fondo {
  background-color: #F5F5F5;
  margin-top: -60px;
  padding-top: 60px; 
  min-height: 100vh;
}

.header{
  background-color: #F5F5F5;
}
.container {
  position: relative;
  padding-bottom: 100px;
}

.favorite-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.favorite-button i {
  font-size: 24px;
  color: #BFBFBF;
}

.favorite-button.favorite i {
  color: #ECA539;
}

.pokemon-item {
  max-width: 570px;
  height: 60px;
  background: #FFFFFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto 10px;
  padding: 0 20px;
}

.search {
  max-width: 570px;
  height: 60px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #FFFFFF;
  border: none;
}

.search input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
}

.pokemon-name {
  flex-grow: 1;
  margin-right: 10px;
}

.pokemon-rectangle {
  display: flex;
  align-items: center;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  background: #FFFFFF;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
}

.home-button{
  padding: 11px 23px;
  position: relative;
  border: none;
  width: 300px;
  height: auto;
  background: #F22539;
  border-radius: 60px;
  font-style: normal;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin-inline: 10px;
}
.start-button {
  padding: 11px 23px;
  position: relative;
  border: none;
  width: 300px;
  height: auto;
  background: #BFBFBF;
  border-radius: 60px;
  font-style: normal;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin-inline: 10px;
}

.start-button.active {
  background: #F22539;
}

.start-button.active i {
  color: #FFFFFF;
}
.start-button i {
  margin-right: 5px;
}
</style>
