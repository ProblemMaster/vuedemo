<script setup>
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'

const { message } = storeToRefs(useGameStore())
</script>

<template>
  <p class="resultatrad">{{ message }}</p>
</template>

<style scoped>
.resultatrad {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>
