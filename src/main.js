import { createApp } from 'vue'
import App from './App.vue'
import PokemonHome from './components/PokemonHome.vue'
import ListaPokemones from './components/ListaPokemones.vue'
import LoadingPage from './components/LoadingPage'
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
      path: '/loading',
      name: 'Loading',
      component: LoadingPage
    },
    {
      path: '/pokemons',
      name: 'ListaPokemones',
      component: ListaPokemones
    },
  ]
})

createApp(App).use(router).mount('#app')
