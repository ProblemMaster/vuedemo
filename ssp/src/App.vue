<script setup>
import { ref } from 'vue'
import KnappRad from './components/KnappRad.vue'
import ResultatRad from './components/ResultatRad.vue'
import PoangRad from './components/PoangRad.vue'

const knappar = ref(['Sten', 'Sax', 'Påse', 'Lizard', 'Spock'])
const score = ref({ spelare: 0, dator: 0 })
const resultat = ref({})
const vinnare = ref('')
const reset = ref(true)

function hittaVinnare(valdaKnappar) {
  reset.value = false
  vinnare.value = ''
  let spelare = knappar.value.indexOf(valdaKnappar.spelare)
  let dator = knappar.value.indexOf(valdaKnappar.dator)

  resultat.value = { spelare: spelare, dator: dator }
}

function raknaPoang(v) {
  if (v === 'spelare') {
    score.value.spelare++
  } else {
    score.value.dator++
  }
  vinnare.value = v
}
</script>

<template>
  <header>
    <h1>Sten, sax, påse!</h1>
  </header>

  <main>
    <KnappRad :knappar="knappar" :reset="reset" @valda-knappar="hittaVinnare" />
    <ResultatRad :valda-knappar="resultat" :reset="reset" @vinnare="raknaPoang" />
    <PoangRad :vinnare="vinnare" :reset="reset" />
    <button id="nolla" @click="reset = true">Nollställ poängen</button>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 1.2em;
}
#nolla {
  margin: auto;
  display: block;
  margin-top: 2em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
}
</style>
