<template>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  </head>
    <div class="loading-page">
        <img class="jumping" src="../assets/Loader.png" alt="Load"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingPage',
    mounted() {
      setTimeout(() => {
        this.$router.push({ name: 'ListaPokemones' });
      }, 5000);
    },
  }
  </script>
  
  <style scoped>
  .loading-page {
    display: flex;
    margin-top: -60px;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2em;
  }

  .jumping {
    animation: jump 1s infinite;
  }

  @keyframes jump {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
  }
  </style>