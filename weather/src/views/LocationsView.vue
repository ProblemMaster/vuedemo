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
        itm.position.lat = location.value.position.lat
        itm.position.long = location.value.position.long
        itm.edit = false
      }
    })
  } else {
    locationsList.value.push({
      name: location.value.name,
      position: {
        lat: parseFloat(location.value.position.lat),
        long: parseFloat(location.value.position.long),
      },
      default: false,
    })
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

function goToForecast(loc) {
  // Sätt som default och spara i localStorage
  locationsList.value.forEach((itm) => {
    itm.default = itm.position.lat === loc.position.lat && itm.position.long === loc.position.long
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))

  // Navigera till sidan för den platsen
  router.push(`/forecast/${loc.name}/${loc.position.lat}/${loc.position.long}`)
}

function editValue(itm) {
  location.value = JSON.parse(JSON.stringify(itm))
  itm.edit = true
}
</script>

<template>
  <div class="locations-wrapper">
    <h2>Locations</h2>

    <div class="form">
      <label>Namn: <input type="text" v-model="location.name" /></label>
      <label>
        Lat:
        <input
          type="number"
          max="90"
          min="-90"
          step=".1"
          size="5"
          v-model="location.position.lat"
        />
      </label>
      <label>
        Long:
        <input
          type="number"
          max="180"
          min="-180"
          step=".1"
          size="8"
          v-model="location.position.long"
        />
      </label>

      <div class="buttons">
        <button @click="save">Save</button>
        <button @click="reset">Reset</button>
      </div>
    </div>

    <hr />

    <h3>Saved Locations</h3>

    <ul class="locations-list">
      <li
        v-for="loc in locationsList"
        :key="loc.name"
        :class="{ default: loc.default }"
        @click="goToForecast(loc)"
      >
        <div class="loc-info">
          <strong>{{ loc.name }}</strong>
          <span class="coords">
            {{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }},
            {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }}
          </span>
        </div>

        <div class="loc-actions">
          <span class="edit" @click.stop="editValue(loc)">✎</span>
          <span class="remove" @click.stop="remove(loc)">🗑</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.locations-wrapper {
  background-color: #1e1e1e;
  color: #f5f5f5;
  border-radius: 14px;
  padding: 1.5em;
  margin: 2em auto;
  max-width: 800px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.55);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 1em;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

input {
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #fff;
}

.buttons {
  display: flex;
  gap: 0.5em;
  align-items: flex-end;
}

button {
  background-color: #4fc3f7;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  font-weight: 600;
}

button:hover {
  background-color: #03a9f4;
}

.locations-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.locations-list li {
  background-color: #252525;
  padding: 0.8em 1em;
  margin-bottom: 0.5em;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.locations-list li:hover {
  background-color: #333;
}

.locations-list li.default {
  border: 1px solid #4fc3f7;
  box-shadow: 0 0 10px rgba(79, 195, 247, 0.4);
}

.loc-info {
  display: flex;
  flex-direction: column;
}

.coords {
  color: #aaa;
  font-size: 0.85em;
}

.loc-actions {
  display: flex;
  gap: 0.5em;
}

.edit,
.remove {
  cursor: pointer;
  font-size: 1.1em;
}

.remove:hover {
  color: red;
}
</style>
