<script setup lang="ts">
import LogoSvg from '../svg/LogoSvg.vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import { onMounted, watch } from 'vue'
import LeaderBoard from './LeaderBoard.vue'
import BaseModal from './BaseModal.vue'
import { injectModal, MODAL_INJECTION_KEYS } from '../../composables/useProvideInject'

const scoreStore = useScoreStore()
const gameStore = useGameStore()

const leaderboardModal = injectModal(MODAL_INJECTION_KEYS.LEADERBOARD)

watch(
  () => gameStore.gameResult,
  (newResult) => {
    if (newResult) {
      leaderboardModal.open()
    }
  },
)

onMounted(() => {
  scoreStore.fetchScoreboard()
})
</script>

<template>
  <div class="score">
    <div class="score__logo">
      <LogoSvg />
    </div>

    <div class="score__score" @click="leaderboardModal.toggle">
      <span>Score</span>
      <h1>{{ scoreStore.playerScore }}</h1>
    </div>
  </div>

  <BaseModal
    :isOpen="leaderboardModal.isOpen.value"
    size="large"
    title="Leaderboard"
    @close="leaderboardModal.close"
  >
    <LeaderBoard />
  </BaseModal>
</template>
