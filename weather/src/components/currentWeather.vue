<script setup>
import wc from '@/assets/data/weatherCode.json'
import { ref } from 'vue'
const props = defineProps(['weather'])
const weatherCodes = ref(wc)

function getText(code) {
  let wcText =
    weatherCodes.value.find((itm) => {
      return itm.code == code
    }).description ?? 'Unknown'
  return wcText
}
</script>

<template>
  <div>
    <p>{{ getText(props.weather.code) }}</p>
    <ul>
      <li>Temp: {{ props.weather.temp.temp }}{{ props.weather.temp.temp_units }}</li>
      <li>Humidity: {{ props.weather.temp.humidity }}{{ props.weather.temp.humidity_units }}</li>
      <li>Apparent: {{ props.weather.temp.apparent }}{{ props.weather.temp.temp_units }}</li>
    </ul>
    <ul>
      <li>
        Precipitation: {{ props.weather.precipitation.precipitation
        }}{{ props.weather.precipitation.units }}
      </li>
      <li>Cloud coverage: {{ props.weather.cloud.cover }}{{ props.weather.cloud.units }}</li>
      <li>Pressure: {{ props.weather.pressure.pressure }}{{ props.weather.pressure.units }}</li>
    </ul>
    <ul>
      <li>Wind speed: {{ props.weather.wind.windspeed }}{{ props.weather.wind.units }}</li>
      <li>Wind gusts: {{ props.weather.wind.windgusts }}{{ props.weather.wind.units }}</li>
      <li>Direction: {{ props.weather.wind.direction }}{{ props.weather.wind.direction_units }}</li>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-driection: row;
}
ul {
  padding: 1em;
}
</style>
