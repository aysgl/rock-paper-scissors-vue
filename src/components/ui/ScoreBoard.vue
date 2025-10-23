<script setup lang="ts">
import LogoSvg from '../svg/LogoSvg.vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import { onMounted, computed, ref, watch } from 'vue'
import LeaderBoard from './LeaderBoard.vue'
import { injectModal, MODAL_INJECTION_KEYS } from '../../composables/useProvideInject'

const scoreStore = useScoreStore()
const gameStore = useGameStore()

// Inject leaderboard modal state from parent
const leaderboardModal = injectModal(MODAL_INJECTION_KEYS.LEADERBOARD)

const hasPlayedGame = computed(() => {
  return scoreStore.playerStats && scoreStore.playerStats.gamesPlayed > 0
})

const showResult = ref(false)

// Watch for game result and automatically open leaderboard
watch(
  () => gameStore.gameResult,
  (newResult) => {
    if (newResult) {
      showResult.value = true
      leaderboardModal.open()
    }
  },
)

onMounted(() => {
  scoreStore.fetchScoreboard()
})

const toggleLeaderBoard = () => {
  leaderboardModal.toggle()
  if (leaderboardModal.isOpen.value) {
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

  <LeaderBoard :isOpen="leaderboardModal.isOpen.value" :showResult="showResult" />
</template>
