import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PuzzlesView from '../views/PuzzlesView.vue'
import PopularView from '../views/PopularView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/masuk', name: 'login', component: LoginView },
    { path: '/daftar', name: 'register', component: RegisterView },
    { path: '/puzzles', name: 'puzzles', component: PuzzlesView },
    { path: '/popular', name: 'popular', component: PopularView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    
    {
      path: '/game',
      name: 'game',
      component: GameView
    }
  ]
})

export default router
