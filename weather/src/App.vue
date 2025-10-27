<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BurgerMenu from './components/burgerMenu.vue'
import { ref } from 'vue'

const menuActive = ref(false)
</script>

<template>
  <BurgerMenu @toggle-menu="menuActive = !menuActive" :active="menuActive" />
  <header></header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-left: 1px solid #2a2a2a;
  text-decoration: none;
  color: #ccc;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
}
nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: #4fc3f7;
  font-weight: bold;
}

nav a:hover {
  background-color: #1e1e1e;
  border-radius: 8px;
}
</style>
