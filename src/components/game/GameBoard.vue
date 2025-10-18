<script setup lang="ts">
import { ref } from 'vue'
import type { ChoiceType, GameResultType } from '../../types/game.types'
import GameChoice from './GameChoice.vue'
import GameResult from './GameResult.vue'

const userChoice = ref<ChoiceType>()
const houseChoice = ref<ChoiceType>()
const result = ref<GameResultType>()

function getRandom(): ChoiceType {
  const choices = ['paper', 'scissors', 'rock'] as const
  return choices[Math.floor(Math.random() * choices.length)] as ChoiceType
}

function handlePick(choice: ChoiceType) {
  userChoice.value = choice

  const interval = setInterval(() => {
    houseChoice.value = getRandom()
  }, 100)

  setTimeout(() => {
    clearInterval(interval)
    houseChoice.value = getRandom()

    if (userChoice.value === houseChoice.value) {
      result.value = 'tie'
    } else if (
      (userChoice.value === 'rock' && houseChoice.value === 'scissors') ||
      (userChoice.value === 'paper' && houseChoice.value === 'rock') ||
      (userChoice.value === 'scissors' && houseChoice.value === 'paper')
    ) {
      result.value = 'win'
    } else {
      result.value = 'lose'
    }
  }, 2000)

  console.log('userChoice', userChoice.value)
  console.log('houseChoice', houseChoice.value)
  console.log('result', result.value)
}

function playAgain() {
  userChoice.value = undefined
  houseChoice.value = undefined
  result.value = undefined
}
</script>

<template>
  <div class="game">
    <Transition name="fade" mode="out-in">
      <!-- Step 1: Pick -->
      <GameChoice v-if="!userChoice" key="step1" @pick="handlePick" />

      <!-- Step 2: Result -->
      <GameResult
        v-else
        key="step2"
        :user-choice="userChoice as ChoiceType"
        :house-choice="houseChoice as ChoiceType"
        :result="result as GameResultType"
        :has-result="!!result"
        @play-again="playAgain"
      />
    </Transition>
  </div>
</template>
