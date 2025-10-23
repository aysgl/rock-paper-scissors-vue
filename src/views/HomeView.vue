<script setup lang="ts">
import { computed } from 'vue'
import GameBoard from '../components/game/GameBoard.vue'
import RulesModal from '../components/ui/RulesModal.vue'
import ScoreBoard from '../components/ui/ScoreBoard.vue'
import ErrorNotification from '../components/ui/ErrorNotification.vue'
import { useGameStore } from '../store/gameStore'
import { useScoreStore } from '../store/scoreStore'
import { useErrorNotification } from '../composables/useErrorNotification'
import { useModal } from '../composables/useModal'
import {
  provideModal,
  provideErrorNotification,
  MODAL_INJECTION_KEYS,
} from '../composables/useProvideInject'

const gameStore = useGameStore()
const scoreStore = useScoreStore()

// Modal management with provide/inject
const rulesModal = useModal()
const leaderboardModal = useModal()

provideModal(MODAL_INJECTION_KEYS.RULES, rulesModal)
provideModal(MODAL_INJECTION_KEYS.LEADERBOARD, leaderboardModal)

// Error notification management
const currentError = computed(() => scoreStore.error || gameStore.error)
const { showNotification, closeNotification } = useErrorNotification(() => currentError.value)

provideErrorNotification({
  currentError,
  showNotification,
  closeNotification,
})
</script>

<template>
  <main class="welcome fade">
    <ScoreBoard />
    <GameBoard />
    <RulesModal :isOpen="rulesModal.isOpen.value" />
    <ErrorNotification />
  </main>
</template>
