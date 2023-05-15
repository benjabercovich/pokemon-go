
<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
    <div class="row">
      <img src="../assets/logo.png" alt="Pokemon"/>
    </div>
    <div class="row">
      <h1>Welcome to Pokédex</h1>
    </div>
    <div class="row">
      <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    </div>
    <div class="row">
      <button class="start-button" @click="goToPokemonList">Get Started</button>
    </div>
    </div>
    </body>
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

  <style scoped>

    img {  
    max-width:500px;  
    height: auto;  
    }
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }

    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
        position: relative;
        color: #5E5E5E;
        max-width:68%;  
        height: auto; 
        
    }

    h1 {
        font-style: normal;
        color: #353535;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin-top: -60px;
        }

    button:hover{
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
  
  