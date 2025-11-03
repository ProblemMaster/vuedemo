import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const score = ref({ user: 0, computer: 0 })
  const alternatives = ref(['sten', 'sax', 'påse'])
  const message = ref('Dags för spel!')
  const reset = ref(true)

  function updateMessage(winner) {
    if (winner === 'user') {
      message.value = 'vann!'
    } else if (winner === 'computer') {
      message.value = 'Datorn vann!'
    } else {
      message.value = 'Oavgjort!'
    }
  }
  const computerChoice = ref(-1)

  function userChoice(choice) {
    reset.value = false
    computerChoice.value = Math.floor(Math.random() * alternatives.value.length)
    determineWinner(choice, computerChoice.value)
  }

  function determineWinner(user, computer) {
    if (user === computer) {
      updateMessage('draw')
    } else if (user % 2 === computer % 2) {
      if (user > computer) {
        updateMessage('user')
        score.value.user++
      } else {
        updateMessage('computer')
        score.value.computer++
      }
    } else {
      if (user < computer) {
        updateMessage('user')
        score.value.user++
      } else {
        updateMessage('computer')
        score.value.computer++
      }
    }
  }

  function nollStall() {
    reset.value = true
    score.value.user = 0
    score.value.computer = 0
    message.value = 'Dags för spel!'
  }
  return { score, alternatives, message, computerChoice, userChoice, nollStall, reset }
})
