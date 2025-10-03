<script setup>
import { ref } from 'vue'

const list = ref([
  { text: 'Köp mjölk', done: false },
  { text: 'Köp ägg', done: true },
  { text: 'Köp bröd', done: false },
])

const itemText = ref('')
function addItem() {
  let listItem = { text: itemText.value, done: false }
  list.value.push(listItem)
  itemText.value = ''
}
</script>

<template>
  <header>
    <h1>ToDo-lista</h1>
    <input type="text" v-model="itemText" placeholder="Ny uppgift" />
    <button v-on:click="addItem">Lägg till</button>
  </header>

  <main>
    <h3>Att göra:</h3>
    <ul>
      <template v-for="itm in list" v-bind:key="itm">
        <li>
          {{ itm.text }}
        </li>
      </template>
    </ul>
    <h3>Klart!</h3>
    <ul>
      <template v-for="itm in list" v-bind:key="itm">
        <li v-if="itm.done">
          {{ itm.text }}
        </li>
      </template>
    </ul>
  </main>
</template>

<style scoped></style>
