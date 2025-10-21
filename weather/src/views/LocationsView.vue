<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'

const location = ref({ name: '', position: { lat: 0, long: 0 }, default: false })
const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations')) ?? []
})

const save = () => {
  if (location.value.edit) {
    locationsList.value.forEach((itm) => {
      if (itm.edit == true) {
        itm.name = location.value.name
        itm.lat = location.value.lat
        itm.long = location.value.long
      }
    })
  } else {
    locationsList.value.push(location.value)
  }
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

const remove = (loc) => {
  locationsList.value = locationsList.value.filter((l) => l !== loc)
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

const reset = () => {
  location.value = {
    name: '',
    position: { lat: 0, long: 0 },
    default: false,
  }
}

function setDefault(e) {
  locationsList.value.map((itm) => {
    itm.default = e.position.lat == itm.position.lat && e.position.long == itm.position.long
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))

  locationsList.value.forEach((itm) => {
    if (itm.default) {
      router.push(`/forecast/${itm.name}/${itm.position.lat}/${itm.position.long}`)
    }
  })
}

function editValue(itm) {
  location.value = JSON.parse(JSON.stringify)
  itm.edit = true
}
</script>

<template>
  <h2>Locations</h2>
  <label>Namn: <input type="text" v-model="location.name" /></label>
  <label
    >Lat:
    <input type="number" max="90" min="-90" step=".1" size="5" v-model="location.position.lat"
  /></label>
  <label
    >Long:
    <input type="number" max="180" min="-180" step=".1" size="8" v-model="location.position.long"
  /></label>
  <button @click="save">Save</button> <button @click="reset">Reset</button>
  <hr />
  <h3>List</h3>
  <ul>
    <li
      v-for="loc in locationsList"
      :key="loc"
      @click="setDefault(loc)"
      :class="loc.default ? 'default' : ''"
    >
      {{ loc.name }}
      ( {{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }}
      {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }} )
      <span class="edit" @click.stop="editValue(loc)">e</span>
      <span class="remove" @click.stop="remove(loc)">x</span>
    </li>
  </ul>
</template>

<style scoped>
label {
  display: block;
  width: 15em;
  padding-top: 0.5em;
}
.remove {
  cursor: pointer;
  color: gray;
  margin-left: 0.5em;
}
.remove:hover {
  color: red;
  font-weight: bald;
}
</style>
