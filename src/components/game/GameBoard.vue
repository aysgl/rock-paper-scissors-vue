<script setup lang="ts">
import { onMounted } from 'vue'
import GameChoice from './GameChoice.vue'
import GameResult from './GameResult.vue'
import { useGameStore } from '../../store/gameStore'
import { useScoreStore } from '../../store/scoreStore'
import { useGame } from '../../composables/useGame'

const gameStore = useGameStore()
const scoreStore = useScoreStore()

onMounted(() => {
  gameStore.fetchChoices()
  gameStore.fetchRules()
  scoreStore.fetchScoreboard()
})

const { handlePick } = useGame()
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
        :user-choice="gameStore.userChoice!"
        :house-choice="gameStore.houseChoice!"
        :result="gameStore.gameResult!"
        :has-result="!!gameStore.gameResult"
        @play-again="gameStore.playAgain"
      />
    </Transition>
  </div>
</template>
