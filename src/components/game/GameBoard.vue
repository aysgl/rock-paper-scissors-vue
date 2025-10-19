<script setup lang="ts">
import { onMounted } from 'vue'
import type { ChoiceType, GameResultType } from '../../types/game.types'
import type { ChoiceAPI } from '../../types/api.types'
import GameChoice from './GameChoice.vue'
import GameResult from './GameResult.vue'
import { useGameStore } from '../../store/gameStore'
import { useScoreStore } from '../../store/scoreStore'

const gameStore = useGameStore()
const scoreStore = useScoreStore()

onMounted(() => {
  gameStore.fetchChoices()
  gameStore.fetchRules()
  scoreStore.fetchScoreboard()
})

function getRandom(): ChoiceType {
  const choices = gameStore?.choices.map((c: ChoiceAPI) => c?.id)
  return choices?.[Math.floor(Math.random() * choices.length)] as ChoiceType
}

function handlePick(choice: ChoiceType) {
  gameStore.userChoice = choice

  const interval = setInterval(() => {
    gameStore.houseChoice = getRandom()
  }, 100)

  setTimeout(() => {
    clearInterval(interval)
    gameStore.houseChoice = getRandom()

    gameStore
      .getResults(gameStore.userChoice as ChoiceType, gameStore.houseChoice as ChoiceType)
      .then(async (result) => {
        gameStore.gameResult = result as GameResultType

        // Save game
        await gameStore.savedGame(
          gameStore.userChoice as ChoiceType,
          gameStore.houseChoice as ChoiceType,
          gameStore.gameResult as GameResultType,
        )

        // Update score
        await scoreStore.updateScoreBoard(gameStore.gameResult as GameResultType)
      })
      .catch((error) => {
        console.error('Error getting results:', error)
      })
  }, 2000)
}
</script>

<template>
  <div class="game">
    <Transition name="fade" mode="out-in">
      <!-- Step 1: Pick -->
      <GameChoice v-if="!gameStore.userChoice" key="step1" @pick="handlePick" />

      <!-- Step 2: Result -->
      <GameResult
        v-else
        key="step2"
        :user-choice="gameStore.userChoice as ChoiceType"
        :house-choice="gameStore.houseChoice as ChoiceType"
        :result="gameStore.gameResult as GameResultType"
        :has-result="!!gameStore.gameResult"
        @play-again="gameStore.playAgain"
      />
    </Transition>
  </div>
</template>
