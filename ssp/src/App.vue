<script setup></script>

<template>
  <header>
    <h1>Sten, sax, påse!</h1>
  </header>

  <main>
    <div class="knapprad">
      <button>Sten</button>
      <button>Sax</button>
      <button>Påse</button>
    </div>
    <div class="resultat">
      <p id="resultat">Du vann!</p>
    </div>
    <div class="score">
      <p><span id="spelare">0</span> - <span id="dator">0</span></p>
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 1.2em;
}
button {
  padding: 0.6em 1.2em;
  font-size: 1.2em;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.knapprad {
  display: flex;
  justify-content: center;
  gap: 0.6em;
}
.resultat {
  font-size: 1.2em;
  text-align: center;
  margin: 1.2em 0;
}
.score {
  font-size: 1.2em;
  text-align: center;
}
</style>
