import { defineStore } from 'pinia'
import type { LeaderboardAPI } from '../types/api.types'
import type { GameResultType } from '../types/game.types'
import { api } from '../api/api'

export const useScoreStore = defineStore('scoreStore', {
  state: () => ({
    score: [] as LeaderboardAPI[],
  }),

  getters: {
    playerScore: (state) => state.score[0]?.score || 0,
    playerStats: (state) => state.score[0] || null,
  },

  actions: {
    async fetchScoreboard() {
      const { data } = await api.get('/scoreboard')
      this.score = data
    },

    async updateScoreBoard(result: GameResultType) {
      if (!this.score[0]) {
        console.warn('No score data available')
        return
      }

      const player = this.score.find((p) => p.username === 'Player')
      const computer = this.score.find((p) => p.username === 'Computer')

      if (!player || !computer) {
        console.warn('No player or computer data available')
        return
      }

      player.gamesPlayed += 1
      computer.gamesPlayed += 1

      if (result === 'win') {
        player.wins += 1
        player.score += 1
        computer.losses += 1
      } else if (result === 'lose') {
        player.losses += 1
        computer.wins += 1
        computer.score += 1
      } else if (result === 'tie') {
        player.ties += 1
        computer.ties += 1
      }

      player.winRate = Math.round((player.wins / player.gamesPlayed) * 100)
      computer.winRate = Math.round((computer.wins / computer.gamesPlayed) * 100)

      console.log('Update Player:', JSON.parse(JSON.stringify(player)))
      console.log('Update Computer:', JSON.parse(JSON.stringify(computer)))

      try {
        await api.put(`/scoreboard/${player.id}`, player)
        await api.put(`/scoreboard/${computer.id}`, computer)

        await this.fetchScoreboard()
        console.log('Score updated successfully!')
      } catch (error) {
        console.error('Failed to update score:', error)
      }
    },
  },
})
