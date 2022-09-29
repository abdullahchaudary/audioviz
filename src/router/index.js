import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import Visualizer from '../views/Visualizer.vue'
import WaveformGenerator from '../views/WaveformGenerator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'visualizer',
      component: Visualizer
    },
    {
      path: '/waveformgen',
      name: 'waveformgen',
      component: WaveformGenerator
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
