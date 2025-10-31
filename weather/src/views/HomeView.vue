<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { getForecast, getCurrentWeather } from '@/services/forecastService'
import ForecastResults from '@/components/forecastResults.vue'
import CurrentWeather from '@/components/currentWeather.vue'
import { getPosition } from '@/services/positioningService'

const info = ref({})
const location = ref({})
const currentWeather = ref({})
const props = defineProps(['name', 'lat', 'long'])
const currentLocation = ref({ lat: 60.0, long: 20.0, name: 'Current Position' })

onMounted(() => {
  getPosition()
    .then((pos) => {
      currentLocation.value = { name: 'Current location', ...pos.position }
    })
    .catch(() => {})
})

function fetchForeCast(loc) {
  getForecast(loc)
    .then((response) => {
      info.value = response
    })
    .catch((err) => {
      console.log(err)
    })

  getCurrentWeather(loc)
    .then((response) => {
      currentWeather.value = response
    })
    .catch((err) => {
      console.log(err)
    })
}

watchEffect(() => {
  let locationsList = JSON.parse(localStorage.getItem('locations')) ?? []
  let tmpLocation = {}
  if (typeof props.name !== 'undefined') {
    tmpLocation = locationsList.find((loc) => {
      return loc.name.toLowerCase() === props.name.toLowerCase()
    })
    if (tmpLocation) {
      location.value.name = tmpLocation.name
      location.value.lat = tmpLocation.position.lat
      location.value.long = tmpLocation.position.long
    }
  } else {
    location.value = currentLocation.value
  }
  if (!tmpLocation && typeof props.lat !== 'undefined' && typeof props.long !== 'undefined') {
    location.value.name = props.name
    location.value.lat = parseFloat(props.lat)
    location.value.long = parseFloat(props.long)
  }
  if (typeof location.value.name !== 'undefined') {
    fetchForeCast(location.value)
  }
})

watch(currentLocation, () => {
  if (location.value.name == currentLocation.value.name) {
    fetchForeCast(currentLocation.value)
  }
})
</script>

<template>
  <main v-if="!location.name">
    <h2>Angiven plats kan inte hittas</h2>
    <p>
      <i>{{ props.name }}</i> finns inte i listan över platser
    </p>
  </main>
  <main v-else>
    <h2>{{ location.name }}</h2>
    <p class="location">
      Lat: <span>{{ location.lat.toFixed(3) }}</span>
    </p>
    <p class="location">
      Long: <span>{{ location.long.toFixed(3) }}</span>
    </p>

    <CurrentWeather v-if="currentWeather?.code" :weather="currentWeather" />
    <ForecastResults :forecast="info" />
  </main>
</template>

<style scoped>
/* Light mode (default) */
main {
  background-color: #f9f9f9;
  color: #222;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 2em auto;
  max-width: 800px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
h2 {
  color: #0288d1;
  font-size: 1.8rem;
  margin-bottom: 1em;
  text-align: center;
}
.location {
  display: inline-block;
  margin: 0 1em;
  color: #555;
  font-size: 1rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  main {
    background-color: #181818;
    color: #f1f1f1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  h2 {
    color: #4fc3f7;
  }
  .location {
    color: #ccc;
  }
}
</style>
