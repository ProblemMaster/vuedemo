<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'

// state
const location = ref({ id: null, name: '', position: { lat: 0, long: 0 }, default: false })
const locationsList = ref([])

// Helper: säkra uuid-fallback
function makeId() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch (e) {}
  // fallback
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

// on mount: läs och migrera gamla poster (lägg till id om saknas)
onMounted(() => {
  const raw = JSON.parse(localStorage.getItem('locations')) ?? []
  // säkerställ att varje post har id och korrekta siffror
  locationsList.value = raw.map((it) => {
    const migrated = {
      id: it.id ?? makeId(),
      name: it.name ?? '',
      position: {
        lat: it?.position?.lat !== undefined ? parseFloat(it.position.lat) || 0 : 0,
        long: it?.position?.long !== undefined ? parseFloat(it.position.long) || 0 : 0,
      },
      default: !!it.default,
    }
    return migrated
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
})

// save (create/update)
const save = () => {
  // basic validation
  if (
    !location.value.name ||
    Number.isNaN(parseFloat(location.value.position.lat)) ||
    Number.isNaN(parseFloat(location.value.position.long))
  ) {
    // du kan byta ut mot bättre UI-notifiering
    console.warn('Incomplete location: name and coordinates required')
    return
  }

  if (location.value.id) {
    // update existing
    const index = locationsList.value.findIndex((l) => l.id === location.value.id)
    if (index !== -1) {
      locationsList.value[index] = {
        ...location.value,
        position: {
          lat: parseFloat(location.value.position.lat),
          long: parseFloat(location.value.position.long),
        },
      }
    } else {
      // Om id saknas i listan (oväntat), skapa ny med samma id
      locationsList.value.push({
        ...location.value,
        position: {
          lat: parseFloat(location.value.position.lat),
          long: parseFloat(location.value.position.long),
        },
      })
    }
  } else {
    // create new
    locationsList.value.push({
      id: makeId(),
      name: location.value.name,
      position: {
        lat: parseFloat(location.value.position.lat),
        long: parseFloat(location.value.position.long),
      },
      default: false,
    })
  }

  // reset + persist
  reset()
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

// remove
const remove = (loc) => {
  locationsList.value = locationsList.value.filter((l) => l.id !== loc.id)
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

// reset (viktig: id null)
const reset = () => {
  location.value = {
    id: null,
    name: '',
    position: { lat: 0, long: 0 },
    default: false,
  }
}

// goToForecast: sätt default via id och navigera
function goToForecast(loc) {
  locationsList.value.forEach((itm) => {
    itm.default = itm.id === loc.id
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
  router.push(`/forecast/${encodeURIComponent(loc.name)}/${loc.position.lat}/${loc.position.long}`)
}

// editValue: kopiera (deep clone) in i location.value
function editValue(itm) {
  // använd structuredClone om tillgängligt (behåller datatyper), annars JSON-fallback
  try {
    location.value =
      typeof structuredClone === 'function' ? structuredClone(itm) : JSON.parse(JSON.stringify(itm))
  } catch (e) {
    location.value = JSON.parse(JSON.stringify(itm))
  }
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
          step="0.1"
          size="5"
          v-model.number="location.position.lat"
        />
      </label>
      <label>
        Long:
        <input
          type="number"
          max="180"
          min="-180"
          step="0.1"
          size="8"
          v-model.number="location.position.long"
        />
      </label>

      <div class="buttons">
        <button type="button" @click="save">{{ location.id ? 'Update' : 'Save' }}</button>
        <button type="button" @click="reset">Reset</button>
      </div>
    </div>

    <hr />

    <h3>Saved Locations</h3>

    <ul class="locations-list">
      <li
        v-for="loc in locationsList"
        :key="loc.id"
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
