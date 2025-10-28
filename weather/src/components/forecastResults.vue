<script setup>
import wc from '@/assets/data/weatherCode.json'
import { ref } from 'vue'
const props = defineProps(['forecast'])
const weatherCodes = ref(wc)

function getText(code) {
  const match = weatherCodes.value.find((itm) => itm.code == code)
  return match ? match.description : 'Unknown'
}

// Vindpilen pekar dit vinden blåser
function windDirectionStyle(deg) {
  const rotation = (deg + 90) % 360
  return { transform: `rotate(${rotation}deg)` }
}
</script>

<template>
  <div class="forecast-wrapper">
    <h3>7-Day Forecast</h3>

    <div class="forecast-card" v-for="day in props.forecast.weather" :key="day.date">
      <div class="forecast-top">
        <div class="date-section">
          <span class="date">
            {{ new Date(day.date).getDate() }}.{{ new Date(day.date).getMonth() + 1 }}
          </span>
          <span class="desc">{{ getText(day.code) }}</span>
        </div>
        <div class="temp-section">
          <span class="temp-max">{{ day.temp.max }}{{ day.temp.unit }}</span>
          <span class="temp-min">/{{ day.temp.min }}°</span>
        </div>
      </div>

      <div class="forecast-bottom">
        <div class="wind-section">
          <svg
            class="wind-arrow"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            :style="windDirectionStyle(day.wind.direction)"
            fill="#4fc3f7"
          >
            <path d="M12 2 L19 21 H12 L5 21 Z" />
          </svg>
          <div class="wind-info">
            <span>{{ day.wind.speed }} ({{ day.wind.gusts }}) {{ day.wind.unit }}</span>
            <small>{{ day.wind.direction }}{{ day.wind.direction_unit }}</small>
          </div>
        </div>

        <div class="precip-section">
          <span>☔ {{ day.precipitation.sum }}{{ day.precipitation.unit }}</span>
          <small>{{ day.precipitation.probability }}% chance</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-wrapper {
  background-color: #1e1e1e;
  color: #f5f5f5;
  border-radius: 14px;
  padding: 1.5em;
  margin: 2em auto;
  max-width: 800px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.55);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

h3 {
  text-align: center;
  color: #4fc3f7;
  margin-bottom: 1.2em;
  font-weight: 600;
}

.forecast-card {
  background-color: #252525;
  border-radius: 12px;
  padding: 1em 1.2em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  transition: background 0.3s ease;
}

.forecast-card:hover {
  background-color: #303030;
}

.forecast-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-section {
  display: flex;
  flex-direction: column;
}

.date {
  font-weight: bold;
  color: #82e9de;
}

.desc {
  font-size: 0.9em;
  color: #aaa;
  margin-top: 0.2em;
}

.temp-section {
  font-size: 1.1em;
  color: #ffb74d;
  font-weight: 600;
}

.temp-min {
  color: #ffd180;
  margin-left: 0.2em;
}

.forecast-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1em;
}

.wind-section {
  display: flex;
  align-items: center;
  gap: 0.8em;
}

.wind-arrow {
  transition: transform 0.4s ease;
}

.wind-info {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

.precip-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9em;
}

.precip-section small {
  color: #aaa;
}

@media (max-width: 700px) {
  .forecast-card {
    padding: 1em;
  }

  .forecast-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4em;
  }

  .forecast-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .precip-section {
    align-items: flex-start;
  }
}
</style>
