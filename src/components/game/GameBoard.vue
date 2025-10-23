<script setup lang="ts">
import { onMounted } from 'vue'
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
</script>

<template>
  <div class="game">
    <Transition name="fade" mode="out-in">
      <!-- Step 1: Pick -->
      <GameChoice v-if="!gameStore.userChoice" />

      <!-- Step 2: Result -->
      <GameResult v-else />
    </Transition>
  </div>
</template>
