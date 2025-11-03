<script setup>
import { useGameStore } from '@/stores/gameStore'

function nollstall() {
  useGameStore().nollStall()
}
</script>

<template>
  <button class="nollstall" @click="nollstall">Nollställ</button>
</template>

<style scoped>
.nollstall {
  display: block;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: auto;
}
</style>
