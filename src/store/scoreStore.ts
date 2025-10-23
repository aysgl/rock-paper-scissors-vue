import { defineStore } from 'pinia'
import type { LeaderboardAPI } from '../types/api.types'
import type { GameResultType } from '../types/game.types'
import type { ErrorState } from '../types/error.types'
import { api } from '../api/api'
import { updatePlayerStats } from '../utils/scoreHelpers'
import { handleError } from '../utils/errorHandler'

export const useScoreStore = defineStore('scoreStore', {
  state: () => ({
    score: [] as LeaderboardAPI[],
    isLoading: false,
    error: null as ErrorState | null,
  }),

  getters: {
    playerScore: (state) => state.score[0]?.score || 0,
    playerStats: (state) => state.score[0] || null,
  },

  actions: {
    async fetchScoreboard() {
      this.isLoading = true
      this.error = null

      try {
        const { data } = await api.get('/scoreboard')
        this.score = data
      } catch (error) {
        const apiError = handleError('fetchScoreboard', error, true)
        this.error = {
          hasError: true,
          message: apiError.message,
          code: apiError.code,
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateScoreBoard(result: GameResultType) {
      this.isLoading = true
      this.error = null

      try {
        if (!this.score[0]) {
          throw new Error('No score data available')
        }

        const player = this.score.find((p) => p.username === 'Player')
        const computer = this.score.find((p) => p.username === 'Computer')

        if (!player || !computer) {
          throw new Error('Player or computer data not found')
        }

        updatePlayerStats(player, computer, result)

        console.log('Update Player:', JSON.parse(JSON.stringify(player)))
        console.log('Update Computer:', JSON.parse(JSON.stringify(computer)))

        await Promise.all([
          api.put(`/scoreboard/${player.id}`, player),
          api.put(`/scoreboard/${computer.id}`, computer),
        ])

        await this.fetchScoreboard()
        console.log('Score updated successfully!')
      } catch (error) {
        const apiError = handleError('updateScoreBoard', error, true)
        this.error = {
          hasError: true,
          message: apiError.message,
          code: apiError.code,
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
