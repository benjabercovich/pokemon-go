<template>
    <div class="pokemon-card">
      <div class="pokemon-image">
        <img :src="imageUrl" :alt="name" />
      </div>
      <div class="pokemon-info">
        <h3 class="pokemon-name">{{ name }}</h3>
        <div class="pokemon-types">
          <span class="pokemon-type" v-for="(type, index) in types" :key="index">{{ type }}</span>
        </div>
        <button @click="toggleFavorite" class="favorite-button" :class="{ active: isFavorite }">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
      isFavorite: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      name() {
        return this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
      },
      imageUrl() {
        return this.pokemon.imageUrl;
      },
      types() {
        return this.pokemon.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1));
      },
    },
    methods: {
      toggleFavorite() {
        this.$emit('toggle-favorite');
      },
    },
  };
  </script>
  
  <style scoped>
  .pokemon-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .pokemon-image {
    width: 150px;
    height: 150px;
    margin-bottom: 16px;
  }
  
  .pokemon-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .pokemon-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .pokemon-name {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .pokemon-types {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 16px;
  }
  
  .pokemon-type {
    background-color: #ccc;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    padding: 4px 8px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  
  .favorite-button {
    border: none;
    background-color: transparent;
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .favorite-button.active {
    color: red;
  }
  </style>
  
  