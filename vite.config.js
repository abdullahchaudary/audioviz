import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(), 
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['icon-192x192.png', 'apple-touch-icon.png', 'masked-icon.svg', 'icon-256x256.png', 'icon-384x384.png', 'icon-512x512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: 'AudioViz',
        short_name: 'AudioViz',
        description: 'Audio visualizer and waveform generator.',
        theme_color: '#7ed321',
        background_color: '#000000',
        display: 'fullscreen',
        icons: [
          {
            src: '/assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/assets/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/assets/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/assets/masked-icon.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
