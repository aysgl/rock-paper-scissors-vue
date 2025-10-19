<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import BaseModal from './BaseModal.vue'
import { useGame } from '../../composables/useGame'

interface Props {
  isOpen: boolean
  showResult?: boolean
}

defineProps<Props>()

const scoreStore = useScoreStore()
const gameStore = useGameStore()

const { getResultText } = useGame()

const sortedLeaderboard = computed(() => {
  return [...scoreStore.score].sort((a, b) => b.score - a.score)
})

const resultClass = computed(() => {
  if (gameStore.gameResult === 'win') return 'leaderboard__result--win'
  if (gameStore.gameResult === 'lose') return 'leaderboard__result--lose'
  return 'leaderboard__result--tie'
})

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}

onMounted(async () => {
  await scoreStore.fetchScoreboard()
})
</script>

<template>
  <BaseModal :isOpen="isOpen" size="large" title="Leaderboard" @close="closeModal">
    <!-- Result Banner -->
    <div class="w-full">
      <div v-if="showResult && gameStore.gameResult" :class="['leaderboard__result', resultClass]">
        <h3>{{ getResultText(gameStore.gameResult) }}</h3>
        <p v-if="gameStore.gameResult === 'win'">+1 Point! Keep going! 🚀</p>
        <p v-else-if="gameStore.gameResult === 'lose'">Better luck next time! 💪</p>
        <p v-else>No points this time</p>
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
