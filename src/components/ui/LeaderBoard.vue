<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import BaseModal from './BaseModal.vue'
import { useGame } from '../../composables/useGame'
import { injectModal, MODAL_INJECTION_KEYS } from '../../composables/useProvideInject'

interface Props {
  isOpen: boolean
  showResult?: boolean
}

defineProps<Props>()

const scoreStore = useScoreStore()
const gameStore = useGameStore()

// Inject modal state from parent
const leaderboardModal = injectModal(MODAL_INJECTION_KEYS.LEADERBOARD)

const { getResultText } = useGame()

const sortedLeaderboard = computed(() => {
  return [...scoreStore.score].sort((a, b) => b.score - a.score)
})

const getResultMessage = (result: string): string => {
  switch (result) {
    case 'win':
      return '+1 Point! Keep going! 🚀'
    case 'lose':
      return 'Better luck next time! 💪'
    case 'tie':
      return 'No points this time'
    default:
      return ''
  }
}

const resultClass = computed(() => {
  switch (gameStore.gameResult) {
    case 'win':
      return 'leaderboard__result--win'
    case 'lose':
      return 'leaderboard__result--lose'
    case 'tie':
      return 'leaderboard__result--tie'
    default:
      return ''
  }
})

// No emit needed - using provide/inject pattern

onMounted(async () => {
  await scoreStore.fetchScoreboard()
})
</script>

<template>
  <BaseModal :isOpen="isOpen" size="large" title="Leaderboard" @close="leaderboardModal.close">
    <!-- Result Banner -->
    <div class="w-full">
      <div v-if="showResult && gameStore.gameResult" :class="['leaderboard__result', resultClass]">
        <h3>{{ getResultText(gameStore.gameResult) }}</h3>
        <p>{{ getResultMessage(gameStore.gameResult) }}</p>
      </div>

      <div class="leaderboard__table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Score</th>
              <th>Games</th>
              <th>W/L/T</th>
              <th>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, index) in sortedLeaderboard"
              :key="player.id"
              :class="{ 'leaderboard__row--current': player.username === 'Player' }"
            >
              <td class="leaderboard__rank">{{ index + 1 }}</td>
              <td class="leaderboard__username">
                {{ player.username === 'Player' ? 'YOU' : player.username }}
              </td>
              <td class="leaderboard__score">{{ player.score }}</td>
              <td class="leaderboard__games">{{ player.gamesPlayed }}</td>
              <td class="leaderboard__wlt">
                {{ player.wins }}/{{ player.losses }}/{{ player.ties }}
              </td>
              <td class="leaderboard__winrate">{{ player.winRate }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseModal>
</template>
