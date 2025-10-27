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

function windDirectionStyle(deg) {
  const rotation = (deg + 180) % 360
  return {
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.4s ease',
  }
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
      <li class="wind-direction">
        Direction:
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          :style="windDirectionStyle(props.weather.wind.direction)"
          fill="#4fc3f7"
        >
          <path d="M12 2 L19 21 H12 L5 21 Z" />
        </svg>
        {{ props.weather.wind.direction }}{{ props.weather.wind.direction_units }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1.5em;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1.5em;
  margin-top: 1em;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #f1f1f1;
}
p {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #4fc3f7;
  margin-bottom: 0.5em;
}
li {
  padding: 0.3em 0;
  color: #ccc;
}
.wind-direction svg {
  display: inline-block;
  vertical-align: middle;
}
.arrow {
  display: inline-block;
  transition: transform 0.4s ease;
  color: #4fc3f7;
  font-size: 1.2rem;
}
</style>
