<script setup>
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const { alternatives, computerChoice, reset } = storeToRefs(useGameStore())

function setUserChoice(e) {
  for (const button of document.querySelectorAll('button')) {
    button.classList.remove('selected')
  }
  e.target.classList.add('selected')
  let index = alternatives.value.indexOf(e.target.innerText)
  useGameStore().userChoice(index)
}

watch(computerChoice, () => {
  for (let button of document.querySelectorAll('button')) {
    button.classList.remove('computer')
  }
  if (computerChoice.value > -1) {
    let text = alternatives.value[computerChoice.value]
    for (let button of document.querySelectorAll('button')) {
      if (button.innerText === text) {
        button.classList.add('computer')
      }
    }
  }
})

watch(reset, () => {
  if (reset.value) {
    for (let button of document.querySelectorAll('button')) {
      button.classList.remove('selected')
      button.classList.remove('computer')
    }
  }
})
</script>

<template>
  <div class="knapprad">
    <button v-for="knapp in alternatives" :key="knapp" @click="setUserChoice">{{ knapp }}</button>
  </div>
</template>

<style scoped>
.knapprad {
  display: flex;
  gap: 1rem;
  justiy-content: center;
}
button {
  font-size: 1.5rem;
}
.selected {
  background-color: pink;
}
.computer {
  border: 2px solid red;
}
</style>
