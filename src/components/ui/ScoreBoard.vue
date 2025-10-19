<script setup lang="ts">
import LogoSvg from '../svg/LogoSvg.vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import { onMounted, computed, ref, watch } from 'vue'
import LeaderBoard from './LeaderBoard.vue'

const scoreStore = useScoreStore()
const gameStore = useGameStore()

const hasPlayedGame = computed(() => {
  return scoreStore.playerStats && scoreStore.playerStats.gamesPlayed > 0
})
const isOpen = ref(false)
const showResult = ref(false)

watch(
  () => gameStore.gameResult,
  (newResult) => {
    if (newResult) {
      showResult.value = true
      isOpen.value = true
    }
  },
)

onMounted(() => {
  scoreStore.fetchScoreboard()
})

const toggleLeaderBoard = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    showResult.value = false
  }
}
</script>

<template>
  <div v-if="hasPlayedGame" class="score">
    <div class="score__logo">
      <LogoSvg />
    </div>

    <div class="score__score" @click="toggleLeaderBoard">
      <span>Score</span>
      <h1>{{ scoreStore.playerScore }}</h1>
    </div>
  </div>

  <LeaderBoard :isOpen="isOpen" :showResult="showResult" @close="toggleLeaderBoard" />
</template>
