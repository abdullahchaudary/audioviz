<script setup>
import Navbar from './components/Navbar.vue';
// import WaveformGenerator from './views/WaveformGenerator.vue';
// import Visualizer from './views/Visualizer.vue';
import {RouterView} from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="mainView">
    <Navbar />
    <div class="mainInner">
      <RouterView />
      <!-- <Visualizer /> -->
      <!-- <WaveformGenerator /> -->
    </div>
  </div>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
</template>
