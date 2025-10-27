<script setup>
import wc from '@/assets/data/weatherCode.json'
import { ref } from 'vue'
const props = defineProps(['forecast'])
const weatherCodes = ref(wc)

function getText(code) {
  let wcText =
    weatherCodes.value.find((itm) => {
      return itm.code == code
    }).description ?? 'Unknown'
  return wcText
}

function windDirectionStyle(deg) {
  const rotation = (deg + 180) % 360
  return {
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.4s ease',
  }
}
</script>
<template>
  <ul>
    <li>Date</li>
    <li>Code</li>
    <li>Temp</li>
    <li>Precip</li>
    <li>Wind</li>
  </ul>
  <ul v-for="day in props.forecast.weather" :key="day">
    <li>{{ new Date(day.date).getDate() }}.{{ new Date(day.date).getMonth() + 1 }}</li>
    <li>{{ getText(day.code) }}</li>
    <li>{{ day.temp.min }} - {{ day.temp.max }}{{ day.temp.unit }}</li>
    <li>
      {{ day.precipitation.sum }}{{ day.precipitation.unit }}<br />({{
        day.precipitation.probability
      }}%)
    </li>
    <li>
      {{ day.wind.speed }}({{ day.wind.gusts }}){{ day.wind.unit }}<br />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        :style="windDirectionStyle(day.wind.direction)"
        fill="#4fc3f7"
      >
        <path d="M12 2 L19 21 H12 L5 21 Z" />
      </svg>
      {{ day.wind.direction }}{{ day.wind.direction_unit }}
    </li>
  </ul>
</template>
<style scoped>
ul {
  padding: 0.5em 1em;
  display: grid;
  grid-template-columns: 12% 20% 22% 20% auto;
  align-items: center;
  background-color: #1e1e1e;
  color: #f1f1f1;
  border-bottom: 1px solid #2a2a2a;
  transition: background-color 0.3s ease;
}
ul:first-of-type {
  background-color: #121212;
  font-weight: bold;
  color: #4fc3f7;
}
ul:hover {
  background-color: #252525;
}
li {
  list-style-type: none;
  padding: 0.5em;
  text-align: center;
  font-size: 0.95rem;
}
ul:nth-child(odd):not(:first-child) {
  background-color: #181818;
}
.wind-svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
så här är min forecastResult.vue
