import { createApp } from 'vue'
import App from './App.vue'
import PokemonHome from './components/PokemonHome.vue'
import ListaPokemones from './components/ListaPokemones.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'PokemonHome',
      component: PokemonHome
    },
    {
      path: '/pokemons',
      name: 'ListaPokemones',
      component: ListaPokemones
    },
  ]
})

createApp(App).use(router).mount('#app')
