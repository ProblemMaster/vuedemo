<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps(['active'])
const emits = defineEmits(['toggle-menu'])

function toggleActive() {
  emits('toggle-menu', props.active)
}
</script>

<template>
  <div id="burger">
    <button
      type="button"
      class="burger-button"
      title="Menu"
      :class="{ active: props.active }"
      @click="toggleActive"
    >
      <span class="burger-bar bar--1"></span>
      <span class="burger-bar bar--2"></span>
      <span class="burger-bar bar--3"></span>
    </button>

    <nav class="navbar" v-show="props.active">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/locations">Locations</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
#burger {
  display: block;
  position: relative; /* för att navbar absolut ska baseras på detta */
}

.burger-button {
  position: relative;
  height: 30px;
  width: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar {
  position: absolute;
  left: 6px;
  right: 6px;
  height: 3px;
  background-color: #ed1313;
  top: 50%;
  margin-top: -1px;
  transition:
    transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.bar--1 {
  transform: translateY(-6px);
  top: 40%;
}
.bar--2 {
  transform-origin: 100% 50%;
}
.bar--3 {
  transform: translateY(6px);
  top: 60%;
}

.burger-button.active {
  transform: rotate(-180deg);
}
.burger-button.active .bar--1 {
  transform: rotate(45deg);
  top: 50%;
}
.burger-button.active .bar--2 {
  opacity: 0;
}
.burger-button.active .bar--3 {
  transform: rotate(-45deg);
  top: 50%;
}

/* Endast ändring här: gör att navbar inte trycker ner sidan */
.navbar {
  position: absolute; /* nyckeländring */
  top: 100%; /* precis under knappen */
  left: 0;
  width: 100%;
}
</style>
