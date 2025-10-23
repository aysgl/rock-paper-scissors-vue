<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useScoreStore } from '../../store/scoreStore'
import { useGameStore } from '../../store/gameStore'
import { useGame } from '../../composables/useGame'

const scoreStore = useScoreStore()
const gameStore = useGameStore()

const { getResultText } = useGame()

const sortByWinRate = ref(false)

const sortedLeaderboard = computed(() => {
  const sorted = [...scoreStore.score]

  if (sortByWinRate.value) {
    return sorted.sort((a, b) => b.winRate - a.winRate)
  }

  return sorted.sort((a, b) => b.score - a.score)
})

// const toggleWinRate = () => {
//  sortByWinRate.value = !sortByWinRate.value
// }

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

onMounted(async () => {
  await scoreStore.fetchScoreboard()
})
</script>

<template>
  <div class="leaderboard-content w-full">
    <!-- Result Banner -->
    <div v-if="gameStore.gameResult" :class="['leaderboard__result', resultClass]">
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
            <th>
              Win Rate
              <!-- <BaseButton
                  @click="toggleWinRate"
                  style="padding: 0.2rem; width: 24px; height: 24px"
                >
                  {{ sortByWinRate ? 'score' : 'win rate' }}
                </BaseButton> -->
            </th>
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
</template>
